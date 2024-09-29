'use client';

import { useEffect, useState } from 'react';
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

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const provider = new GoogleAuthProvider();

  // NOTE: maybe I can merge this functions to prevent DRY code

  const signupWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string,
  ): Promise<void> => {
    setError(null);
    setIsPending(true);

    // sign in user
    try {
      const res: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // check if we have not recieved a response
      if (!res) {
        throw new Error('Could not complete signup');
      }

      // add 'displayName' meta to newly created user
      await updateProfile(res.user, { displayName });

      // create a user document
      setDoc(doc(db, 'users', res.user.uid), {
        online: true,
        displayName,
        photoURL: null,
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  const signupWithGoogle = async (): Promise<void> => {
    setError(null);
    setIsPending(true);

    // sign in user via google
    try {
      const res: UserCredential = await signInWithPopup(auth, provider);

      // check if we have not recieved a response
      if (!res) {
        throw new Error('Could not complete signup');
      }

      dispatch({ type: 'LOGIN', payload: res.user });

      // update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signupWithEmailAndPassword, signupWithGoogle };
};
