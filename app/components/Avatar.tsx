import { cn } from '@/lib/utils';
import Image from 'next/image';
import DiscordLogo from '@/public/discord.svg';

interface AvatarProps {
  src: string;
  size: number;
}

// FIX: Avatar styling

export default function Avatar({ src, size }: AvatarProps) {
  return (
    <div
      className={cn(
        'inline-block overflow-hidden rounded-full',
        `size-[${size}px]`,
      )}>
      {src ? (
        <Image
          src={src}
          width={size}
          height={size}
          alt='Avatar'
          className='rounded-full'
        />
      ) : (
        <DiscordLogo
          width={size}
          height={size}
          alt='Avatar'
          className='rounded-full bg-neutral-300 p-1 text-indigo-600'
        />
      )}
    </div>
  );
}
