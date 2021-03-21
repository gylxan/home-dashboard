import { createThunkAction } from './helpers';
import ActionTypes from './actionTypes';
import { ApiMethod } from '../middlewares/api';
import { clearUser } from '../util/localStorage';

export const actionLogin = (username: string, password: string) =>
  createThunkAction({
    type: ActionTypes.LOGIN,
    method: ApiMethod.POST,
    url: `login`,
    payload: { username, password },
  });

export const actionLogout = (refreshToken: string) => {
  clearUser();
  return createThunkAction({
    type: ActionTypes.LOGOUT,
    method: ApiMethod.POST,
    url: 'logout',
    payload: { refreshToken },
  });
};

export const actionRefreshToken = (refreshToken: string) =>
  createThunkAction({
    type: ActionTypes.REFRESH_TOKEN,
    method: ApiMethod.POST,
    url: `token`,
    payload: { refreshToken },
  });
