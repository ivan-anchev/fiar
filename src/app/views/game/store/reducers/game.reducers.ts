import { GameActionTypes, All } from '../actions/game.actions';
import { Board, PiecePosition } from '../../../../models/game';
import { createEmptyBoard } from '../../utils/game';

export interface GameState {
  board: Board;
  currentPlayer: string;
  winner: string;
  winningSeq: Array<PiecePosition>;
}

export const initialState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: null,
  winner: null,
  winningSeq: null
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
