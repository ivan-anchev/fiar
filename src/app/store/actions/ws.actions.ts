import { Action } from '@ngrx/store';
import { Channel } from '../../models/channel';

export enum WSActions {
  SET_CONNECTED = '[WS] SET_CONNECTED',
  CONNECT = '[WS] CONNECT',
  JOIN_CHANNEL = '[WS] JOIN_CHANNEL',
  CREATE_CHANNEL = '[WS] CREATE_CHANNEL',
  LEAVE_CHANNEL = '[WS] LEAVE_CHANNEL',
  SET_CHANNEL = '[WS] SET_CHANNEL',
  MESSAGE_RECEIVE = '[WS] MESSAGE_RECEIVE',
  CHANNEL_MESSAGE_RECEIVE = '[WS] CHANNEL_MESSAGE_RECEIVE',
  SET_OPEN_CHANNELS = '[WS] SET_OPEN_CHANNELS',
  NOOP_ACTION = '[WS] NOOP_ACTIONS'
}

export class NoopAction implements Action {
  readonly type = WSActions.NOOP_ACTION;
}

export class Connect implements Action {
  readonly type = WSActions.CONNECT;
  constructor(public payload: any) { }
}

export class SetConnected implements Action {
  readonly type = WSActions.SET_CONNECTED;
  constructor(public payload: { isConnected }) { }
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
  constructor(public payload: { channelName: string }) { }
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
  constructor(public payload: { message, channel, meta }) { }
}

export class SetOpenChannels implements Action {
  readonly type = WSActions.SET_OPEN_CHANNELS;
  constructor(public payload: { openChannels: Array<string> }) { }
}

export type All = Connect
  | SetConnected
  | JoinChannel
  | CreateChannel
  | LeaveChannel
  | SetChannel
  | MessageReceive
  | ChannelMessageReceive
  | SetOpenChannels;
