import { UIActionTypes, All } from '../actions/ui.actions';

export interface UIState {
  isProfileEditMode: boolean;
}

export const initialState: UIState = {
  isProfileEditMode: false
};

export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case UIActionTypes.SET_PROFILE_EDIT_MODE:
      return {
        ...state,
        isProfileEditMode: action.payload.isProfileEditMode
      };
    default: return state;
  }
}
