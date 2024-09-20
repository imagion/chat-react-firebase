'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
}

export default function RedirectIfAuthenticated({
  children,
}: RedirectIfAuthenticatedProps) {
  const { state } = useAuthContext();
  const { user, authIsReady } = state;
  const router = useRouter();

  useEffect(() => {
    if (authIsReady && user) {
      router.push('/'); // Redirect authenticated users away from login page
    }
  }, [authIsReady, user, router]);

  if (!authIsReady) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
