import { z } from 'zod';
import { columns } from './columns';
import { DataTable } from './DataTable';
import { transactionsSchema } from '@/schemas/form';

async function TransactionsHistory({
  data,
}: {
  data: z.infer<typeof transactionsSchema>;
}) {
  return (
    <div className="max-w-7xl mx-auto mt-16">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default TransactionsHistory;
