'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/hooks/useAuthContext';
import Loading from '@/components/Loading';

interface RedirectIfAuthenticatedProps {
  children: ReactNode;
}

export default function RedirectIfAuthenticated({
  children,
}: RedirectIfAuthenticatedProps) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const { state } = useAuthContext();
  const { user, authIsReady, isSignupComplete } = state;

  useEffect(() => {
    try {
      if (authIsReady && user && isSignupComplete) {
        // If the user exists and signup is complete, redirect
        router.push('/');
      } else {
        setIsChecking(false);
      }
    } catch (err) {
      console.error('Error during authentication check:', err);
      setIsChecking(false);
    }
  }, [authIsReady, isSignupComplete, user]);

  // Show a loading state while checking
  if (isChecking || !authIsReady) {
    return <Loading />;
  }

  return <>{children}</>;
}
