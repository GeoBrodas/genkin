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
      </div>

      <div className="w-[95%] flex flex-col md:max-w-7xl mx-auto mt-16">
        <Skeleton className="w-full h-[25rem]" />

        <div className="flex mt-2 items-center md:justify-between space-x-2">
          <Skeleton className="w-[7rem] h-[2rem]" />

          <div className="flex items-center space-x-2">
            <Skeleton className="w-[7rem] h-[2rem]" />
            <Skeleton className="w-[7rem] h-[2rem]" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Loading;
