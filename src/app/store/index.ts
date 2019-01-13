import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  ActionReducer,
  State
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as ui from './reducers/ui.reducers';
import * as ws from './reducers/ws.reducers';
import * as user from './reducers/user.reducers';
import * as gameFeature from '../views/game/store';
import { storeLogger } from 'ngrx-store-logger';

export interface AppState {
  ui: ui.UIState;
  ws: ws.WSState;
  user:  user.UserState;
  gameFeature?: gameFeature.GameFeatureState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: ui.reducer,
  ws: ws.reducer,
  user: user.reducer
};

export function logger(reducer: ActionReducer<State<any>>) {
  return storeLogger()(reducer);
}

export const metaReducers = !environment.production ? [logger] : [];

/** Selectors **/
// #UI
export const selectUIState = createFeatureSelector<AppState, ui.UIState>('ui');
export const selectIsProfileEditMode = createSelector(
  selectUIState,
  (uiState: ui.UIState) => uiState.isProfileEditMode
);
// # WS
export const selectWsState = createFeatureSelector<AppState, ws.WSState>('ws');
export const selectIsConnected = createSelector(
  selectWsState,
  (wsState: ws.WSState) => wsState.isConnected
);
export const selectOpenChannels = createSelector(
  selectWsState,
  (wsState:  ws.WSState) => wsState.openChannels
);
export const selectChannel = createSelector(
  selectWsState,
  (wsState: ws.WSState) => wsState.channel
);
export const selectChannelUsers = createSelector(
  selectChannel,
  (channel) => channel ? Array.from(channel.users) : []
);


// #User
export const selectUserState = createFeatureSelector<AppState, user.UserState>('user');
export const selectIsSessionChecked = createSelector(
  selectUserState,
  (userState: user.UserState) => userState.isSessionChecked
);
export const selectUser = createSelector(
  selectUserState,
  (userState: user.UserState) => userState.user
);

export const selectIsWaitingForPlayer = createSelector(
  selectChannel,
  selectUser,
  (channel, currentUser) => channel && channel.host === currentUser.id && channel.users.size === 1
);
