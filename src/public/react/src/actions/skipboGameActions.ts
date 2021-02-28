import ActionTypes from './actionTypes';
import { createThunkAction } from './helpers';
import { ApiMethod } from '../middlewares/api';
import { SkipboGame } from '../interfaces/skipboGame';

export const actionFetchSkipboGames = () =>
  createThunkAction({
    type: ActionTypes.SKIPBO_GAMES_FETCH,
    method: ApiMethod.GET,
    url: 'skipbo',
  });

export function actionAddSkipboGame(game: SkipboGame) {
  return createThunkAction({
    type: ActionTypes.SKIPBO_GAMES_ADD,
    method: ApiMethod.POST,
    url: `skipbo`,
    payload: game,
  });
}

export const actionDeleteSkipboGame = (gameId: string) =>
  createThunkAction({
    type: ActionTypes.SKIPBO_GAMES_DELETE,
    method: ApiMethod.DELETE,
    url: `skipbo/${gameId}`,
    payload: { gameId },
  });

export const actionFetchSkipboGameWinners = () =>
  createThunkAction({
    type: ActionTypes.SKIPBO_GAMES_WINNERS_FETCH,
    method: ApiMethod.GET,
    url: 'skipbo/winners',
  });

export const actionFetchSkipboGameStatisticsGeneral = () =>
  createThunkAction({
    type: ActionTypes.SKIPBO_STATISTICS_GENERAL_FETCH,
    method: ApiMethod.GET,
    url: 'skipbo/statistics/general',
  });

export const actionFetchSkipboGamesPerWinnerStatistics = () =>
  createThunkAction({
    type: ActionTypes.SKIPBO_STATISTICS_GAMES_PER_WINNER_FETCH,
    method: ApiMethod.GET,
    url: 'skipbo/statistics/games-per-winner',
  });

export const actionFetchSkipboGamesHistory = () =>
  createThunkAction({
    type: ActionTypes.SKIPBO_STATISTICS_GAMES_HISTORY_FETCH,
    method: ApiMethod.GET,
    url: 'skipbo/statistics/games-history',
  });

export const actionFetchSkipboLastPlayDayGames = () =>
  createThunkAction({
    type: ActionTypes.SKIPBO_STATISTICS_LAST_PLAY_DAY_GAMES_FETCH,
    method: ApiMethod.GET,
    url: 'skipbo/statistics/last-play-day',
  });
