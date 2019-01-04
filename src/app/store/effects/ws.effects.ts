import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState, selectIsConnected } from '../';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { WsEvents } from '../../models/ws-events';
import { Channel } from '../../models/channel';
import { WsService } from '../../core/services/ws.service';
import {
  WSActions,
  Connect,
  SetConnected,
  SetChannel,
  JoinChannel,
  LeaveChannel,
  SetOpenChannels,
  MessageReceive } from '../actions/ws.actions';

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

      return this._ws.connect(payload).pipe(
        map(message => {
          const { data, event } = message;
          let dispatchAction;
          if (event instanceof MessageEvent) {
            dispatchAction = new MessageReceive({ message: data });
          } else {
            const isConnected = !(event instanceof CloseEvent);
            dispatchAction = new SetConnected({ isConnected });
          }

          return dispatchAction;
        })
      );
    })
  );

  @Effect()
  joinChannel$: Observable<any> = this._actions.pipe(
    ofType(WSActions.JOIN_CHANNEL),
    map((action: JoinChannel) => action.payload),
    switchMap(({ channelName }) => {
      return of(this._ws.joinChannel(channelName)).pipe(
        map((channel: Channel) => new SetChannel({ channel }))
      );
    })
  );

  @Effect()
  createChannel$: Observable<any> = this._actions.pipe(
    ofType(WSActions.CREATE_CHANNEL),
    map((action: JoinChannel) => action.payload),
    switchMap(({ channelName }) => {
      return of(this._ws.createChannel(channelName)).pipe(
        map((channel: Channel) => new SetChannel({ channel }))
      );
    })
  );

  @Effect()
  receiveMessage$: Observable<any> = this._actions.pipe(
    ofType(WSActions.MESSAGE_RECEIVE),
    map((action: MessageReceive ) => action.payload),
    switchMap(({ message: { type, payload } }) => {
      let dispatchAction;
      switch (type) {
        case WsEvents.BROADCAST_OPEN_CHANNELS:
          const { openChannels } = payload;
          dispatchAction = new SetOpenChannels({ openChannels });
      }
      return of(dispatchAction);
    })
  );
}
