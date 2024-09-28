import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  size: number;
}

export default function Avatar({ src, size }: AvatarProps) {
  return (
    <div
      className={cn(
        'inline-block overflow-hidden rounded-full',
        `size-[${size}px]`,
      )}>
      <Image
        src={src || `/discord.svg`}
        width={size}
        height={size}
        alt='Avatar'
        className='rounded-full'
      />
    </div>
  );
}
