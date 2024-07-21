'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-4 w-fit">
      <Link href={'/dashboard/analysis'}>
        <div
          className={`${
            pathname === '/dashboard/analysis' &&
            'border-b border-black font-semibold'
          } hover:cursor-pointer`}
        >
          Analyse transactions
        </div>
      </Link>

      <Link href={'/dashboard/history'}>
        <div
          className={`${
            pathname === '/dashboard/history' &&
            'border-b border-black font-semibold'
          } hover:cursor-pointer`}
        >
          Transactions history
        </div>
      </Link>
    </div>
  );
}

export default Navigation;
