import {ReduxAction, ReduxDispatchAction, ReduxLocalAction, ReduxThunkAction} from "../interfaces/store";


export interface IApiResponse {
  errors: Error[];
  //status: HTTP_CODE;
  additional?: {
    errorGroupName?: string
  };
}

export const createThunkAction = <P = any, R = any>(action: ReduxAction<R>) => {
  return action as unknown as Promise<ReduxThunkAction<P & IApiResponse>>;
};

export const createLocalAction = <P = any>(action: ReduxLocalAction<P>) => {
  return action;
};

export const createDispatchAction = (action: ReduxDispatchAction) => {
  return action;
};
