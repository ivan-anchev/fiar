export interface User {
  id?: string;
  name: string;
  avatar: 'woman' | 'man';
  isCurrent?: boolean;
  isHost?: boolean;
}
