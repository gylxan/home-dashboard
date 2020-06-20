export interface SkipboGame {
  playTime: number;
  points: Array<Point>;
}

export interface Point {
  player: string;
  place: number;
}
