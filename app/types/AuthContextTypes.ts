import { User } from 'firebase/auth';

export type AuthState = {
  user: User | null;
  authIsReady: boolean;
};

export type AuthAction =
  | { type: 'LOGIN'; payload: User | null }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_IS_READY'; payload: User | null };
