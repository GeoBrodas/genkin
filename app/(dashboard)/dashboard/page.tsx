export const dynamic = 'force-dynamic';
import Dashboard from '@/components/dashboard/Dashboard';
import { AI } from '../actions';

export default function DashboardPage() {
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
