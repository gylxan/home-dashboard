import { createDispatchAction, createLocalAction, createThunkAction } from './helpers';
import ActionTypes from './actionTypes';
import { ActionType, ApiMethod, getType } from '../middlewares/api';
import { Dispatch } from 'redux';
import { clearUser } from '../util/localStorage';

export const actionLogin = (username: string, password: string) =>
  createThunkAction({
    type: ActionTypes.LOGIN,
    method: ApiMethod.POST,
    url: `login`,
    payload: { username, password },
  });

export const actionLogout = () => {
  return createDispatchAction((dispatch: Dispatch) => {
    dispatch(
      createLocalAction({
        type: getType(ActionTypes.LOGOUT, ActionType.REQUEST),
      }),
    );

    clearUser();

    dispatch(
      createLocalAction({
        type: getType(ActionTypes.LOGOUT, ActionType.SUCCESS),
      }),
    );
  });
};
