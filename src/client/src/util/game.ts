import { SkipboGame } from '../interfaces/skipboGame';

export const getGamesWithLocationFilter = (game: SkipboGame): boolean =>
  game.location.latitude !== 0 && game.location.longitude !== 0;
