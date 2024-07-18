import { z } from 'zod';

// schemas
export const categorySchema = z.enum([
  'Investment',
  'Food',
  'Cloth',
  'Groceries & Supplies',
  'Charity',
  'Salary',
  'Subscription',
  'Props',
  'Other',
]);

export const transactionsSchema = z.object({
  transactions: z.array(
    z.object({
      id: z.string(),
      date: z.string(),
      description: z.string(),
      category: categorySchema,
      amount: z.number(),
    })
  ),
});

export type formCreateTransaction = z.infer<typeof transactionsSchema>;
