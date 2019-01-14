import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { GameActionTypes, PlacePiece, SetPlayerTurn } from '../actions/game.actions';
import { WsAction } from '../actions/feature.actions';
import { WsMessageEvents } from '../../../../models/enums/ws-events';
import { selectPlayerIds, selectClient, selectBoard } from '../';
import { checkForWin } from '../../utils/game';

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
      const nextPlayerId = (<any>playerIds).find(pid => pid !== playerId);
      const win = checkForWin(board);
      if (win) {
        alert(JSON.stringify(win));
      }
      // Client (current user) takes action => should dispatch WS
      if (playerId === id) {
        return [
          new SetPlayerTurn({ id: nextPlayerId }),
          new WsAction({ type: WsMessageEvents.PIECE_PLACED, payload })
        ];
      }

      return of(new SetPlayerTurn({ id: nextPlayerId }));
    })
  );
}
