'use client';

import { useEffect, useMemo, useReducer, useRef } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useAuthContext } from '@/hooks/useAuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { Action, State } from '@/types/useSignupTypes';
import { AuthAction } from '@/types/AuthContextTypes';

const initialState: State = {
  error: null,
  isPending: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PENDING':
      return { ...state, isPending: action.payload };
    default:
      return state;
  }
};

export const useSignup = () => {
  const [state, dispatchState] = useReducer(reducer, initialState);
  const { dispatch }: { dispatch: React.Dispatch<AuthAction> } =
    useAuthContext();
  const isCancelled = useRef<boolean>(false);
  const provider = useMemo(() => new GoogleAuthProvider(), []);

  // centralized error handling
  const handleError = (err: unknown) => {
    if (!isCancelled.current && err instanceof Error) {
      console.error(err.message);
      dispatchState({ type: 'SET_ERROR', payload: err.message });
      dispatchState({ type: 'SET_PENDING', payload: false });
    }
  };

  // handle both, password and google signups
  const handleAuthResponse = async (
    res: UserCredential,
    displayName?: string,
  ) => {
    if (!res) throw new Error('Could not complete signup');

    if (displayName) {
      await updateProfile(res.user, { displayName });
      await setDoc(doc(db, 'users', res.user.uid), {
        online: true,
        displayName,
        photoURL: res.user.photoURL || null,
      });
    }

    dispatch({ type: 'LOGIN', payload: res.user });
    if (!isCancelled.current) {
      dispatchState({ type: 'SET_ERROR', payload: null });
      dispatchState({ type: 'SET_PENDING', payload: false });
    }
  };

  const signupWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    dispatchState({ type: 'SET_ERROR', payload: null });
    dispatchState({ type: 'SET_PENDING', payload: true });
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await handleAuthResponse(res, displayName);
    } catch (err) {
      handleError(err);
    }
  };

  const signupWithGoogle = async () => {
    dispatchState({ type: 'SET_ERROR', payload: null });
    dispatchState({ type: 'SET_PENDING', payload: true });
    try {
      const res = await signInWithPopup(auth, provider);
      await handleAuthResponse(res);
    } catch (err) {
      handleError(err);
    }
  };

  // cleanup function
  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return {
    error: state.error,
    isPending: state.isPending,
    signupWithEmailAndPassword,
    signupWithGoogle,
  };
};
