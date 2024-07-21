'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  from: string | undefined;
  to: string | undefined;
}

function RefreshButton({ from, to }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      size={'icon'}
      onClick={() => router.push(`${pathname}?from=${from}&to=${to}`)}
    >
      <RefreshCw className="w-5 h-5" />
    </Button>
  );
}

export default RefreshButton;
