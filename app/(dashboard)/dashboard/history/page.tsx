import { DatePickerWithRange } from '@/components/analysis/DatePicket';
import Navigation from '@/components/analysis/Navigation';
import TransactionsHistory from '@/components/history/TransactionsHistory';
import { Button } from '@/components/ui/button';
import { getFirstAndLastDayOfMonth } from '@/lib/helpers';
import { createClient } from '@/utils/supabase/server';
import { ArrowLeftIcon, RefreshCw } from 'lucide-react';
import Link from 'next/link';

async function getInitialData(from?: string, to?: string) {
  'use server';

  const { firstDay, lastDay } = getFirstAndLastDayOfMonth();

  console.log(firstDay, lastDay);

  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const res = await supabase
    .from('main')
    .select('id, description, amount, date, category')
    .eq('user_id', user.data.user?.id)
    .gte('date', from || firstDay)
    .lte('date', to || lastDay)
    .order('date', { ascending: true });

  return res.data;
}

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const data = await getInitialData(searchParams.from, searchParams.to);

  return (
    <main className="mt-[7rem]">
      <div className="w-full lg:max-w-7xl mx-auto">
        <div className="flex justify-center md:justify-between">
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
      <TransactionsHistory data={data} />
    </main>
  );
}
