import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Player } from '../../../models/player';
import { Win } from '../../../models/game';
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

export const selectIsPlayersTurn = createSelector(
  selectCurrentPlayer,
  currentPlayerID => (id: string) => currentPlayerID === id
);

export const selectSurrenderedPlayer = createSelector(
  selectGameState,
  (gameState: game.GameState) => gameState.surrenderedPlayer
);

export const selectWinner = createSelector(
  selectGameState,
  (gameState: game.GameState) => gameState.winValidated ? gameState.winner : null
);

export const selectIsPlayerWinning = createSelector(
  selectWinner,
  winner => (id: string) => winner === id
);

export const selectWinningSequence = createSelector(
  selectGameState,
  (gameState: game.GameState) => gameState.winningSequence
);

export const selectWinnerBySurrender = createSelector(
  selectGameState,
  (gameState: game.GameState) => {
    const { winner, surrenderedPlayer, winValidated } = gameState;
    if (surrenderedPlayer && winValidated) {
      return winner;
    }

    return null;
  }
);

export const selectWin = createSelector(
  selectGameState,
  (gameState: game.GameState) => {
    const { winValidated, winner, winningSequence } = gameState;
    if (winValidated) {
      return {
        winner,
        winningSequence
      };
    }

    return null;
  }
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

export const selectPlayerIds = createSelector(
  selectPlayerState,
  selectIds
);

export const selectClient = createSelector(
  selectPlayersAll,
  (playerList: Player[]) => playerList.find(player => player.isClient)
);


// Mixed
export const selectStatusMessage = createSelector(
  selectClient,
  selectPlayersAll,
  selectCurrentPlayer,
  selectSurrenderedPlayer,
  selectWin,
  (client: Player, playerEntities: Player[], currentPlayer: string, surrenderedPlayer: string, win: Win) => {
    let message = '';
    const { id } = client;
    const playerTwo = playerEntities.find(pe => pe.id !== id);
    const playerTwoName = playerTwo.name || 'Player Two';

    if ( surrenderedPlayer ) {
      if (id === surrenderedPlayer) {
        message = `You surrendered! ${playerTwoName} wins!`;
      }  else {
        message = `${playerTwoName} surrendered! You win!`;
      }
    } else if (win) {
      const { winner } = win;
      if (winner === id) {
        message = 'You win!';
      } else {
        message = `${playerTwoName} wins!`;
      }
    } else {
      if (currentPlayer === id) {
        message = 'Your turn';
      } else {
        message = `${playerTwoName}'s turn`;
      }
    }

    return message;
  }
);
