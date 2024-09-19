import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthContext } from '@/hooks/useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const provider = new GoogleAuthProvider();

  const signupWithEmailAndPassword = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // if we have not recieved a response
      if (!res) {
        throw Error('Could not complete signup');
      }

      // add 'displayName' meta to newly created user
      await updateProfile(res.user, { displayName });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  const signupWithGoogle = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider);

      if (!res) {
        throw Error('Could not complete signup');
      }

      dispatch({ type: 'LOGIN', payload: res.user });

      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signupWithEmailAndPassword, signupWithGoogle };
};
