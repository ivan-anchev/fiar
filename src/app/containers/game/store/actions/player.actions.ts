import { Action } from '@ngrx/store';
import { User } from '../../../../models/user';

export enum PlayerActionTypes {
  ADD = '[Player] ADD',
  DELETE = '[Player] DELETE',
  GET_ALL = '[Player] GET_ALL'
}

export class Add implements Action {
  readonly type = PlayerActionTypes.ADD;
  constructor(public payload: { player: User }) { }
}

export class Delete implements Action {
  readonly type = PlayerActionTypes.DELETE;
  constructor(public payload: { id: string }) { }
}

export class AddAll implements Action {
  readonly type = PlayerActionTypes.GET_ALL;
  constructor(public payload: { players: Array<User> }) { }
}

export type All = Add | Delete | AddAll;
