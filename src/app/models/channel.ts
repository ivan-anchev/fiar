import { User } from './user';

export interface Channel {
  name: string;
  host: string;
  users: Set<User> | null;
}
