import { ApiMethod } from '../middlewares/api';
import { Dispatch } from 'redux';

export interface ReduxLocalAction<D = any, A = any> {
  type: string;
  payload?: D;
  additional?: A | null;
}

export interface ReduxThunkAction<D = any, A = any> {
  type: string;
  url?: string;
  payload?: D;
  method?: ApiMethod;
  additional?: A | null;
  headers?: {
    [key: string]: string;
  };
  data?: {
    errors: Error[];
  };
  authRequired?: boolean;
}

export type ReduxDispatchAction = (dispatch: Dispatch) => void;

export type ReduxAction<D = any, A = any> = ReduxLocalAction<D> | ReduxThunkAction<D, A>;
