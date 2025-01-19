'use client';

import { useState } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useUpdatePhoto } from '@/hooks/useUpdatePhoto';
import Avatar from '@/components/Avatar';

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  const { state } = useAuthContext();
  const { update } = useUpdatePhoto();

  const clientId = process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID;

  // error handling for different cases
  const validateFile = (selected: File | null): string | null => {
    if (!selected) return 'Пожалуйста, выберите файл';
    if (!selected.type.includes('image'))
      return 'Выбранный файл должен быть изображением';
    if (selected.size > 100 * 1024)
      return 'Размер изображения должен быть меньше 100кб';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorMessage = validateFile(thumbnail);
    if (errorMessage) {
      setThumbnailError(errorMessage);
      return;
    }

    setIsLoading(true);
    try {
      if (clientId) {
        await update(thumbnail as File, clientId);
      } else {
        throw new Error('Client ID is not set');
      }
      setThumbnail(null);
      setThumbnailError(null);
      setIsOpen(false);
    } catch (err: any) {
      setThumbnailError(
        'Не удалось обновить аватар. Пожалуйста, попробуйте еще раз.',
      );
      console.error('Update avatar error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files?.[0] ?? null;
    setThumbnailError(validateFile(selected));
    setThumbnail(selected);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='relative flex flex-auto cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-neutral-700'>
        <Avatar src={state.user?.photoURL || ''} size={32} />
        <div>{state.user?.displayName}</div>
      </div>

      {isOpen && (
        <div className='absolute left-0 top-0 mt-[-10px] flex w-full flex-auto -translate-y-full flex-col items-center justify-center gap-2 rounded-md bg-neutral-800 p-4'>
          <Avatar src={state.user?.photoURL || ''} size={40} />
          <div>{state.user?.displayName}</div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <label
              htmlFor='file_upload'
              className='cursor-pointer rounded-md bg-neutral-500 p-2'>
              Редактировать Аватар
            </label>
            <input
              required
              onChange={handleFileChange}
              className='w-full'
              id='file_upload'
              type='file'
              accept='image/*'
              hidden
            />

            {thumbnail && (
              <button
                type='submit'
                className='rounded-md bg-sky-600 p-1 text-white hover:bg-sky-700 disabled:bg-gray-400'
                disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Отправить'}
              </button>
            )}

            {thumbnailError && <p className='text-red-500'>{thumbnailError}</p>}
          </form>
        </div>
      )}
    </>
  );
}
