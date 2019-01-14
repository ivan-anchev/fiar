import { GameActionTypes, All } from '../actions/game.actions';
import { Board, PiecePosition } from '../../../../models/game';
import { createEmptyBoard } from '../../utils/game';

export interface GameState {
  board: Board;
  currentPlayer: string;
  winner: string;
  winningSequence: Array<PiecePosition>;
  winValidated: boolean;
  error: Error;
}

export const initialState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: null,
  winner: null,
  winningSequence: null,
  winValidated: false,
  error: null
};

export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case GameActionTypes.SET_PLAYER_TURN:
      return {
        ...state,
        currentPlayer: action.payload.id
      };

    case GameActionTypes.PLACE_PIECE:
      return {
        ...state,
        board: pushAt(state.board, action.payload.columnIndex, action.payload.playerId)
      };
    case GameActionTypes.WIN_GAME_FAIL:
      return {
        ...state,
        winner: null,
        winningSeq: null,
        error: action.payload.error
      };
    case GameActionTypes.VALIDATE_WIN_GAME_SUCCESS: // set win for validator
    case GameActionTypes.WIN_GAME_SUCCESS: // set win for winner
      return {
        ...state,
        winValidated: true
      };
    case GameActionTypes.VALIDATE_WIN_GAME:
    case GameActionTypes.WIN_GAME_INIT:
      return {
        ...state,
        winner: action.payload.winner,
        winningSequence: action.payload.winningSequence,
        winValidated: false
      };
    default: return state;
  }
}

const pushAt = (arr: Array<Array<any>>, colIndex: number, item: any) => {
  return [
    ...arr.slice(0, colIndex),
    [...arr[colIndex], item],
    ...arr.slice(colIndex + 1)
  ];
};
