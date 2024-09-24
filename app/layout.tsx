import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import AuthContextProvider from '@/context/AuthContext';

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
        className={cn(
          'relative flex min-h-screen flex-col antialiased',
          montserrat.className,
        )}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
