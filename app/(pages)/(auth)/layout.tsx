import RedirectIfAuthenticated from '@/components/RedirectIfAuthenticated';

RedirectIfAuthenticated;

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RedirectIfAuthenticated>{children}</RedirectIfAuthenticated>;
}
