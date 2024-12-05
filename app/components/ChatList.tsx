'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useCollection } from '@/hooks/useCollection';
import { useFirestore } from '@/hooks/useFirestore';
import DiscordLogo from '@/public/discord.svg';

// NOTE: Consider memoizing the mapped elements (like individual li items) using React.memo()

// Define the interface for user information
interface UserInfo {
  displayName: string;
  photoURL: string | null;
}

export default function ChatList() {
  const { state } = useAuthContext();
  const { user: authUser } = state;
  const { documents, error } = useCollection('chats', undefined, [
    'createdAt',
    'asc',
  ]);
  const { deleteDocument } = useFirestore('chats');

  const [userProfiles, setUserProfiles] = useState<{ [key: string]: UserInfo }>(
    {},
  );

  // Fetch user data (displayName and photoURL) for each chat message
  // Wrap it in useCallback to avoid unnecessary re-renders and function recreations
  const fetchUserProfiles = useCallback(async () => {
    if (documents) {
      try {
        const profilePromises = documents.map(async (document) => {
          // Skip fetching Firestore data for authenticated users and undefined users.
          if (!authUser || document.uid === authUser?.uid) return null;

          const userRef = doc(db, 'users', document.uid); // Fetch from users collection
          const userSnap = await getDoc(userRef);
          return {
            uid: document.uid,
            displayName: userSnap.data()?.displayName || 'Unknown',
            photoURL: userSnap.data()?.photoURL || null,
          };
        });

        // Waits and resolves of array of promises
        const profiles = await Promise.all(profilePromises);

        // Remove null values and map remaining profiles to state
        const profileMap = profiles.reduce(
          (acc, profile) =>
            profile ? { ...acc, [profile.uid]: profile } : acc,
          {},
        );

        setUserProfiles(profileMap);
      } catch (error) {
        console.error('Error fetching user profiles:', error);
      }
    }
  }, [documents, authUser]);

  // Use useEffect to trigger fetchUserProfiles
  useEffect(() => {
    fetchUserProfiles();
  }, [fetchUserProfiles]);

  return (
    <ul className='scroller inset-0 flex flex-auto flex-col justify-end gap-2 overflow-x-hidden overflow-y-scroll pl-4 pr-12'>
      {error && <p className='text-red-500'>error</p>}
      {!documents && <div>Loading...</div>}

      {documents &&
        documents.map((doc) => {
          const user =
            doc.uid === authUser?.uid
              ? {
                  displayName: authUser?.displayName || 'You',
                  photoURL: authUser?.photoURL,
                }
              : userProfiles[doc.uid] || {
                  displayName: 'Unknown',
                  photoURL: null,
                };

          return (
            <li key={doc.id} className='flex gap-2'>
              <div className=''>
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    width={40}
                    height={40}
                    alt='User Avatar'
                    className='mt-1 rounded-full'
                  />
                ) : (
                  <DiscordLogo
                    width={40}
                    height={40}
                    alt='Discord Logo'
                    className='mt-1 rounded-full bg-neutral-300 p-1 text-indigo-600'
                  />
                )}
              </div>
              <div>
                <div className='flex items-center gap-1'>
                  <span className='font-medium'>{user.displayName}</span>
                  <time
                    className='text-xs text-neutral-400'
                    dateTime={new Date(
                      doc.createdAt?.seconds * 1000 || Date.now(),
                    ).toISOString()}>
                    {new Date(
                      doc.createdAt?.seconds * 1000 || Date.now(),
                    ).toLocaleString()}
                  </time>
                </div>
                <p>{doc.message}</p>
              </div>
              {doc.uid === authUser?.uid && (
                <button
                  type='button'
                  className='ml-auto inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus:bg-red-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
                  onClick={() => deleteDocument(doc.id)}>
                  x
                </button>
              )}
            </li>
          );
        })}
      <li className='pointer-events-none block h-[30px] w-[1px]'></li>
    </ul>
  );
}
