import { combineReducers } from 'redux';
import boards, { BoardsState } from './boards';
import skipboGames, { SkipboReducerState } from './skipboGames';
import lights, { LightsState } from './light';

export interface RootState {
  boards: BoardsState;
  skipboGames: SkipboReducerState;
  lights: LightsState;
}

const rootReducer = combineReducers({
  boards,
  lights,
  skipboGames,
});

export default rootReducer;
