import { Action } from '@ngrx/store';
import { User } from '../../../../models/user';

export enum PlayerActionTypes {
  PLAYER_JOINED = '[Player] PLAYER_JOINED',
  PLAYER_LEFT = '[Player] PLAYER_LEFT',
  ADD = '[Player] ADD',
  DELETE = '[Player] DELETE',
  ADD_ALL = '[Player] ADD_ALL'
}


export class PlayerJoined implements Action {
  readonly type = PlayerActionTypes.PLAYER_JOINED;
  constructor(public payload: { player: User }) { }
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
  readonly type = PlayerActionTypes.ADD_ALL;
  constructor(public payload: { players: Array<User> }) { }
}

export type All = Add | PlayerJoined | Delete | AddAll;
