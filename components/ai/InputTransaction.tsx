'use client';

import BotWrapper from './BotWrapper';
import CreateTransactionForm from './CreateTransactionForm';

interface Props {
  state: 'idle' | 'loading' | 'saved';
  transactions: any;
}

function InputTransaction({ state, transactions }: Props) {
  return (
    <BotWrapper>
      <CreateTransactionForm data={transactions} state={state} />
    </BotWrapper>
  );
}

export default InputTransaction;
