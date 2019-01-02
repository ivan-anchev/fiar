import { Action } from '@ngrx/store';

export enum UIActionTypes {
  SET_PROFILE_EDIT_MODE = '[UI] SET__PROFILE_EDIT_MODE'
}

export class SetProfileEditMode implements Action {
  readonly type = UIActionTypes.SET_PROFILE_EDIT_MODE;
  constructor(public payload: { isProfileEditMode }) { }
}

export type All = | SetProfileEditMode;
