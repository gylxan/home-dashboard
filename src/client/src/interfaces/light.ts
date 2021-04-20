export type LightGroupType = 'LightGroup' | 'Zone' | 'Room';

export interface LightGroup {
  _data: {
    id: string;
    name: string;
    class: string;
    type: LightGroupType;
    state: {
      all_on: boolean;
      any_on: boolean;
    };
    action: {
      bri: number; // Brightness 0 - 254
    };
  };
}
