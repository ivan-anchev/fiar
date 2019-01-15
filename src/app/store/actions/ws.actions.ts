import { Action } from '@ngrx/store';
import { Channel, ChannelResponse } from '../../models/channel';

export enum WSActions {
  SET_CONNECTED = '[WS] SET_CONNECTED',
  CONNECT = '[WS] CONNECT',
  CONNECT_FAIL = '[WS] CONNECT_FAIL',
  JOIN_CHANNEL = '[WS] JOIN_CHANNEL',
  CREATE_CHANNEL = '[WS] CREATE_CHANNEL',
  LEAVE_CHANNEL = '[WS] LEAVE_CHANNEL',
  WAIT_FOR_CHANNEL = '[WS] WAIT_FOR_CHANNEL',
  SET_CHANNEL = '[WS] SET_CHANNEL',
  MESSAGE_RECEIVE = '[WS] MESSAGE_RECEIVE',
  CHANNEL_MESSAGE_RECEIVE = '[WS] CHANNEL_MESSAGE_RECEIVE',
  SET_OPEN_CHANNELS = '[WS] SET_OPEN_CHANNELS',
  HANDSHAKE = '[WS] HANDSHAKE',
  NOOP_ACTION = '[WS] NOOP_ACTIONS',
  ADD_CHANNEL_USER = '[WS] ADD_CHANNEL_USER',
  RESET = '[WS] RESET'
}

export class NoopAction implements Action {
  readonly type = WSActions.NOOP_ACTION;
}

export class Connect implements Action {
  readonly type = WSActions.CONNECT;
  constructor(public payload: any) { }
}

export class ConnectFail implements Action {
  readonly type = WSActions.CONNECT_FAIL;
}

export class SetConnected implements Action {
  readonly type = WSActions.SET_CONNECTED;
  constructor(public payload: { isConnected }) { }
}

export class Handshake implements Action {
  readonly type = WSActions.HANDSHAKE;
}

export class JoinChannel implements Action {
  readonly type = WSActions.JOIN_CHANNEL;
  constructor(public payload: { channelName: string }) { }
}

export class CreateChannel implements Action {
  readonly type = WSActions.CREATE_CHANNEL;
  constructor(public payload: { channelName: string, host: string }) { }
}

export class LeaveChannel implements Action {
  readonly type = WSActions.LEAVE_CHANNEL;
}

export class WaitForChannel implements Action {
  readonly type = WSActions.WAIT_FOR_CHANNEL;
  constructor(public payload: { waitingForChannel }) { }
}

export class SetChannel implements Action {
  readonly type = WSActions.SET_CHANNEL;
  constructor(public payload: { channel }) { }
}

export class MessageReceive implements Action {
  readonly type = WSActions.MESSAGE_RECEIVE;
  constructor(public payload: { message }) { }
}

export class ChannelMessageReceive implements Action {
  readonly type = WSActions.CHANNEL_MESSAGE_RECEIVE;
  constructor(public payload: ChannelResponse) { }
}

export class SetOpenChannels implements Action {
  readonly type = WSActions.SET_OPEN_CHANNELS;
  constructor(public payload: { openChannels: Array<string> }) { }
}

export class AddChannelUser implements Action {
  readonly type = WSActions.ADD_CHANNEL_USER;
  constructor(public payload: { user }) { }
}

export class Reset implements Action {
  readonly type = WSActions.RESET;
}

export type All = Connect
  | Handshake
  | SetConnected
  | JoinChannel
  | CreateChannel
  | LeaveChannel
  | WaitForChannel
  | SetChannel
  | MessageReceive
  | ChannelMessageReceive
  | AddChannelUser
  | SetOpenChannels
  | ConnectFail
  | Reset;
