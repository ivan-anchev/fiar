import { User } from './user';

export interface Player extends User {
  isClient?: boolean;
  isHost?: boolean;
}
