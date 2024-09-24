import RedirectIfAuthenticated from '@/components/RedirectIfAuthenticated';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RedirectIfAuthenticated>
      <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-800 to-indigo-900'>
        <div className='flex min-w-[480px] flex-col gap-5 rounded bg-neutral-700 p-10 shadow-xl'>
          {children}
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
}
