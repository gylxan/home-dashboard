import { AnyAction } from 'redux';

import { Board } from '../interfaces/board';
import ActionTypes from '../actions/actionTypes';
import { ActionType, getType } from '../middlewares/api';

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
    case getType(ActionTypes.BOARDS_FETCH, ActionType.REQUEST):
      return {
        ...state,
        isLoading: true,
      };

    case getType(ActionTypes.BOARDS_FETCH, ActionType.SUCCESS):
      return {
        ...state,
        boards: action.payload,
        isLoading: false,
      };

    case getType(ActionTypes.BOARDS_FETCH, ActionType.FAILURE):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default boardsReducer;
