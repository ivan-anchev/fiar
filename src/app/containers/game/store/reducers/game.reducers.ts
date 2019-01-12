import { GameActionTypes, All } from '../actions/game.actions';

export interface GameState {
  board: Array<any>;
  currentPlayer: 'string';
}

export const initialState: GameState = {
  board: Array(7).fill([]),
  currentPlayer: null
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
    [ item, ...arr[colIndex]],
    ...arr.slice(colIndex + 1)
  ];
};
