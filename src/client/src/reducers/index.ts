import { combineReducers } from 'redux';
import boards, { BoardsState } from './boards';
import skipboGames, { SkipboReducerState } from './skipboGames';
import lights, { LightsState } from './light';
import auth, { AuthState } from './auth';

export interface RootState {
  auth: AuthState;
  boards: BoardsState;
  lights: LightsState;
  skipboGames: SkipboReducerState;
}

const rootReducer = combineReducers({
  auth,
  boards,
  lights,
  skipboGames,
});

export default rootReducer;
