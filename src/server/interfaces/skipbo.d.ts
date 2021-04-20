export interface SkipboGame {
  _id?: string;
  playTime: string;
  winner: Player;
}

export interface Player {
  name: string;
}
