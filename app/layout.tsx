import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Tree from '@/components/Tree';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/app/lib/utils';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Discord Clone',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn('flex min-h-screen antialiased', montserrat.className)}>
        <Tree />
        <Sidebar />
        <main className='relative flex flex-auto items-stretch justify-start'>
          {children}
        </main>
      </body>
    </html>
  );
}
