import { RootState } from '../reducers';
import { LightGroup, LightGroupType } from '../interfaces/light';

export const getLightGroups = (state: RootState): LightGroup[] => state.lights.groups;
export const isLightsLoading = (state: RootState): boolean => state.lights.isLoading;

export const getLightGroupsByType = (
  state: RootState,
): Record<LightGroupType, { type: LightGroupType; groups: LightGroup[] }> =>
  state.lights.groups.reduce((accu, current) => {
    if (current._data.type === 'LightGroup') {
      return accu;
    }
    if (!accu[current._data.type]) {
      accu[current._data.type] = {
        type: current._data.type,
        groups: [],
      };
    }
    accu[current._data.type].groups.push(current);
    return accu;
  }, {} as Record<LightGroupType, { type: LightGroupType; groups: LightGroup[] }>);
