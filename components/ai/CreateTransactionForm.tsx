'use client';

import { ArrowDownToLine, Check, LoaderCircle, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  TransactionFormProvider,
  //   useFormContextCreateTransaction,
} from '@/hooks/transaction';
import { useFieldArray, useForm } from 'react-hook-form';
import { nanoid } from '@/lib/helpers';
import { categorySchema, formCreateTransaction } from '@/schemas/form';
import { FormField } from '../ui/form';

export default function CreateTransactionForm({
  state,
  data,
}: {
  state: 'idle' | 'loading' | 'saved';
  data: any;
}) {
  return (
    <TransactionFormProvider>
      <CreateTransaction state={state} data={data} />
    </TransactionFormProvider>
  );
}

function CreateTransaction({
  state,
  data,
}: {
  state: 'idle' | 'loading' | 'saved';
  data: any;
}) {
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useForm<formCreateTransaction>({
    defaultValues: {
      transactions: data.map((transaction) => ({
        id: nanoid(),
        description: transaction.transactionDescription,
        category: transaction.category,
        amount: transaction.amount,
        date: transaction.date,
      })),
    },
  });

  console.log(watch());

  const { append, remove, fields } = useFieldArray({
    name: 'transactions',
    control,
  });

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {fields.map((transaction, index) => (
          <div key={transaction.id} className="flex space-x-2">
            <Input
              placeholder="Bought three equities"
              {...register(`transactions.${index}.description`)}
            />
            <FormField
              control={control}
              name={`transactions.${index}.category`}
              render={({ field }) => (
                <Select
                  key={field.value}
                  value={field.value}
                  defaultValue={data[index].category
                    .split(' ')
                    .map((word: string) => word.toLowerCase())
                    .join('-')}
                  onValueChange={field.onChange}
                  //   defaultValue={data[index].category
                  //     .split(' ')
                  //     .map((word: string) => word.toLowerCase())
                  //     .join('-')}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue
                      defaultValue={data[index].category
                        .split(' ')
                        .map((word: string) => word.toLowerCase())
                        .join('-')}
                      placeholder="Category"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categorySchema.options.map(
                      (category: string, index: number) => (
                        <SelectItem
                          key={index}
                          value={category
                            .split(' ')
                            .map((word) => word.toLowerCase())
                            .join('-')}
                        >
                          {category}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />

            <Input
              placeholder="$1000"
              {...register(`transactions.${index}.amount`)}
            />
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex justify-between items-center space-x-2">
        <Button
          variant={'outline'}
          onClick={() =>
            append({
              amount: 0,
              id: nanoid(),
              description: '',
              category: 'Other',
              date: Date.now().toString(),
            })
          }
        >
          <Plus className="mr-2" />
          Add another
        </Button>
        <Button variant={state === 'saved' ? 'secondary' : 'default'}>
          {state === 'saved' && <Check className="mr-2" />}
          {state === 'idle' && <ArrowDownToLine className="mr-2" />}
          {state === 'idle' ? (
            'Save entry'
          ) : state === 'loading' ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            'Saved!'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
