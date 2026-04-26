'use client';

import { ReactNode } from 'react';
// import { SessionProvider } from 'next-auth/react';
// TODO: Configure next-auth API routes before enabling SessionProvider

export default function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
  // return <SessionProvider>{children}</SessionProvider>;
}
