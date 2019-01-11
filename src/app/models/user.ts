export interface User {
  id?: string;
  name: string;
  avatar: 'woman' | 'man';
  isClient?: boolean;
  isHost?: boolean;
}
