import { AI } from '../actions';
import Dashboard from '@/components/dashboard/Dashboard';
import { unstable_noStore as noStore } from 'next/cache';

export default function DashboardPage() {
  noStore();

  return (
    <AI
      initialAIState={{
        //@ts-ignore
        interactions: [],
        messages: [],
      }}
    >
      <Dashboard />
    </AI>
  );
}
