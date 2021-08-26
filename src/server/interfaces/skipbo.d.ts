export interface SkipboGame {
  _id?: string;
  playTime: string;
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
