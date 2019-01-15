import { Action } from '@ngrx/store';

export enum GameFeatureActionTypes {
  GAME_ACTION = '[Game Feature] GAME_ACTION',
  START_GAME = '[Game Feature] START_GAME',
  WS_ACTION = '[Game Feature] WS_ACTION',
  NOOP_ACTION = '[Game Feature] NOOP_ACTION'
}

// Used for intercepting incoming WebSocket events ( WebSocket => Game)
export class GameAction implements Action {
  readonly type = GameFeatureActionTypes.GAME_ACTION;
  constructor(public payload) { }
}
// Used for emiting outcoming WebSocket events( Game => WebSocket )
export class WsAction implements Action {
  readonly type = GameFeatureActionTypes.WS_ACTION;
  constructor(public payload: { type: string, payload: unknown }) { }
}

export class StartGame implements Action {
  readonly type = GameFeatureActionTypes.START_GAME;
  constructor(public payload: { players }) { }
}

export class NoopAction implements Action {
  readonly type = GameFeatureActionTypes.NOOP_ACTION;
}


export type All = GameAction | StartGame | NoopAction | WsAction;
