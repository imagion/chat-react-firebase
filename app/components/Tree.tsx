import React from 'react';
import DiscordLogo from '@/public/discord.svg';

export default function Tree() {
  return (
    <nav className='flex w-16 flex-col items-center overflow-hidden bg-stone-800 pt-3'>
      <div className='tree__list-item mb-2'>
        <DiscordLogo width={30} height={30} />
      </div>
      <div className='mb-2'>
        <div className='h-[2px] w-8 rounded-sm bg-slate-700'></div>
      </div>
      <div className='tree__list-item mb-2'>2</div>
      <div className='tree__list-item mb-2'>3</div>
      <div className='tree__list-item mb-2'>4</div>
    </nav>
  );
}
