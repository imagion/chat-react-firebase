'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { updateProfile, User } from 'firebase/auth';

// Define the return type of the hook
type UseUpdatePhotoReturn = {
  update: (thumbnail: File) => Promise<void>;
};

export const useUpdatePhoto = (): UseUpdatePhotoReturn => {
  const { state } = useAuthContext();

  const update = async (thumbnail: File): Promise<void> => {
    if (!state.user) throw new Error('User is not authenticated');

    // upload image to Firebase Storage
    const uploadPath = `thumbnails/${state.user.uid}/${thumbnail.name}`;
    const storageRef = ref(storage, uploadPath);
    const uploadResult = await uploadBytes(storageRef, thumbnail);
    const imgUrl = await getDownloadURL(uploadResult.ref);

    // add 'photoURL' to the user profile
    await updateProfile(state.user as User, { photoURL: imgUrl });
  };

  return { update };
};
