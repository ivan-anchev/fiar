import { Action } from '@ngrx/store';

export enum GameActionTypes {
  SET_PLAYER_TURN = '[Game] SET_PLAYER_TURN',
  PLACE_PIECE = '[Game] PLACE_PIECE'
}

export class SetPlayerTurn implements Action {
  readonly type = GameActionTypes.SET_PLAYER_TURN;
  constructor(public payload: { id }) { }
}

export class PlacePiece implements Action {
  readonly type = GameActionTypes.PLACE_PIECE;
  constructor(public payload: { playerId: string, columnIndex: number }) { }
}

export type All = SetPlayerTurn | PlacePiece;
