'use client';

import { User } from 'firebase/auth';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';

// Define the shape of the state
type AuthState = {
  user: User | null;
};

// Define the types for the action
type AuthAction = { type: 'LOGIN'; payload: User | null } | { type: 'LOGOUT' };

// Define the initial state
const initialState: AuthState = {
  user: null,
};

export const AuthContext = createContext<
  { state: AuthState; dispatch: Dispatch<AuthAction> } | undefined
>(undefined);

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Define the props for the AuthContextProvider
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
