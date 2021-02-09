import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { BOARDS } from './actionTypes';
import { Board } from '../interfaces/board';
import { getBoards } from '../util/apiclient';
import { RootState } from '../reducers';

export const fetchBoardsRequest = (): AnyAction => ({ type: BOARDS.FETCH_REQUEST });

export const fetchBoardsSuccess = (boards: Board[]): AnyAction => ({
  type: BOARDS.FETCH_SUCCESS,
  payload: { data: boards },
});

export const fetchBoardsFailure = (): AnyAction => ({ type: BOARDS.FETCH_FAILURE });

export const fetchBoards = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
    dispatch(fetchBoardsRequest());
    try {
      dispatch(fetchBoardsSuccess(await getBoards()));
    } catch (e) {
      dispatch(fetchBoardsFailure());
    }
  };
};
