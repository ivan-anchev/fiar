import { Action } from '@ngrx/store';
import { PiecePosition } from '../../../../models/game';

export enum GameActionTypes {
  SET_PLAYER_TURN = '[Game] SET_PLAYER_TURN',
  PLACE_PIECE = '[Game] PLACE_PIECE',
  WIN_GAME_INIT = '[Game] WIN_GAME_INIT',
  WIN_GAME_SUCCESS = '[Game] WIN_GAME_SUCCESS',
  WIN_GAME_FAIL = '[Game] WIN_GAME_FAIL',
  VALIDATE_WIN_GAME = '[Game] VALIDATE_WIN_GAME',
  VALIDATE_WIN_GAME_SUCCESS = '[Game] VALIDATE_WIN_GAME_SUCCESS',
  SURRENDER = '[Game] SURRENDER',
  SET_WINNER = '[Game] SET_WINNER',
  END_GAME = '[Game] END GAME'
}

export class SetPlayerTurn implements Action {
  readonly type = GameActionTypes.SET_PLAYER_TURN;
  constructor(public payload: { id }) { }
}

export class PlacePiece implements Action {
  readonly type = GameActionTypes.PLACE_PIECE;
  constructor(public payload: { playerId: string, columnIndex: number }) { }
}

export class WinGameInit implements Action {
  readonly type =  GameActionTypes.WIN_GAME_INIT;
  constructor(public payload: { winner: string, winningSequence: Array<PiecePosition> }) { }
}

export class WinGameSuccess implements Action {
  readonly type = GameActionTypes.WIN_GAME_SUCCESS;
}

export class WinGameFail implements Action {
  readonly type = GameActionTypes.WIN_GAME_FAIL;
  constructor(public payload: { error }) { }
}

export class ValidateWinGame implements Action {
  readonly type = GameActionTypes.VALIDATE_WIN_GAME;
  constructor(public payload: { winner: string, winningSequence: Array<PiecePosition> }) { }
}

export class ValidateWinGameSuccess implements Action {
  readonly type = GameActionTypes.VALIDATE_WIN_GAME_SUCCESS;
  constructor(public payload: { winner: string, winningSequence: Array<PiecePosition> }) { }
}

export class Surrender implements Action {
  readonly type = GameActionTypes.SURRENDER;
  constructor(public payload: { playerId }) { }
}

export class SetWinner implements Action {
  readonly type = GameActionTypes.SET_WINNER;
  constructor(public payload: { winner }) { }
}

export class EndGame implements Action {
  readonly type = GameActionTypes.END_GAME;
}

export type All = SetPlayerTurn
                  | PlacePiece
                  | WinGameInit
                  | WinGameSuccess
                  | ValidateWinGame
                  | ValidateWinGameSuccess
                  | WinGameFail
                  | EndGame
                  | Surrender
                  | SetWinner;
