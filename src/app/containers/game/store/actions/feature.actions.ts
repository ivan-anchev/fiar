import { Action } from '@ngrx/store';

export enum GameFeatureActionTypes {
  GAME_ACTION = '[Game] GAME_ACTION'
}

export class GameAction implements Action {
  readonly type = GameFeatureActionTypes.GAME_ACTION;
  constructor(public payload) { }
}

export type All = GameAction;
