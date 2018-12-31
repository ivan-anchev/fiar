import { Action } from '@ngrx/store';

export enum UserActionTypes {
  CHECK_SESSION = '[User] CHECK_SESSION',
  CHECK_SESSION_SUCCESS = '[User] CHECK_SESSION_SUCCESS',
  CHECK_SESSION_FAIL = '[User] CHECK_SESSION_FAIL'
}

export class CheckSession implements Action {
  readonly type = UserActionTypes.CHECK_SESSION;
}

export class CheckSessionSuccess implements Action {
  readonly type = UserActionTypes.CHECK_SESSION_SUCCESS;
  constructor(public payload: { name }) { }
}

export class CheckSessionFail implements Action {
  readonly type = UserActionTypes.CHECK_SESSION_FAIL;
}

export type All = | CheckSession | CheckSessionFail | CheckSessionSuccess;
