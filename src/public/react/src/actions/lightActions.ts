import { createThunkAction } from './helpers';
import ActionTypes from './actionTypes';
import { ApiMethod } from '../middlewares/api';

export const actionFetchLightGroups = () =>
  createThunkAction({
    type: ActionTypes.LIGHT_GROUPS_FETCH,
    method: ApiMethod.GET,
    url: 'light/groups',
  });

export const actionUpdateLightGroup = (id: string, on: boolean) =>
  createThunkAction({
    type: ActionTypes.LIGHT_GROUP_UPDATE,
    method: ApiMethod.PUT,
    url: `light/groups/${id}`,
    payload: { on },
  });
