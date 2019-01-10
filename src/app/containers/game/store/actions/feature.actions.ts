import { Action } from '@ngrx/store';

export enum GameFeatureActionTypes {
  GAME_ACTION = '[Game] GAME_ACTION',
  START_GAME = '[GAME] START_GAME'
}

export class GameAction implements Action {
  readonly type = GameFeatureActionTypes.GAME_ACTION;
  constructor(public payload) { }
}

export class StartGame implements Action {
  readonly type = GameFeatureActionTypes.START_GAME;
  constructor(public payload: { players }) { }
}

export type All = GameAction | StartGame;
