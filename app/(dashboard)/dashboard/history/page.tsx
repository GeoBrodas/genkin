import { DatePickerWithRange } from '@/components/analysis/DatePicket';
import Navigation from '@/components/analysis/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  return (
    <main className="mt-[7rem]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button size={'icon'} className="mr-4">
                <ArrowLeftIcon />
              </Button>
            </Link>

            <Navigation />
          </div>

          <div className="flex items-center space-x-2">
            <DatePickerWithRange />
            <Button size={'icon'}>
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* transactions history */}
    </main>
  );
}
