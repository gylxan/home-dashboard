import { applyMiddleware, createStore, Store } from 'redux';
import { createBrowserHistory, History } from 'history';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import { api } from '../middlewares/api';

export const history: History = createBrowserHistory();

const configureStore = (preloadedState = {}): Store =>
  createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunkMiddleware), applyMiddleware(api)));

export default configureStore;
