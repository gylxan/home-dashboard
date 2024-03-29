export interface SkipboGame {
  _id?: string;
  playTime: string; // ISO string of the date
  winner: Player;
  location: Location;
}

export interface Player {
  name: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface GeneralStatistic {
  [attribute: string]: {
    label?: string;
    value: string | number | Date;
  };
}

export interface ValueStatistic extends Player {
  y: number;
}

export interface DataStatistic extends Player {
  data: number[][];
}
