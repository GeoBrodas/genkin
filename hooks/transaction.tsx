import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formCreateTransaction, transactionsSchema } from '@/schemas/form';
import { ReactNode } from 'react';

// export const useFormCreateTransaction = () =>
//   useForm<formCreateTransaction>({
//     resolver: zodResolver(transactionsSchema),
//   });

export const TransactionFormProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useForm<formCreateTransaction>({
    resolver: zodResolver(transactionsSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// export const useFormContextCreateTransaction = () =>
//   useFormContext<formCreateTransaction>();
