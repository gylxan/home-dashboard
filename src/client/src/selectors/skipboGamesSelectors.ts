import { RootState } from '../reducers';
import { DataStatistic, GeneralStatistic, SkipboGame, ValueStatistic } from '../interfaces/skipboGame';

export const getSkipboGames = (state: RootState): SkipboGame[] => state.skipboGames.data.games;
export const isSkipboGamesLoading = (state: RootState): boolean => state.skipboGames.data.isLoading;

export const getSkipboGameWinners = (state: RootState): string[] => state.skipboGames.data.winners;

export const getSkipboGamesStatisticsGeneral = (state: RootState): GeneralStatistic | undefined =>
  state.skipboGames.statistics.general;

export const getSkipboGamesPerWinnerStatistics = (state: RootState): ValueStatistic[] =>
  state.skipboGames.statistics.gamesPerWinner;

export const getSkipboGamesTopWinners = (state: RootState): ValueStatistic[] => {
  const gamesPerWinner = [...state.skipboGames.statistics.gamesPerWinner];
  gamesPerWinner.sort((a, b) => b.y - a.y);
  return gamesPerWinner.splice(0, 5);
};

export const getSkipboGamesHistory = (state: RootState): DataStatistic[] => state.skipboGames.statistics.gamesHistory;
export const getSkipboLastPlayDayGames = (state: RootState): DataStatistic[] =>
  state.skipboGames.statistics.lastPlayDayGames;
