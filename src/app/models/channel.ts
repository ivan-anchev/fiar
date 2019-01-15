import { User } from './user';
import { WsMessageEvents } from './enums/ws-events';

export interface Channel {
  name: string;
  host: string;
  users: Set<User> | null;
}

export interface ChannelResponse {
  error?: string;
  message?: ChannelMessage;
  meta?: unknown;
  channel: WSChannel;
}

export interface WSChannel {
  name: string;
}

export interface ChannelMessage {
  type: WsMessageEvents;
}
