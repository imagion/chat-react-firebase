'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import axios from 'axios';
import { db } from '@/lib/firebase';
import { updateProfile, User } from 'firebase/auth';
import { UseUpdatePhotoReturn } from '@/types/useUpdatePhotoTypes';
import { doc, updateDoc } from 'firebase/firestore';

export const useUpdatePhoto = (): UseUpdatePhotoReturn => {
  const { state } = useAuthContext();

  const update = async (thumbnail: File, clientId: string): Promise<void> => {
    if (!state.user) throw new Error('User is not authenticated');

    try {
      // Log the client ID to ensure it's set
      console.log('🚀 -> update -> clientId:', clientId);

      // Upload image to Imgur
      const formData = new FormData();
      formData.append('image', thumbnail);

      const response = await axios.post(
        'https://api.imgur.com/3/image',
        formData,
        {
          headers: {
            Authorization: `Client-ID ${clientId}`,
          },
        },
      );

      const imgUrl = response.data.data.link;
      console.log('🚀 -> update -> imgUrl:', imgUrl);

      // add 'photoURL' to the user profile
      await updateProfile(state.user as User, { photoURL: imgUrl });

      // update user document in Firestore
      const userDocRef = doc(db, 'users', state.user.uid);
      await updateDoc(userDocRef, {
        photoURL: imgUrl,
      });
    } catch (err) {
      console.error('Error updating photo:', err);
    }
  };

  return { update };
};
