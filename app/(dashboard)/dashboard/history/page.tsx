import { DatePickerWithRange } from '@/components/analysis/DatePicket';
import Navigation from '@/components/analysis/Navigation';
import TransactionsHistory from '@/components/history/TransactionsHistory';
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
          </div>
        </div>
      </div>

      {/* transactions history */}
      <TransactionsHistory />
    </main>
  );
}
