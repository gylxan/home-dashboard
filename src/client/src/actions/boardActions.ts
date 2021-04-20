import ActionTypes from './actionTypes';
import { createThunkAction } from './helpers';
import { ApiMethod } from '../middlewares/api';

export const actionFetchBoards = () =>
  createThunkAction({
    type: ActionTypes.BOARDS_FETCH,
    url: 'boards',
    method: ApiMethod.GET,
  });
