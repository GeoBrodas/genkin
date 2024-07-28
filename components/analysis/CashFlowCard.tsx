import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Props {
  type: 'inflow' | 'outflow' | 'net';
  amount: number;
}

function CashFlowCard({ type, amount }: Props) {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total{' '}
          {type === 'inflow'
            ? 'Inflows'
            : type === 'outflow'
            ? 'Outflows'
            : 'Revenue'}
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {type === 'inflow'
            ? '+ '
            : type === 'outflow'
            ? '- '
            : amount < 0
            ? '- '
            : '+ '}
          {`\u20B9`}
          {Math.abs(amount)}
        </div>
        {/* <p className="text-xs text-muted-foreground">
          Money earnt from salary was highest
        </p> */}
      </CardContent>
    </Card>
  );
}

export default CashFlowCard;
