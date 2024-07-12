import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// navbar imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AI } from './actions';

// account menu bar imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Genkin - Dashboard',
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
      </body>
    </html>
  );
}

function NavBar() {
  return (
    <header className="px-4 lg:px-6 xl:px-14 h-14 flex justify-between items-center py-12">
      <h3 className="text-2xl">
        <span className="">genkin</span>.ai
        <span className="animate-ping">_</span>
      </h3>

      <div className="flex items-center space-x-2">
        <Button variant={'link'}>Privacy Policy</Button>

        <AccountMenu />
      </div>
    </header>
  );
}

function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none hover:cursor-pointer">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>GV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem className="hover:cursor-pointer">
          Transaction history
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          Visit GitHub
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="hover:cursor-pointer">
          Sign Out <LogOut className="ml-3 h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
