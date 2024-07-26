'use client';

import {
  ArrowDownToLine,
  Calendar as CalendarIcon,
  Check,
  LoaderCircle,
  Plus,
} from 'lucide-react';
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
import { TransactionFormProvider } from '@/hooks/transaction';
import { useFieldArray, useForm } from 'react-hook-form';
import { nanoid } from '@/lib/helpers';
import {
  categorySchema,
  formCreateTransaction,
  transactionsSchema,
} from '@/schemas/form';
import { FormControl, FormField, FormItem } from '../ui/form';
import { z } from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';

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
    handleSubmit,
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

  const { toast } = useToast();

  const [submitting, setIsSubmitting] = useState(false);
  const [done, setIsDone] = useState(false);

  const { append, remove, fields } = useFieldArray({
    name: 'transactions',
    control,
  });

  async function onSubmit(values: z.infer<typeof transactionsSchema>) {
    if (done) return;

    setIsSubmitting(true);

    const parseData = values.transactions.map((trans) => ({
      id: trans.id,
      category: trans.category,
      date: new Date(trans.date).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      amount: trans.amount,
      description: trans.description,
    }));

    console.log(parseData);

    try {
      const response = await fetch('/api/save-transaction', {
        body: JSON.stringify(parseData),
        method: 'POST',
      });

      console.log(response);
      setIsSubmitting(false);
      setIsDone(true);

      const data = await response.json();

      console.log('d', data);

      if (data.message === 'Bad Request') {
        toast({
          title: 'Something went wrong!',
          variant: 'destructive',
          description:
            'Try again later. If this problem persists, report an issue on GitHub',
        });
      } else {
        toast({
          title: 'Saved transaction',
          description:
            'Ask Genkin to list your latest transactions or visit transactions analysis page',
        });
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setIsDone(true);

      toast({
        title: 'Something went wrong!',
        variant: 'destructive',
        description:
          'Try again later. If this problem persists, report an issue on GitHub',
      });
    }
  }

  console.log(watch());

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="pt-6 space-y-4">
          {fields.map((transaction, index) => (
            <div
              key={transaction.id}
              className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center md:space-x-2"
            >
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <FormField
                  control={control}
                  name={`transactions.${index}.date`}
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              size={'icon'}
                              className="p-2"
                              variant={'outline'}
                            >
                              <CalendarIcon />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <Input
                  className="w-full md:w-[15rem]"
                  placeholder="Bought three equities"
                  disabled={done}
                  {...register(`transactions.${index}.description`)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <FormField
                  defaultValue={transaction.category}
                  control={control}
                  name={`transactions.${index}.category`}
                  render={({ field }) => (
                    <Select
                      disabled={done}
                      key={field.value}
                      value={field.value}
                      defaultValue={transaction.category
                        .split(' ')
                        .map((word: string) => word.toLowerCase())
                        .join('-')}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-[300px]">
                        <SelectValue
                          defaultValue={transaction.category
                            .split(' ')
                            .map((word: string) => word.toLowerCase())
                            .join('-')}
                          placeholder="Category"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categorySchema.options.map(
                          (category: string, index: number) => (
                            <SelectItem key={index} value={category}>
                              {category}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />

                <Input
                  disabled={done}
                  placeholder="$1000"
                  {...register(`transactions.${index}.amount`)}
                />
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex justify-end items-center space-x-2">
          <Button
            disabled={done}
            type="submit"
            variant={state === 'saved' ? 'secondary' : 'default'}
          >
            {done && <Check className="mr-2" />}
            {!done && !submitting && <ArrowDownToLine className="mr-2" />}
            {!done && !submitting ? (
              'Save entry'
            ) : submitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              done && 'Saved!'
            )}
          </Button>
        </CardFooter>
      </form>
      <Button
        className="absolute left-7 bottom-7 z-10"
        variant={'outline'}
        onClick={() =>
          append({
            amount: 0,
            id: nanoid(),
            description: '',
            category: 'Other',
            date: new Date().toISOString(),
          })
        }
        disabled={done}
      >
        <Plus className="mr-2" />
        Add another
      </Button>
    </Card>
  );
}
