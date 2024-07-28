import { DatePickerWithRange } from '@/components/analysis/DatePicket';
import Navigation from '@/components/analysis/Navigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

function Loading() {
  return (
    <main className="mt-[7rem]">
      <div className="w-full lg:max-w-7xl mx-auto">
        <div className="flex justify-center md:justify-between">
          <div className="flex items-center md:space-x-3">
            <Link href="/dashboard">
              <Button size={'icon'} className="mr-4">
                <ArrowLeftIcon />
              </Button>
            </Link>

            <Navigation />
          </div>

          <div className="flex items-center space-x-2">
            <DatePickerWithRange />
          </div>
        </div>

        <div className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-3 gap-6 mt-16 mb-6 md:mb-0">
          <Skeleton className="h-[25rem]" />
          <Skeleton className="h-[25rem]" />

          <div className="grid grid-rows-3 gap-6 order-first sm:order-last">
            <Skeleton className="" />
            <Skeleton className="" />
            <Skeleton className="" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Loading;
