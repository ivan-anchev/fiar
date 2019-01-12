import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GameFeatureActionTypes, GameAction, StartGame } from '../actions/feature.actions';
import { SetPlayerTurn, PlacePiece } from '../actions/game.actions';
import { PlayerJoined, AddAll } from '../actions/player.actions';
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
      let dispatch;

      switch (type) {
        case EventTypes.JOIN_CHANNEL:
          dispatch = new PlayerJoined({ player: meta });
          break;
        case EventTypes.HANDSHAKE:
          dispatch = new PlayerJoined({ player: meta });
          break;
        case EventTypes.PIECE_PLACED:
          dispatch = new PlacePiece({ ...message.payload });
          break;
        default: break;
      }

      return of(dispatch);
    })
  );

  @Effect()
  startGame$: Observable<any> = this._actions.pipe(
    ofType(GameFeatureActionTypes.START_GAME),
    map((action: StartGame ) => action.payload),
    switchMap(({ players }) => [
      new AddAll({ players }),
      new SetPlayerTurn({ id: players.find(p => p.isHost ).id })
    ])
  );
}
