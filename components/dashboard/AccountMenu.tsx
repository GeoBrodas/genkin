import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  signOut: any;
}

export default function AccountMenu({ signOut }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none hover:cursor-pointer">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>GV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={'end'}>
        <Link href="/dashboard">
          <DropdownMenuItem className="hover:cursor-pointer">
            Chat system
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/analysis">
          <DropdownMenuItem className="hover:cursor-pointer">
            Analyse transactions
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/history">
          <DropdownMenuItem className="hover:cursor-pointer">
            Transactions history
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="hover:cursor-pointer">
          Visit GitHub
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <form>
          <DropdownMenuItem className="hover:cursor-pointer">
            <button formAction={signOut} className="flex items-center">
              Sign Out <LogOut className="ml-3 h-4 w-4" />
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
