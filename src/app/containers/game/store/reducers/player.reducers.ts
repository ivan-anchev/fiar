import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../../../models/user';
import { PlayerActionTypes, All } from '../actions/player.actions';

export interface PlayerState extends EntityState<User> {
}

export const playerAdapter = createEntityAdapter<User>();
export const initialState: PlayerState = playerAdapter.getInitialState();

export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case PlayerActionTypes.ADD:
      return playerAdapter.addOne(action.payload.player, state);
    case PlayerActionTypes.DELETE:
      return playerAdapter.removeOne(action.payload.id, state);
    default: return state;
  }
}
