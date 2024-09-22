'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/hooks/useAuthContext';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { state } = useAuthContext();
  const { user, authIsReady } = state;
  const router = useRouter();

  useEffect(() => {
    if (authIsReady && !user) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [authIsReady, user, router]);

  // If auth state is not ready yet, return nothing or a loading spinner
  if (!authIsReady) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated, render the children (protected content)
  return <>{children}</>;
}
