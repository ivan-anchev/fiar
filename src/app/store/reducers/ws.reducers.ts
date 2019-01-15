import { Channel } from '../../models/channel';
import { WSActions, All } from '../actions/ws.actions';

export interface WSState {
  isConnected: boolean;
  channel: Channel;
  openChannels: Array<string>;
  waitingForChannel: boolean;
  isServiceUnavailable: boolean;
}

export const initialWSState: WSState = {
  isConnected: false,
  channel: null,
  openChannels: null,
  waitingForChannel: false,
  isServiceUnavailable: false
};

export function reducer(state = initialWSState, action: All) {
  switch (action.type) {
    case WSActions.SET_CONNECTED:
      return {
        ...state,
        isConnected: action.payload.isConnected,
        isServiceUnavailable: false
      };
    case WSActions.CONNECT_FAIL:
      return {
        ...initialWSState,
        isServiceUnavailable: true
      };
    case WSActions.SET_CHANNEL:
      return {
        ...state,
        channel: action.payload.channel,
        waitingForChannel: false
      };
    case WSActions.WAIT_FOR_CHANNEL:
      return {
        ...state,
        waitingForChannel: action.payload.waitingForChannel
      };
    case WSActions.LEAVE_CHANNEL:
      return {
        ...state,
        channel: null
      };
    case WSActions.SET_OPEN_CHANNELS:
      return {
        ...state,
        openChannels: action.payload.openChannels
      };
    case WSActions.ADD_CHANNEL_USER:
      return {
        ...state,
        channel: {
          ...state.channel,
          users: state.channel.users.add(action.payload.user)
        }
      };
    case WSActions.RESET:
      return {
        ...state,
        isWaitingForPlayer: false,
        isWaitingForChannel: false
    };
    default:
      return state;
  }
}
