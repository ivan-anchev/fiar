import { Channel } from '../../models/channel';
import { WSActions, All } from '../actions/ws.actions';

export interface WSState {
  isConnected: boolean;
  channels: Map<String, Channel>;
}

export const initialWSState: WSState = {
  isConnected: false,
  channels: new Map()
};

export function reducer(state = initialWSState, action: All) {
  switch (action.type) {
    case WSActions.SET_CONNECTED:
      return {
        ...state,
        isConnected: action.payload.isConnected
      };
    default:
      return state;
  }
}
