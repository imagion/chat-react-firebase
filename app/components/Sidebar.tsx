'use client';

import React from 'react';
import { useLogout } from '@/hooks/useLogout';
import LogoutIcon from '@/public/logout.svg';
import UserProfile from '@/components/UserProfile';

export default function Sidebar() {
  const { logout } = useLogout();

  return (
    <div className='flex w-60 flex-initial flex-col overflow-hidden bg-neutral-700'>
      <nav className='flex flex-auto flex-col'>
        <header className='relative px-4 py-3 font-medium shadow-md'>
          <h2>Server Name</h2>
        </header>
        <div className='scroller flex-auto overflow-x-hidden overflow-y-scroll'>
          <ul>
            <li>
              <div>Channel 1</div>
            </li>
            <li>
              <div>Channel 2</div>
            </li>
            <li>
              <div>Channel 3</div>
            </li>
            <li>
              <div>Channel 4</div>
            </li>
          </ul>
        </div>
      </nav>
      <section className='flex flex-initial bg-zinc-800'>
        <div className='h-13 relative flex flex-auto items-center justify-between p-1 px-2 text-sm font-medium'>
          <UserProfile />
          <button onClick={logout} className='cursor-pointer p-2 text-red-600'>
            <LogoutIcon width={24} height={24} />
          </button>
        </div>
      </section>
    </div>
  );
}
