'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import { useCollection } from '@/hooks/useCollection';
import { useFirestore } from '@/hooks/useFirestore';

export default function ChatList() {
  const { state } = useAuthContext();
  const { user } = state;
  const { documents, error } = useCollection(
    'chats',
    // ['message', '!==', false],
    // ['createdAt', 'desc'],
  );
  const { deleteDocument } = useFirestore('chats');

  return (
    <ul className='scroller inset-0 flex flex-auto flex-col justify-end gap-2 overflow-x-hidden overflow-y-scroll pl-4 pr-12'>
      {error && <p>error</p>}
      {!documents && <div>Loading...</div>}

      {documents &&
        documents.map((doc) => (
          <li key={doc.id} className='flex gap-2'>
            <div>
              <img
                className='mt-1 rounded-full'
                width='40'
                height='40'
                src='https://placehold.co/40x40'
                alt='placeholder'
              />
            </div>
            <div>
              <div className='flex items-center gap-1'>
                <span className='font-medium'>Username</span>
                <time className='text-xs text-neutral-400' dateTime=''>
                  22.09.2024 20:09
                </time>
              </div>
              <p>{doc.message}</p>
            </div>
            <button
              type='button'
              className='ml-auto inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus:bg-red-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50'
              onClick={() => deleteDocument(doc.id)}>
              x
            </button>
          </li>
        ))}
      <li className='pointer-events-none block h-[30px] w-[1px]'></li>
    </ul>
  );
}
