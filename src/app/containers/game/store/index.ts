import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as game from './reducers/game.reducers';
import * as players from './reducers/player.reducers';

export interface GameFeatureState {
  game: game.GameState;
  players: players.PlayerState;
}

export const reducers = {
  game: game.reducer,
  players: players.reducer
};

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = players.playerAdapter.getSelectors();

export const selectGameFeature = createFeatureSelector<GameFeatureState>('gameFeature');

// Game
export const selectGameState = createSelector(
  selectGameFeature,
  createFeatureSelector<game.GameState>('game')
);

export const selectBoard = createSelector(
  selectGameState,
  (gameState: game.GameState) => gameState.board
);

export const selectCurrentPlayer = createSelector(
  selectGameState,
  (gameState: game.GameState) => gameState.currentPlayer
);

// Players
export const selectPlayerState = createSelector(
  selectGameFeature,
  createFeatureSelector<players.PlayerState>('players')
);

export const selectPlayersAll = createSelector(
  selectPlayerState,
  selectAll
);

export const selectPlayersTotal = createSelector(
  selectPlayerState,
  selectTotal
);

export const selectPlayersReady = createSelector(
  selectPlayersTotal,
  (playerCount: number) => playerCount === 2
);
