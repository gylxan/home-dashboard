import { createThunkAction } from './helpers';
import ActionTypes from './actionTypes';
import { ApiMethod } from '../middlewares/api';

export const actionUpdateUser = ({ id, password }: { id: string; password?: string }) =>
  createThunkAction({
    type: ActionTypes.USER_UPDATE,
    method: ApiMethod.PUT,
    url: `users/${id}`,
    payload: { id, password },
    authRequired: true
  });
