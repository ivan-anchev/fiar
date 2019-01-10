import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { selectPlayersAll } from '../';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PlayerActionTypes, PlayerJoined, Add } from '../actions/player.actions';

@Injectable()
export class PlayerEffects {
  constructor(
    private _actions: Actions,
    private _store: Store<AppState>) { }

  @Effect()
  playerJoined$: Observable<any> = this._actions.pipe(
    ofType(PlayerActionTypes.PLAYER_JOINED),
    map((action: PlayerJoined) => action.payload),
    withLatestFrom(this._store.select(selectPlayersAll)),
    switchMap(([ payload, players ]) => {
      const { player } = payload;
      return of(new Add({ player }));
    })
  );
}
