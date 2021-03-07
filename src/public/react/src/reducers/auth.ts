import { AnyAction } from 'redux';
import ActionTypes from '../actions/actionTypes';
import { ActionType, getType } from '../middlewares/api';
import { User } from '../interfaces/user';
import { getUser } from '../util/localStorage';
import { Error } from '../interfaces/error';

export interface AuthState {
  isLoading: boolean;
  user: User | undefined;
  error?: Error | undefined;
}

export const initialState: AuthState = Object.freeze({
  isLoading: false,
  user: getUser() || undefined,
});

const authReducer = (state: AuthState = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case getType(ActionTypes.LOGIN, ActionType.REQUEST):
      return {
        ...state,
        error: initialState.error,
        isLoading: true,
      };

    case getType(ActionTypes.LOGIN, ActionType.SUCCESS):
      return {
        ...state,
        user: action.payload,
        error: initialState.error,
        isLoading: false,
      };

    case getType(ActionTypes.LOGIN, ActionType.FAILURE):
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };

    case getType(ActionTypes.LOGOUT, ActionType.SUCCESS):
      return {
        ...state,
        user: initialState.user,
      };

    default:
      return state;
  }
};

export default authReducer;
