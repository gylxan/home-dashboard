import { combineReducers } from 'redux';
import boards, { BoardsState } from './boards';
import skipboGames, { SkipboGamesState } from './skipboGames';

export interface RootState {
  boards: BoardsState;
  skipboGames: SkipboGamesState;
}

const rootReducer = combineReducers({
  boards,
  skipboGames,
});

export default rootReducer;
