export const dynamic = 'force-dynamic';

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// navbar imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AI } from './actions';

import { Separator } from '@/components/ui/separator';

import Link from 'next/link';
import { signOut } from '../auth/action';
import { Toaster } from '@/components/ui/toaster';
import AccountMenu from '@/components/dashboard/AccountMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Genkin - Dashboard',
};

export const viewport: Viewport = {
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />

        <AI
          initialAIState={{
            //@ts-ignore
            interactions: [],
            messages: [],
          }}
        >
          {children}
        </AI>
        <Toaster />
      </body>
    </html>
  );
}

function NavBar() {
  return (
    <div className="fixed top-0 z-10 backdrop-blur-xl w-full">
      <header className="w-[95%] md:max-w-7xl mx-auto h-14 flex justify-between items-center py-10">
        <Link href="/">
          <h3 className="text-lg md:text-2xl">
            <span className="">genkin</span>.ai
            <span className="animate-ping">_</span>
          </h3>
        </Link>

        <div className="flex items-center space-x-2">
          <Button variant={'link'} className="hidden md:inline-flex">
            Privacy Policy
          </Button>

          <AccountMenu signOut={signOut} />
        </div>
      </header>

      <Separator />
    </div>
  );
}
