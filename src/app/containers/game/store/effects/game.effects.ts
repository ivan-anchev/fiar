import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom, combineLatest } from 'rxjs/operators';
import { GameActionTypes, PlacePiece, SetPlayerTurn } from '../actions/game.actions';
import { WsAction } from '../actions/feature.actions';
import { EventTypes } from '../event-types';
import { selectPlayerIds, selectClient } from '../';

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
      (payload, playerIds, client) => ({ payload, playerIds, client })
    ),
    switchMap(({ payload, playerIds, client }) => {
      const { playerId } = payload;
      const { id } = client;
      const nextPlayerId = (<any>playerIds).find(pid => pid !== playerId);
      // should dispatch WS
      if (playerId === id) {
        return [
          new SetPlayerTurn({ id: nextPlayerId }),
          new WsAction({ type: EventTypes.PIECE_PLACED, payload })
        ];
      }

      return of(new SetPlayerTurn({ id: nextPlayerId }));
    })
  );
}
