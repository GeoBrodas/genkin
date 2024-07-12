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

interface Props {
  data: {
    id: string;
    transactionDescription: string;
    transactionCategory: string;
    date: string;
    amount: number;
  };
}

function ListofTransactions({ data }: Props) {
  return (
    <BotWrapper>
      <ScrollArea className="h-[300px]">
        <Table className="">
          <TableCaption className="sticky bottom-0 bg-white pt-3">
            Fetched you 10 transactions, a total of $4350
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
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, i) => (
              <TableRow key={i} className="w-full">
                <TableCell className="font-medium">23-10-2001</TableCell>
                <TableCell>Paid credit card bills</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </BotWrapper>
  );
}

export default ListofTransactions;
