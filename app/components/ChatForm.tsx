'use client';

import { useEffect, useState } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function ChatForm() {
  const [message, setMessage] = useState('');
  const { addDocument, response } = useFirestore('chats');
  const { state } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addDocument({
      uid: state.user?.uid,
      message,
    });
  };

  // Reset the form field when the document is successfully added
  useEffect(() => {
    if (response.success) {
      setMessage('');
    }
  }, [response.success]);

  return (
    <form className='px-4' onSubmit={handleSubmit}>
      <input
        required
        type='text'
        placeholder='Написать сообщение'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className='mb-4 h-10 w-full resize-none whitespace-pre-wrap break-words rounded-md bg-neutral-500 p-2 outline-none'
      />
    </form>
  );
}
