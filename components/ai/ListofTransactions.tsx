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
      <Table className="">
        <TableCaption>
          Fetched you 10 transactions, a total of $4350
        </TableCaption>
        <TableHeader className="">
          <TableRow>
            <TableHead className="">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        {[0, 1, 2, 3].map((_, i) => (
          <TableBody key={i}>
            <TableRow>
              <TableCell className="font-medium">23-10-2001</TableCell>
              <TableCell>Paid credit card bills</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </BotWrapper>
  );
}

export default ListofTransactions;
