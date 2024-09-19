'use client';

import { useState } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function ChatForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'chat'), {
        createdAt: serverTimestamp(),
        message,
      });

      setMessage('');
      console.log('success');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <form className='px-4' onSubmit={handleSubmit}>
      {/*TODO: make resizable textarea*/}
      <input
        type='text'
        placeholder='Написать сообщение'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className='mb-4 h-10 w-full resize-none whitespace-pre-wrap break-words rounded-md bg-neutral-500 p-2 outline-none'></input>
    </form>
  );
}
