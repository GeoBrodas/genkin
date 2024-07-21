import { z } from 'zod';

// schemas
export const categorySchema = z.enum([
  'Investment',
  'Food',
  'Cloth & Props',
  'Groceries & Supplies',
  'Charity',
  'Salary',
  'Subscription',
  'Fuel',
  'Other',
]);

export const TransactionSchema = z.object({
  id: z.string(),
  date: z.string(),
  description: z.string(),
  category: categorySchema,
  amount: z.number(),
});

export const transactionsSchema = z.object({
  transactions: z.array(TransactionSchema),
});

export type formCreateTransaction = z.infer<typeof transactionsSchema>;
