'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-4 w-fit">
      <Link className="hidden md:inline-flex" href={'/dashboard/analysis'}>
        <div
          className={`${
            pathname === '/dashboard/analysis' &&
            'border-b border-black font-semibold'
          } hover:cursor-pointer text-sm md:text-lg`}
        >
          Analyse transactions
        </div>
      </Link>

      <Link className="hidden md:inline-flex" href={'/dashboard/history'}>
        <div
          className={`${
            pathname === '/dashboard/history' &&
            'border-b border-black font-semibold'
          } hover:cursor-pointer text-sm md:text-lg`}
        >
          Transactions history
        </div>
      </Link>
    </div>
  );
}

export default Navigation;
