import { BotMessageSquare, History, LogOut, PieChart } from 'lucide-react';
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
            <BotMessageSquare className="mr-2 h-4 w-4" /> Chat system
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/analysis">
          <DropdownMenuItem className="hover:cursor-pointer">
            <PieChart className="mr-2 h-4 w-4" /> Analyse transactions
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/history">
          <DropdownMenuItem className="hover:cursor-pointer">
            <History className="mr-2 h-4 w-4" /> Transactions history
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator className="bg-gray-200" />

        <form>
          <DropdownMenuItem className="hover:cursor-pointer flex justify-center">
            <button
              formAction={signOut}
              className="flex justify-center items-center bg-black text-white w-full p-2 rounded-md"
            >
              Sign Out <LogOut className="ml-3 h-4 w-4" />
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
