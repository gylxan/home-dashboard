import { RootState } from '../reducers';
import { Board } from '../interfaces/board';

export const getBoards = (state: RootState): Board[] => state.boards.boards;
export const getBoardsLoading = (state: RootState): boolean => state.boards.isLoading;
