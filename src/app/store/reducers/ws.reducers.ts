import { Channel } from '../../models/channel';
import { WSActions, All } from '../actions/ws.actions';

export interface WSState {
  isConnected: boolean;
  channel: Channel;
  openChannels: Array<string>;
}

export const initialWSState: WSState = {
  isConnected: false,
  channel: null,
  openChannels: null
};

export function reducer(state = initialWSState, action: All) {
  switch (action.type) {
    case WSActions.SET_CONNECTED:
      return {
        ...state,
        isConnected: action.payload.isConnected
      };
    case WSActions.SET_CHANNEL:
      return {
        ...state,
        channel: action.payload.channel
      };
    case WSActions.SET_OPEN_CHANNELS:
      return {
        ...state,
        openChannels: action.payload.openChannels
      };
    default:
      return state;
  }
}
