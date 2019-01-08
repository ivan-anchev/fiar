import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectIsConnected } from '../';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom, tap, filter } from 'rxjs/operators';
import { WsEvents } from '../../models/ws-events';
import { Channel } from '../../models/channel';
import { WsService } from '../../core/services/ws.service';
import {
  WSActions,
  NoopAction,
  Connect,
  SetConnected,
  SetChannel,
  JoinChannel,
  CreateChannel,
  LeaveChannel,
  SetOpenChannels,
  MessageReceive,
  ChannelMessageReceive } from '../actions/ws.actions';
import { GameAction } from '../../containers/game/store/actions/feature.actions';

@Injectable()
export class WSEffects {
  constructor(
    private _actions: Actions,
    private _ws: WsService,
    private _router: Router,
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
        map(eventData => {
          console.log(eventData);
          const { data, event } = eventData;
          let dispatchAction;
          if (event instanceof MessageEvent) {
            const { message, channel } = data;
            if (channel) {
              dispatchAction = new NoopAction; // Game effects handle all channel messagess
            } else {
              dispatchAction = new MessageReceive({ message });
            }
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
        map((channel) => new SetChannel({ channel }))
      );
    })
  );

  @Effect()
  createChannel$: Observable<any> = this._actions.pipe(
    ofType(WSActions.CREATE_CHANNEL),
    map((action: CreateChannel) => action.payload),
    switchMap(({ channelName, host }) => {
      const channelConfig = {
        maxSize: 2,
        host
      };
      return of(this._ws.createChannel(channelName, channelConfig)).pipe(
        map((channel) => new SetChannel({ channel })),
        tap(() => this._router.navigate(['/game']))
      );
    })
  );

  @Effect()
  setChannel$: Observable<any> = this._actions.pipe(
    ofType(WSActions.SET_CHANNEL),
    map((action: SetChannel) => action.payload),
    switchMap((payload) =>
      payload.channel.downstream.pipe(
        map(({ data }) => new ChannelMessageReceive({ ...data }))
      ))
  );

  // Test
  @Effect()
  ChannelMessageReceive$: Observable<any> = this._actions.pipe(
    ofType(WSActions.CHANNEL_MESSAGE_RECEIVE),
    map((action: ChannelMessageReceive) => action.payload),
    switchMap(payload => of(new GameAction(payload))) // Send action to game feature
  );

  @Effect()
  receiveMessage$: Observable<any> = this._actions.pipe(
    ofType(WSActions.MESSAGE_RECEIVE),
    map((action: MessageReceive ) => action.payload),
    switchMap(({ message: { type, payload } }) => {
      console.log(type, payload);
      let dispatchAction;
      switch (type) {
        case WsEvents.BROADCAST_OPEN_CHANNELS:
          const { openChannels } = payload;
          dispatchAction = new SetOpenChannels({ openChannels });
          break;
        default:
          dispatchAction = new NoopAction;
      }
      return of(dispatchAction);
    })
  );
}
