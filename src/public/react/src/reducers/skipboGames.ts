import { AnyAction, combineReducers } from 'redux';
import ActionTypes from '../actions/actionTypes';
import { DataStatistic, GeneralStatistic, SkipboGame, ValueStatistic } from '../interfaces/skipboGame';
import { ActionType, getType } from '../middlewares/api';

export interface SkipboGamesState {
  isLoading: boolean;
  games: SkipboGame[];
  winners: string[];
}

interface SkipboGameStatisticsState {
  isLoading: boolean;
  general?: GeneralStatistic;
  gamesPerWinner: ValueStatistic[];
  gamesHistory: DataStatistic[];
  lastPlayDayGames: DataStatistic[];
}

export interface SkipboReducerState {
  data: SkipboGamesState;
  statistics: SkipboGameStatisticsState;
}

export const initialState: SkipboGamesState = Object.freeze({
  isLoading: false,
  games: [],
  winners: [],
});

const skipboGamesReducer = (state: SkipboGamesState = initialState, action: AnyAction): SkipboGamesState => {
  switch (action.type) {
    case getType(ActionTypes.SKIPBO_GAMES_ADD, ActionType.REQUEST):
    case getType(ActionTypes.SKIPBO_GAMES_FETCH, ActionType.REQUEST):
    case getType(ActionTypes.SKIPBO_GAMES_DELETE, ActionType.REQUEST):
      return {
        ...state,
        isLoading: true,
      };

    case getType(ActionTypes.SKIPBO_GAMES_FETCH, ActionType.SUCCESS):
      return {
        ...state,
        games: action.payload,
        isLoading: false,
      };

    case getType(ActionTypes.SKIPBO_GAMES_DELETE, ActionType.SUCCESS):
      return {
        ...state,
        games: state.games.filter((game) => game._id !== action.payload.gameId),
        isLoading: false,
      };

    case getType(ActionTypes.SKIPBO_GAMES_WINNERS_FETCH, ActionType.SUCCESS):
      return {
        ...state,
        winners: action.payload,
      };

    case getType(ActionTypes.SKIPBO_GAMES_ADD, ActionType.SUCCESS):
    case getType(ActionTypes.SKIPBO_GAMES_ADD, ActionType.FAILURE):
    case getType(ActionTypes.SKIPBO_GAMES_FETCH, ActionType.FAILURE):
    case getType(ActionTypes.SKIPBO_GAMES_DELETE, ActionType.FAILURE):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const initialStatisticsState: SkipboGameStatisticsState = Object.freeze({
  isLoading: false,
  general: undefined,
  gamesHistory: [],
  gamesPerWinner: [],
  lastPlayDayGames: [],
});

const skipboStatisticsReducer = (
  state: SkipboGameStatisticsState = initialStatisticsState,
  action: AnyAction,
): SkipboGameStatisticsState => {
  switch (action.type) {
    case getType(ActionTypes.SKIPBO_STATISTICS_GENERAL_FETCH, ActionType.REQUEST):
    case getType(ActionTypes.SKIPBO_STATISTICS_GAMES_HISTORY_FETCH, ActionType.REQUEST):
    case getType(ActionTypes.SKIPBO_STATISTICS_GAMES_PER_WINNER_FETCH, ActionType.REQUEST):
    case getType(ActionTypes.SKIPBO_STATISTICS_LAST_PLAY_DAY_GAMES_FETCH, ActionType.REQUEST):
      return {
        ...state,
        isLoading: true,
      };

    case getType(ActionTypes.SKIPBO_STATISTICS_GENERAL_FETCH, ActionType.SUCCESS):
      return {
        ...state,
        general: action.payload,
        isLoading: false,
      };

    case getType(ActionTypes.SKIPBO_STATISTICS_GAMES_HISTORY_FETCH, ActionType.SUCCESS):
      return {
        ...state,
        gamesHistory: action.payload,
        isLoading: false,
      };

    case getType(ActionTypes.SKIPBO_STATISTICS_GAMES_PER_WINNER_FETCH, ActionType.SUCCESS):
      return {
        ...state,
        gamesPerWinner: action.payload,
        isLoading: false,
      };

    case getType(ActionTypes.SKIPBO_STATISTICS_LAST_PLAY_DAY_GAMES_FETCH, ActionType.SUCCESS):
      return {
        ...state,
        lastPlayDayGames: action.payload,
        isLoading: false,
      };

    case getType(ActionTypes.SKIPBO_STATISTICS_GENERAL_FETCH, ActionType.FAILURE):
    case getType(ActionTypes.SKIPBO_STATISTICS_GAMES_HISTORY_FETCH, ActionType.FAILURE):
    case getType(ActionTypes.SKIPBO_STATISTICS_GAMES_PER_WINNER_FETCH, ActionType.FAILURE):
    case getType(ActionTypes.SKIPBO_STATISTICS_LAST_PLAY_DAY_GAMES_FETCH, ActionType.FAILURE):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default combineReducers<SkipboReducerState>({
  data: skipboGamesReducer,
  statistics: skipboStatisticsReducer,
});
