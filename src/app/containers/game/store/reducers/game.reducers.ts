export interface GameState {
  board: Array<any>;
  currentPlayer: 0 | 1;
}

export const initialState: GameState = {
  board: [],
  currentPlayer: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    default: return state;
  }
}
