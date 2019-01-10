import { Action } from '@ngrx/store';

export enum GameActionTypes {
  SET_PLAYER_TURN = '[Game] SET_PLAYER_TURN'
}

export class SetPlayerTurn implements Action {
  readonly type = GameActionTypes.SET_PLAYER_TURN;
  constructor(public payload: { id }) { }
}

export type All = SetPlayerTurn;
