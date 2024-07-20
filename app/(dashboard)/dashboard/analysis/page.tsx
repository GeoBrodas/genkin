import { CategoryAnalysis } from '@/components/analysis/CategoryAnalysis';
import { DatePickerWithRange } from '@/components/analysis/DatePicket';
import WeeklyAnalysis from '@/components/analysis/WeeklyAnalysis';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, RefreshCw } from 'lucide-react';
import CashFlowCard from '@/components/analysis/CashFlowCard';
import Link from 'next/link';

export default function AnalysisPage() {
  return (
    <main className="pt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button size={'icon'}>
                <ArrowLeftIcon />
              </Button>
            </Link>
            <h3 className="text-2xl font-semibold">Transactions Analysis</h3>
          </div>

          <div className="flex items-center space-x-2">
            <DatePickerWithRange />
            <Button size={'icon'}>
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-16">
          <WeeklyAnalysis />
          <CategoryAnalysis />

          <div className="grid grid-rows-3 gap-6">
            <CashFlowCard type="inflow" />
            <CashFlowCard type="outflow" />
            <CashFlowCard type="net" />
          </div>
        </div>
      </div>
    </main>
  );
}
