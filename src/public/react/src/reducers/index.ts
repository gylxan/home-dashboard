import { combineReducers } from 'redux';
import boards, { BoardsState } from './board';

export interface RootState {
  boards: BoardsState;
}

const rootReducer = combineReducers({
  boards,
});

export default rootReducer;
