import { User } from '../../models/user';
import { All, UserActionTypes } from '../actions/user.actions';

export interface UserState {
  user: User | null;
  isSessionChecked: boolean;
  isCheckingSession: boolean;
}

export const initialState: UserState = {
  user: { name: '', avatar: 'man' },
  isSessionChecked: false,
  isCheckingSession: false
};

export function reducer(state = initialState, action: All): UserState {
  switch (action.type) {
    case UserActionTypes.CHECK_SESSION_SUCCESS:
      return {
        ...state,
        isSessionChecked: true,
        isCheckingSession: false,
        user: { ...action.payload }
      };
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: { ...action.payload }
      };
    default: return state;
  }
}
