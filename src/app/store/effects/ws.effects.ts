import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { WSActions, Connect, SetConnected } from '../actions/ws.actions';
import { WsService } from '../../core/services/ws.service';

@Injectable()
export class WSEffects {
  constructor(private actions: Actions, private ws: WsService) {}

  @Effect()
  connect$: Observable<any> = this.actions.pipe(
    ofType(WSActions.CONNECT),
    map((action: Connect)  => action.payload),
    switchMap((payload) => {
      this.ws.connect(payload);
      return this.ws.isConnected$.pipe(
        map((isConnected: any) => new SetConnected({ isConnected }))
      );
    })
  );
}
