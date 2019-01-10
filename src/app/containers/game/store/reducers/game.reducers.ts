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
    default: return state;
  }
}
