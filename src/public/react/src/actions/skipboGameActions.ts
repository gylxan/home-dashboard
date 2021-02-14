import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { SKIPBO_GAMES } from './actionTypes';
import { getSkipboGames, deleteSkipboGame as removeSkipboGame } from '../util/apiclient';
import { RootState } from '../reducers';
import { SkipboGame } from '../interfaces/skipboGame';

export const fetchSkipboGamesRequest = (): AnyAction => ({ type: SKIPBO_GAMES.FETCH_REQUEST });

export const fetchSkipboGamesSuccess = (games: SkipboGame[]): AnyAction => ({
  type: SKIPBO_GAMES.FETCH_SUCCESS,
  payload: { data: games },
});

export const fetchSkipboGamesFailure = (): AnyAction => ({ type: SKIPBO_GAMES.FETCH_FAILURE });

export const fetchSkipboGames = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
    dispatch(fetchSkipboGamesRequest());
    try {
      dispatch(fetchSkipboGamesSuccess(await getSkipboGames()));
    } catch (e) {
      dispatch(fetchSkipboGamesFailure());
    }
  };
};

export const deleteSkipboGameRequest = (): AnyAction => ({ type: SKIPBO_GAMES.DELETE_REQUEST });

export const deleteSkipboGameSuccess = (): AnyAction => ({ type: SKIPBO_GAMES.DELETE_SUCCESS });

export const deleteSkipboGameFailure = (): AnyAction => ({ type: SKIPBO_GAMES.DELETE_FAILURE });

export const deleteSkipboGame = (id: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
    dispatch(deleteSkipboGameRequest());
    try {
      await removeSkipboGame(id);
      await dispatch(fetchSkipboGames());
      dispatch(deleteSkipboGameSuccess());
    } catch (e) {
      dispatch(deleteSkipboGameFailure());
    }
  };
};
