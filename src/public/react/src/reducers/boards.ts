import { AnyAction } from 'redux';

import { Board } from '../interfaces/board';
import { BOARDS } from '../actions/actionTypes';

export interface BoardsState {
  isLoading: boolean;
  boards: Board[];
}

export const initialState: BoardsState = Object.freeze({
  isLoading: false,
  boards: [],
});

const boardsReducer = (state: BoardsState = initialState, action: AnyAction): BoardsState => {
  switch (action.type) {
    case BOARDS.FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case BOARDS.FETCH_SUCCESS:
      return {
        ...state,
        boards: action.payload.data,
        isLoading: false,
      };

    case BOARDS.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default boardsReducer;
