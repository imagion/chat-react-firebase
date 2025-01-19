'use client';

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AuthAction, AuthState } from '@/types/AuthContextTypes';

// Define the initial state
const initialState: AuthState = {
  user: null,
  authIsReady: false,
  isSignupComplete: false,
};

export const AuthContext = createContext<
  { state: AuthState; dispatch: Dispatch<AuthAction> } | undefined
>(undefined);

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    case 'SIGNUP_COMPLETE':
      return { ...state, isSignupComplete: true };
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log('🚀 -> AuthContextProvider -> state:', state);

  // get user information from firebase on first render
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
