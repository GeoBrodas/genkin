'use client';

import { categorySchema } from '@/schemas/form';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

export type Transaction = {
  id: string;
  amount: number;
  status: z.infer<typeof categorySchema>;
  email: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-In', {
        style: 'currency',
        currency: 'INR',
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
];
