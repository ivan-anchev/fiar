import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState, selectIsConnected } from '../';
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { WSActions, Connect, SetConnected } from '../actions/ws.actions';
import { WsService } from '../../core/services/ws.service';

@Injectable()
export class WSEffects {
  constructor(
    private _actions: Actions,
    private _ws: WsService,
    private _store: Store<AppState>) {}

  @Effect()
  connect$: Observable<any> = this._actions.pipe(
    ofType(WSActions.CONNECT),
    withLatestFrom(this._store.select(selectIsConnected)),
    map(([action , isConnectedFromState]) => ({ payload: (<Connect>action).payload, isConnectedFromState})),
    switchMap(({ payload, isConnectedFromState }) => {
      // If already connected, kill connection before reconnecting
      if (isConnectedFromState) {
        this._ws.close();
      }

      this._ws.connect(payload);

      return this._ws.isConnected$.pipe(
        map((isConnected: any) => new SetConnected({ isConnected }))
      );
    })
  );
}
