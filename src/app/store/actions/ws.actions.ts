import { Action } from '@ngrx/store';

export enum WSActions {
  SET_CONNECTED = '[WS] SET_CONNECTED',
  CONNECT = '[WS] CONNECT'
}

export class Connect implements Action {
  readonly type = WSActions.CONNECT;
  constructor(public payload: any) { }
}

export class SetConnected implements Action {
  readonly type = WSActions.SET_CONNECTED;
  constructor(public payload: { isConnected }) { }
}

export type All = Connect | SetConnected;
