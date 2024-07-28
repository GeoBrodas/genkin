'use client';

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
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import { format } from 'date-fns';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

interface Props {
  data?: {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: string;
  }[];

  from?: any;
  to?: any;

  isLoading?: boolean;
}

function ListofTransactions({ from, to }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const supabase = createClient();
      const user = await supabase.auth.getUser();

      const res = await supabase
        .from('main')
        .select('id, description, amount, date, category')
        .eq('user_id', user.data.user?.id)
        .gte(
          'date',
          from.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        )
        .lte(
          'date',
          to.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        )
        .order('date', { ascending: true });

      setData(res.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  console.log('fetched on rsc', data);

  let totalAmount = 0;

  data &&
    data.map((item) => {
      if (item.amount < 0) {
        totalAmount += item.amount;
      } else return;
    });

  return (
    <BotWrapper>
      {!isLoading ? (
        data.length > 0 ? (
          <ScrollArea
            className={`${
              data.length < 5 ? 'h-auto' : 'h-[300px]'
            } w-[300px] md:w-auto`}
          >
            <Table className="w-full">
              <TableCaption className="sticky bottom-0 bg-white pt-3">
                Fetched you {data.length} transactions, a total spending of $
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

            <ScrollBar className="md:hidden" orientation="horizontal" />
          </ScrollArea>
        ) : (
          <p className="p-4">
            Looks like theres no data available in this period. Add some or use
            a different range of dates
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
