import { AnyAction } from 'redux';
import ActionTypes from '../actions/actionTypes';
import { ActionType, getType } from '../middlewares/api';
import { LightGroup } from '../interfaces/light';

export interface LightsState {
  isLoading: boolean;
  groups: LightGroup[];
}

export const initialState: LightsState = Object.freeze({
  isLoading: false,
  groups: [],
});

const lightsReducer = (state: LightsState = initialState, action: AnyAction): LightsState => {
  switch (action.type) {
    case getType(ActionTypes.LIGHT_GROUPS_FETCH, ActionType.REQUEST):
    case getType(ActionTypes.LIGHT_GROUP_UPDATE, ActionType.REQUEST):
      return {
        ...state,
        isLoading: true,
      };

    case getType(ActionTypes.LIGHT_GROUPS_FETCH, ActionType.SUCCESS):
    case getType(ActionTypes.LIGHT_GROUP_UPDATE, ActionType.SUCCESS):
      return {
        ...state,
        groups: action.payload,
        isLoading: false,
      };

    case getType(ActionTypes.LIGHT_GROUPS_FETCH, ActionType.FAILURE):
    case getType(ActionTypes.LIGHT_GROUP_UPDATE, ActionType.FAILURE):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default lightsReducer;
