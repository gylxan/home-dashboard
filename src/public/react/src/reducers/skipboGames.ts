import { AnyAction } from 'redux';

import { Board } from '../interfaces/board';
import { BOARDS, SKIPBO_GAMES } from '../actions/actionTypes';
import { SkipboGame } from '../interfaces/skipboGame';

export interface SkipboGamesState {
  isLoading: boolean;
  games: SkipboGame[];
}

export const initialState: SkipboGamesState = Object.freeze({
  isLoading: false,
  games: [],
});

const skipboGamesReducer = (state: SkipboGamesState = initialState, action: AnyAction): SkipboGamesState => {
  switch (action.type) {
    case SKIPBO_GAMES.FETCH_REQUEST:
    case SKIPBO_GAMES.DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SKIPBO_GAMES.FETCH_SUCCESS:
      return {
        ...state,
        games: action.payload.data,
        isLoading: false,
      };

    case SKIPBO_GAMES.FETCH_FAILURE:
    case SKIPBO_GAMES.DELETE_SUCCESS:
    case SKIPBO_GAMES.DELETE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default skipboGamesReducer;
