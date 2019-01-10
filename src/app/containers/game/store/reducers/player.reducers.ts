import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../../../models/user';
import { PlayerActionTypes, All } from '../actions/player.actions';

export interface PlayerState extends EntityState<User> {
}

// Channel(game) host is always first
const sortFn = (a: User, b: User) => a.isHost ? -1 : 1;

export const playerAdapter = createEntityAdapter<User>({
  sortComparer: sortFn
});

export const initialState: PlayerState = playerAdapter.getInitialState();

export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case PlayerActionTypes.ADD:
      return playerAdapter.addOne(action.payload.player, state);
    case PlayerActionTypes.DELETE:
      return playerAdapter.removeOne(action.payload.id, state);
    case PlayerActionTypes.ADD_ALL:
      return playerAdapter.addAll(action.payload.players, state);
    default: return state;
  }
}
