export interface SkipboGame {
  playTime: number;
  winner: Player;
}

export interface Player {
  name: string;
}

export interface GeneralStatistic {
  [attribute: string]: {
    label?: string;
    value: string | number;
  }
}