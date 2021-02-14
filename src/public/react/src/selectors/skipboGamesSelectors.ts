import { RootState } from '../reducers';
import { SkipboGame } from '../interfaces/skipboGame';

export const getSkipboGames = (state: RootState): SkipboGame[] => state.skipboGames.games;
export const isSkipboGamesLoading = (state: RootState): boolean => state.skipboGames.isLoading;
