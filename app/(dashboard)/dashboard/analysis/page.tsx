export const dynamic = 'force-dynamic';

import { CategoryAnalysis } from '@/components/analysis/CategoryAnalysis';
import { DatePickerWithRange } from '@/components/analysis/DatePicket';
import WeeklyAnalysis from '@/components/analysis/WeeklyAnalysis';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, RefreshCw } from 'lucide-react';
import CashFlowCard from '@/components/analysis/CashFlowCard';
import Link from 'next/link';
import Navigation from '@/components/analysis/Navigation';
import { createClient } from '@/utils/supabase/server';
import {
  calculateMoneySpentByDay,
  getCategorisedData,
  getCurrentWeekDates,
  getFirstAndLastDayOfMonth,
  getInflowsAmount,
  getOutflowsAmount,
} from '@/lib/helpers';

async function getInitialData(from?: string, to?: string) {
  'use server';

  const { firstDay, lastDay } = getFirstAndLastDayOfMonth('server');

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

async function getWeeklyData() {
  'use server';

  const { startOfWeek, endOfWeek } = getCurrentWeekDates();

  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const res = await supabase
    .from('main')
    .select('id, description, amount, date, category')
    .eq('user_id', user.data.user?.id)
    .gte('date', startOfWeek)
    .lte('date', endOfWeek)
    .order('date', { ascending: true });

  return res.data;
}

export default async function AnalysisPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const data = await getInitialData(searchParams.from, searchParams.to);
  let totalInflows = getInflowsAmount(data);
  let totalOutflows = getOutflowsAmount(data);

  const categorisedData = getCategorisedData(data);

  const weeklyData = await getWeeklyData();
  const weeklyChartData = calculateMoneySpentByDay(weeklyData);

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

        <div className="grid grid-cols-3 gap-6 mt-16">
          <WeeklyAnalysis chartData={weeklyChartData} />
          <CategoryAnalysis
            noData={
              data.length === 0 ||
              categorisedData.every((category) => category.totalValue === 0)
            }
            chartData={categorisedData}
          />

          <div className="grid grid-rows-3 gap-6">
            <CashFlowCard amount={totalInflows} type="inflow" />
            <CashFlowCard amount={totalOutflows} type="outflow" />
            <CashFlowCard amount={totalInflows - totalOutflows} type="net" />
          </div>
        </div>
      </div>
    </main>
  );
}
