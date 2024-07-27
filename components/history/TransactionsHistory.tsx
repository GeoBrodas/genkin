import { z } from 'zod';
import { columns } from './columns';
import { DataTable } from './DataTable';
import { transactionsSchema } from '@/schemas/form';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

async function TransactionsHistory({
  data,
}: {
  data: z.infer<typeof transactionsSchema>;
}) {
  return (
    <div className="w-[95%] md:max-w-7xl mx-auto mt-16">
      <ScrollArea className="w-[90vw] md:w-full">
        <div className="w-max">
          <DataTable columns={columns} data={data} />
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default TransactionsHistory;
