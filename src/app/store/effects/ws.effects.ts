import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { AppState, selectIsConnected, selectUser, selectChannelUsers } from '../';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, retry } from 'rxjs/operators';
import { WsEvents, WsMessageEvents } from '../../models/enums/ws-events';
import { WsService } from '../../core/services/ws.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import {
  WSActions,
  NoopAction,
  Connect,
  SetConnected,
  SetChannel,
  JoinChannel,
  CreateChannel,
  LeaveChannel,
  ConnectFail,
  AddChannelUser,
  Handshake,
  SetOpenChannels,
  MessageReceive,
  ChannelMessageReceive
} from '../actions/ws.actions';
import {
  GameAction,
  WsAction,
  GameFeatureActionTypes
} from '../../views/game/store/actions/feature.actions';

@Injectable()
export class WSEffects {
  constructor(
    private _actions: Actions,
    private _ws: WsService,
    private _router: Router,
    private _store: Store<AppState>,
    private _errorHandler: ErrorHandlerService) { }

  @Effect()
  connect$: Observable<any> = this._actions.pipe(
    ofType(WSActions.CONNECT),
    withLatestFrom(this._store.select(selectIsConnected)),
    map(([action, isConnectedFromState]) => ({ payload: (<Connect>action).payload, isConnectedFromState })),
    switchMap(({ payload, isConnectedFromState }) => {
      // If already connected, kill connection before reconnecting
      if (isConnectedFromState) {
        this._ws.close();
      }

      return this._ws.connect(payload).pipe(
        map(this._handleConnectionEvent),
        retry(3), // Retry connection up to 3 times
        catchError(err => this._handleConnectionError(err))
      );
    })
  );

  @Effect()
  joinChannel$: Observable<any> = this._actions.pipe(
    ofType(WSActions.JOIN_CHANNEL),
    map((action: JoinChannel) => action.payload),
    switchMap(({ channelName }) => of(this._ws.joinChannel(channelName)).pipe(
        withLatestFrom(this._store.select(selectUser)),
        switchMap(([channel, user]) => [
          new SetChannel({ channel }),
          new AddChannelUser(({ user: { ...user, isHost: false, isClient: true } }))
        ])
      )
    )
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

      return this._ws.createChannel(channelName, channelConfig).pipe(
        withLatestFrom(this._store.select(selectUser)),
        switchMap(([channel, user]) => [
            new SetChannel({ channel }),
            new AddChannelUser({ user: { ...user, isHost: true, isClient: true } })
          ]
        ),
        catchError((err: Error) => {
          this._errorHandler.displayError(err.message);
          return of(new NoopAction);
        })
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

  @Effect({ dispatch: false })
  leaveChannel$: Observable<any> = this._actions.pipe(
    ofType(WSActions.LEAVE_CHANNEL),
    switchMap(() => of(this._ws.leaveChannel()))
  );

  @Effect({ dispatch: false })
  handshake$: Observable<any> = this._actions.pipe(
    ofType(WSActions.HANDSHAKE),
    switchMap(() => of(this._ws.send({ type: WsMessageEvents.HANDSHAKE, accept: true })))
  );

  @Effect()
  channelMessageReceive$: Observable<any> = this._actions.pipe(
    ofType(WSActions.CHANNEL_MESSAGE_RECEIVE),
    map((action: ChannelMessageReceive) => action.payload),
    switchMap(payload => {
      const { error, message, meta } = payload;
      const { type } = message;

      if (error) {
        // TODO: handle error
      }

      let ret;

      switch (type) {
        // Intercept certain events which are not related to the game itself or have side effects
        case WsMessageEvents.JOIN_CHANNEL:
          this._router.navigate(['/game']);
          ret = [
            new AddChannelUser({ user: meta }),
            new Handshake
          ];

          break;
        case WsMessageEvents.HANDSHAKE:
          this._router.navigate(['/game']);
          ret = of(new AddChannelUser({ user: { ...meta, isHost: true } }));
          break;
        default:
          ret = of(new GameAction(payload));
          break;
      }

      return ret;
    })
  );

  @Effect()
  receiveMessage$: Observable<any> = this._actions.pipe(
    ofType(WSActions.MESSAGE_RECEIVE),
    map((action: MessageReceive) => action.payload),
    switchMap(({ message: { type, payload } }) => {
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

  @Effect({ dispatch: false })
  gameFeatureWsAction$: Observable<any> = this._actions.pipe(
    ofType(GameFeatureActionTypes.WS_ACTION),
    map((action: WsAction) => action.payload),
    switchMap(payload => of(this._ws.send(payload)))
  );

  private _handleConnectionError(errorEvent: Error | Event): Observable<any> {
    if (errorEvent instanceof Event && errorEvent.type === 'error') {
      this._ws.killConnection();
      this._errorHandler.displayError('Service unavailable, please try again later');
      return of(new ConnectFail);
    }
  }

  private _handleConnectionEvent(eventObj): Action {
    const { data, event } = eventObj;
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
  }
}
