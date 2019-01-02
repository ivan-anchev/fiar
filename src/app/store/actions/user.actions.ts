import { Action } from '@ngrx/store';

export enum UserActionTypes {
  CHECK_SESSION = '[User] CHECK_SESSION',
  CHECK_SESSION_SUCCESS = '[User] CHECK_SESSION_SUCCESS',
  CHECK_SESSION_FAIL = '[User] CHECK_SESSION_FAIL',
  SET_USER = '[User] SET_USER'
}

export class CheckSession implements Action {
  readonly type = UserActionTypes.CHECK_SESSION;
}

export class CheckSessionSuccess implements Action {
  readonly type = UserActionTypes.CHECK_SESSION_SUCCESS;
  constructor(public payload: { name, avatar }) { }
}

export class CheckSessionFail implements Action {
  readonly type = UserActionTypes.CHECK_SESSION_FAIL;
}

export class SetUser implements Action {
  readonly type = UserActionTypes.SET_USER;
  constructor(public payload: { name, avatar }) { }
}

export type All = | SetUser | CheckSession | CheckSessionFail | CheckSessionSuccess;
