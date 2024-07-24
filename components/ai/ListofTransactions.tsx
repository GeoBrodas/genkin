import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import BotWrapper from './BotWrapper';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import { format } from 'date-fns';

interface Props {
  data?: {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: string;
  }[];

  isLoading?: boolean;
}

async function ListofTransactions({ data, isLoading }: Props) {
  let totalAmount = 0;

  data?.map((item) => {
    if (item.amount < 0) {
      totalAmount += item.amount;
    } else return;
  });

  return (
    <BotWrapper>
      {!isLoading ? (
        data.length > 0 ? (
          <ScrollArea className={`${data.length < 5 ? 'h-auto' : 'h-[300px]'}`}>
            <Table className="">
              <TableCaption className="sticky bottom-0 bg-white pt-3">
                Fetched you {data?.length} transactions, a total spending of $
                {Math.floor(Math.abs(totalAmount))}
              </TableCaption>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow>
                  <TableHead className="">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="">
                {data.map((item, i) => (
                  <TableRow key={i} className="w-full">
                    <TableCell className="font-medium">
                      {format(item.date, 'LLL dd, y')}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <p>
            Looks like theres no data for this period. Add some or use a
            different range
          </p>
        )
      ) : (
        <LoadingSkeleton />
      )}
    </BotWrapper>
  );
}

function LoadingSkeleton() {
  return (
    <Table className="">
      <TableHeader className="sticky top-0 bg-white">
        <TableRow>
          <TableHead className="">
            <Skeleton className="h-4 w-auto rounded-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-auto rounded-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-auto rounded-full" />
          </TableHead>
          <TableHead className="text-right">
            <Skeleton className="h-4 w-auto rounded-full" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="">
        {[0, 1, 2, 3].map((_, i) => (
          <TableRow key={i} className="w-full">
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-auto rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-auto rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-auto rounded-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-auto rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ListofTransactions;
