import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  ActionReducer,
  State
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as ws from './reducers/ws.reducers';
import * as user from './reducers/user.reducers';
import { storeLogger } from 'ngrx-store-logger';

export interface AppState {
  ws: ws.WSState;
  user:  user.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  ws: ws.reducer,
  user: user.reducer
};

export function logger(reducer: ActionReducer<State<any>>) {
  return storeLogger()(reducer);
}

export const metaReducers = !environment.production ? [logger] : [];

// Selectors
export const selectWsState = createFeatureSelector<AppState, ws.WSState>('ws');
export const selectIsConnected = createSelector(
  selectWsState,
  (wsState: ws.WSState) => wsState.isConnected
);
