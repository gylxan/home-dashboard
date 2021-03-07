import { ReduxAction, ReduxThunkAction } from '../interfaces/store';
import { Middleware, MiddlewareAPI } from 'redux';
import apiclient from '../util/apiclient';
import { getAuthUser } from '../selectors/authSelectors';

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

export const api: Middleware = (store) => (next) => async (action: ReduxAction) => {
  if (!isThunkAction(action)) {
    return next(action);
  }

  const { type, url = '', method = ApiMethod.GET, payload = {} } = action as ReduxThunkAction;
  next({ type: getType(type, ActionType.REQUEST) });

  try {
    const response = await apiclient.request({ url, method, headers: { ...getDefaultHeaders(store) }, data: payload });

    return next({ type: getType(type, ActionType.SUCCESS), payload: response });
  } catch (error) {
    return next({ type: getType(type, ActionType.FAILURE), payload: error.response?.data ?? {} });
  }
};
