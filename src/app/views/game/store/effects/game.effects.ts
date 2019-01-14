import { Injectable } from '@angular/core';
import { Store, Action, select } from '@ngrx/store';
import { AppState } from '../../../../store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { WsAction } from '../actions/feature.actions';
import { WsMessageEvents } from '../../../../models/enums/ws-events';
import { selectPlayerIds, selectClient, selectBoard } from '../';
import { checkForWin, compareSequence } from '../../utils/game';
import {
  GameActionTypes,
  PlacePiece,
  SetPlayerTurn,
  WinGameInit,
  ValidateWinGame,
  ValidateWinGameSuccess  } from '../actions/game.actions';

@Injectable()
export class GameEffects {
  constructor(
    private _actions: Actions,
    private _store: Store<AppState>) { }

  @Effect()
  placePiece$: Observable<any> = this._actions.pipe(
    ofType(GameActionTypes.PLACE_PIECE),
    map((action: PlacePiece ) => action.payload),
    withLatestFrom(
      this._store.pipe(
        select(selectPlayerIds)
      ),
      this._store.pipe(
        select(selectClient)
      ),
      this._store.pipe(
        select(selectBoard)
      ),
      (payload, playerIds, client, board) => ({ payload, playerIds, client, board })
    ),
    switchMap(({ payload, playerIds, client, board }) => {
      const { playerId } = payload;
      const { id } = client;
      const nextPlayerId = (<string[]>playerIds).find(pid => pid !== playerId);

      // Client (current user) takes action => should dispatch WS
      if (playerId === id) {
        const dispatchActions: Action[] = [
          new SetPlayerTurn({ id: nextPlayerId }),
          new WsAction({ type: WsMessageEvents.PIECE_PLACED, payload })
        ];

        const win = checkForWin(board);
        // Initiate game win validation
        if (win) {
          const { winner, winningSequence } = win;
          dispatchActions.push(new WinGameInit({ winner, winningSequence }));
        }

        return dispatchActions;
      }

      return of(new SetPlayerTurn({ id: nextPlayerId }));
    })
  );

  @Effect()
  $winGameInit: Observable<any> = this._actions.pipe(
    ofType(GameActionTypes.WIN_GAME_INIT),
    map((action: WinGameInit) => action.payload),
    switchMap(payload => of(new WsAction({ type: WsMessageEvents.VALIDATE_WIN_GAME, payload })))
  );

  @Effect()
  $validateWinGame: Observable<any> = this._actions.pipe(
    ofType(GameActionTypes.VALIDATE_WIN_GAME),
    map((action: ValidateWinGame) => action.payload),
    withLatestFrom(
      this._store.pipe(
        select(selectBoard)
      ),
      (payload, board) => ({ payload, board })
    ),
    switchMap(({ payload, board }) => {
      const win = checkForWin(board);
      if (win) {
        const { winner, winningSequence } = win;
        if (winner === payload.winner && compareSequence(winningSequence, payload.winningSequence)) {
          // We have a winner
          return [
            new ValidateWinGameSuccess({ winner, winningSequence }),
            new WsAction({ type: WsMessageEvents.VALIDATE_WIN_GAME_SUCCESS , payload: { }})
          ];
        }
      }
    })
  );
}
