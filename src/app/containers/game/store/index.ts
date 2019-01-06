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
export const selectPlayerState = createSelector(
  selectGameFeature,
  createFeatureSelector<players.PlayerState>('players')
);

export const selectPlayersTotal = createSelector(
  selectPlayerState,
  selectTotal
);
