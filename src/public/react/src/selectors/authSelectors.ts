import { RootState } from '../reducers';
import { User } from '../interfaces/user';
import { Error } from '../interfaces/error';

export const isAuthLoading = (state: RootState): boolean => state.auth.isLoading;

export const getAuthUser = (state: RootState): User | undefined => state.auth.user;

export const getAuthError = (state: RootState): Error | undefined => state.auth.error;
