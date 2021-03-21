import { ReduxAction, ReduxThunkAction } from '../interfaces/store';
import { Middleware, MiddlewareAPI } from 'redux';
import apiclient from '../util/apiclient';
import { getAuthUser } from '../selectors/authSelectors';
import { AxiosError } from 'axios';
import jwtDecode from 'jwt-decode';
import { linkTo } from '../util/routes';
import { history } from '../util/history';
import { getUser, setUser } from '../util/localStorage';
import { User } from '../interfaces/user';
import { actionRefreshToken } from '../actions/loginActions';

export enum ApiMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
  PATCH = 'patch',
}

export enum ActionType {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

const isThunkAction = (action: ReduxAction): boolean =>
  !!(action as ReduxThunkAction).url &&
  !(
    (action as ReduxThunkAction).type.includes(`_${ActionType.REQUEST}`) ||
    (action as ReduxThunkAction).type.includes(`_${ActionType.SUCCESS}`) ||
    (action as ReduxThunkAction).type.includes(`_${ActionType.FAILURE}`)
  );

export const getType = (action: string | null, actionType: ActionType): string => {
  if (typeof action === 'string' && action.includes(actionType)) {
    return action;
  }
  return `${action}_${actionType}`;
};

const getDefaultHeaders = (store: MiddlewareAPI) => {
  const user = getAuthUser(store.getState());
  if (!!user && !!user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` };
  }
  return {};
};

const isAuthenticationRequired = (action: ReduxThunkAction): boolean => !!action.authRequired;

const isAccessTokenExpired = (store: MiddlewareAPI): boolean => {
  const user = getAuthUser(store.getState());
  if (!!user && !!user.accessToken) {
    const decodedToken = jwtDecode<{ exp: number }>(user.accessToken);
    return decodedToken.exp * 1000 < new Date().getTime();
  }
  // When we don't have a user or user does not have a token, the API will handle the rest
  return false;
};

const isTokenError = (error: AxiosError): boolean =>
  error.response?.data?.error?.code === 'refreshTokenInvalid' || error.response?.data?.error?.code === 'tokenExpired';

export const api: Middleware = (store) => (next) => async (action: ReduxAction) => {
  if (!isThunkAction(action)) {
    return next(action);
  }

  if (isAuthenticationRequired(action) && isAccessTokenExpired(store)) {
    // @ts-ignore
    await store.dispatch(actionRefreshToken(getAuthUser(store.getState())?.refreshToken ?? ''));
    setUser({ ...(getUser() as User), accessToken: getAuthUser(store.getState())?.accessToken });
  }

  const handleError = (error: AxiosError) => {
    if (isTokenError(error)) {
      history.push(linkTo.login());
    }

    return next({ type: getType(type, ActionType.FAILURE), payload: error.response?.data ?? {} });
  };

  const { type, url = '', method = ApiMethod.GET, payload = {} } = action as ReduxThunkAction;
  next({ type: getType(type, ActionType.REQUEST) });

  try {
    const response = await apiclient.request({ url, method, headers: { ...getDefaultHeaders(store) }, data: payload });

    return next({ type: getType(type, ActionType.SUCCESS), payload: response });
  } catch (error) {
    return handleError(error);
  }
};
