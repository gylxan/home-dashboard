export interface SkipboGame {
  _id?: string;
  playTime: string; // ISO string of the date
  winner: Player;
}

export interface Player {
  name: string;
}

export interface GeneralStatistic {
  [attribute: string]: {
    label?: string;
    value: string | number | Date;
  }
}
