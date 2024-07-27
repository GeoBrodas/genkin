import Spinner from '@/components/ai/Spinner';
import { nanoid, runAsyncFnWithoutBlocking } from '@/lib/helpers';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
} from 'ai/rsc';
import { streamText } from 'ai';
import { SYSTEMPROMPT } from '@/lib/prompt';
import { z } from 'zod';
import BotMessage from '@/components/ai/BotMessage';
import InputTransaction from '@/components/ai/InputTransaction';
import ListofTransactions from '@/components/ai/ListofTransactions';
import UserMessage from '@/components/ai/UserMessage';
import { categorySchema, formCreateTransaction } from '@/schemas/form';
import { createClient } from '@/utils/supabase/server';

// google api key
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_API_KEY,
});

// main action for chat prompt submisiion
export async function submitUserMessage(input: string) {
  'use server';

  // get ai state
  const aiState = getMutableAIState();

  // update aiState with user input
  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: `${aiState.get().interactions.join('\n\n')}\n\n${input}`,
      },
    ],
  });

  console.log(aiState.get());

  // create history object -> for streamText method
  const history = aiState.get().messages.map((message: any) => ({
    role: message.role,
    content: message.content,
  }));

  // creates stream for live reponse from AI model !!make sure to close them with done() method!!
  const textStream = createStreamableValue('');
  const spinnerStream = createStreamableUI(<Spinner />);
  const messageStream = createStreamableUI(null);
  const uiStream = createStreamableUI();

  runAsyncFnWithoutBlocking(async () => {
    try {
      // run model
      const result = await streamText({
        model: google('models/gemini-1.5-flash-latest'),
        temperature: 0,
        system: SYSTEMPROMPT,
        messages: [...history, { role: 'user', content: input }],
        tools: {
          listTransactions: {
            description:
              'List previous transactions of inlfows and outflows done by the user.',
            parameters: z.object({
              fromDate: z
                .string()
                .describe(
                  'The starting date from which the user needs the transactions. If user wants of specific month, take the starting date of that month.'
                ),
              endDate: z
                .string()
                .describe(
                  'The end date till which the user needs the transactions. If user wants of specific month, take the last date of that month.'
                ),
            }),
          },
          createTransactions: {
            description: 'Create a new transaction done by the user.',
            parameters: z.object({
              entries: z.array(
                z.object({
                  date: z
                    .string()
                    .describe(
                      'Date on which the transaction was made. If today, take current date'
                    ),
                  transactionDescription: z
                    .string()
                    .describe(
                      'A short description of the the transaction. Convert user input to present tense.'
                    ),
                  category: categorySchema,
                  amount: z
                    .number()
                    .describe(
                      'Amount invlolved in the transaction. Assign positive/negative sign depending on type of transactions. If user used words like `paid` or `costed`, assign negative sign.'
                    ),
                })
              ),
            }),
          },
        },
      });

      let textContent = '';
      spinnerStream.done(null);

      for await (const delta of result.fullStream) {
        // get type of tool-call
        const { type } = delta;

        if (type === 'text-delta') {
          const { textDelta } = delta;

          textContent += textDelta;

          messageStream.update(<BotMessage content={textContent} />);

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: textContent,
              },
            ],
          });
        } else if (type === 'tool-call') {
          const { toolName, args } = delta;

          if (toolName === 'createTransactions') {
            const { entries } = args;

            console.log('entries', entries);

            uiStream.update(
              <InputTransaction transactions={entries} state="idle" />
            );

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: 'UI for inputing transactions from the user',
                  display: {
                    name: 'createTransactions',
                    props: {
                      entries,
                    },
                  },
                },
              ],
            });
          } else if (toolName === 'listTransactions') {
            const { endDate, fromDate } = args;

            console.log('from date', fromDate);
            console.log('end date', endDate);

            const from = new Date(fromDate);
            const to = new Date(endDate);

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

            uiStream.update(<ListofTransactions data={res.data} />);

            console.log('Fetched transactions', res.data);

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: `Heres the list of transactions from ${fromDate} to ${endDate}`,
                  display: {
                    name: 'listTransactions',
                    props: {
                      // you may have to change this afterwards !not for author!
                      endDate,
                      fromDate,
                    },
                  },
                },
              ],
            });
          }
        }
      }

      textStream.done();
      uiStream.done();
      messageStream.done();
    } catch (e) {
      console.log(e);

      const error = new Error(
        'The AI model got rate limited, please try again later'
      );

      uiStream.error(error);
      textStream.error(error);
      messageStream.error(error);
    }
  });

  return {
    id: nanoid(),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value,
  };
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool';
  content: string;
  id?: string;
  name?: string;
  display?: {
    name: string;
    props: Record<string, any>;
  };
};

export type AIState = {
  chatId: string;
  interactions?: string[];
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
  spinner?: React.ReactNode;
  attachments?: React.ReactNode;
}[];

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

export const AI = createAI<any[], React.ReactNode[]>({
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] },
  actions: {
    submitUserMessage,
  },
  unstable_onGetUIState: async () => {
    'use server';

    const aiState = getAIState();

    console.log(aiState);

    if (aiState) {
      const uiState = getUIStateFromAIState(aiState);
      return uiState;
    } else return;
  },
});

// !change the props!
export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'assistant' ? (
          message.display?.name === 'listTransactions' ? (
            <ListofTransactions />
          ) : message.display?.name === 'createTransactions' ? (
            <InputTransaction />
          ) : (
            <BotMessage content={message.content} />
          )
        ) : message.role === 'user' ? (
          <UserMessage content={message.content} />
        ) : (
          <BotMessage content={message.content} />
        ),
    }));
};
