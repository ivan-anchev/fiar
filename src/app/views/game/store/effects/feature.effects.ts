import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GameFeatureActionTypes, GameAction, StartGame } from '../actions/feature.actions';
import { SetPlayerTurn, PlacePiece, ValidateWinGame, WinGameSuccess } from '../actions/game.actions';
import { PlayerJoined, AddAll } from '../actions/player.actions';
import { WsMessageEvents } from '../../../../models/enums/ws-events';

@Injectable()
export class GameFeatureEffects {
  constructor(private _actions: Actions) { }

  @Effect()
  gameAction$: Observable<any> = this._actions.pipe(
    ofType(GameFeatureActionTypes.GAME_ACTION),
    map((action: GameAction) => action.payload),
    switchMap((payload) => {
      const { message, meta } = payload;
      const { type } = message;
      let dispatch;

      switch (type) {
        case WsMessageEvents.JOIN_CHANNEL:
          dispatch = new PlayerJoined({ player: meta });
          break;
        case WsMessageEvents.HANDSHAKE:
          dispatch = new PlayerJoined({ player: meta });
          break;
        case WsMessageEvents.PIECE_PLACED:
          dispatch = new PlacePiece({ ...message.payload });
          break;
        case WsMessageEvents.VALIDATE_WIN_GAME:
          dispatch = new ValidateWinGame({ ...message.payload});
          break;
        case WsMessageEvents.VALIDATE_WIN_GAME_SUCCESS:
          dispatch = new WinGameSuccess();
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
