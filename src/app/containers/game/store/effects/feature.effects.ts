import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GameFeatureActionTypes, GameAction } from '../actions/feature.actions';
import { PlayerJoined } from '../actions/player.actions';
import { EventTypes } from '../event-types';

@Injectable()
export class GameFeatureEffects {
  constructor(private _actions: Actions) { }

  @Effect()
  gameAction$: Observable<any> = this._actions.pipe(
    ofType(GameFeatureActionTypes.GAME_ACTION),
    map((action: GameAction) => action.payload),
    switchMap((payload) => {
      const { message, channel, meta } = payload;
      const { type } = message;
      let dispatchAction;

      switch (type) {
        case EventTypes.JOIN_CHANNEL:
          dispatchAction = new PlayerJoined({ player: meta });
          break;
        default: break;
      }

      return of(dispatchAction);
    })
  );
}
