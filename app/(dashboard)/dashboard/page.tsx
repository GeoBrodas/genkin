'use client';

export const dynamic = 'force-dynamic';

import { unstable_noStore as noStore } from 'next/cache';

import { AI } from '../actions';
import { nanoid } from '@/lib/helpers';
import { SendHorizontal } from 'lucide-react';
import { useActions, useUIState } from 'ai/rsc';
import { useEffect, useRef, useState } from 'react';
import UserMessage from '@/components/ai/UserMessage';

export default function DashboardPage() {
  noStore();

  const [input, setInput] = useState<string>('');
  const [idle, setIsNotIdle] = useState<boolean>(true);
  const { submitUserMessage } = useActions();
  const [conversation, setConversation] = useUIState<typeof AI>();

  console.log(conversation);

  // chat submit action
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsNotIdle(false);
    e.preventDefault();
    setInput('');

    // @ts-ignore
    setConversation((currentConversation) => [
      ...currentConversation,
      {
        id: nanoid(),
        display: <UserMessage content={input} />,
      },
    ]);
    const message = await submitUserMessage(input);
    setConversation((currentConversation) => [...currentConversation, message]);
  };

  const exampleHandlerPrompt = async (input: string) => {
    setIsNotIdle(false);

    //@ts-ignore
    setConversation((currentConversation) => [
      ...currentConversation,
      {
        id: nanoid(),
        display: <UserMessage content={input} />,
      },
    ]);

    try {
      const response = await submitUserMessage(input);

      setConversation((currentConversation) => [
        ...currentConversation,
        response,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return idle ? (
    <IdleDisplayChat
      exampleHandlerPrompt={exampleHandlerPrompt}
      handleSubmit={handleSubmit}
      input={input}
      setInput={setInput}
    />
  ) : (
    <ActiveChat
      handleSubmit={handleSubmit}
      conversation={conversation}
      input={input}
      setInput={setInput}
    />
  );
}

function IdleDisplayChat({
  handleSubmit,
  input,
  setInput,
  exampleHandlerPrompt,
}) {
  return (
    <main className="flex flex-col justify-between items-center pt-20 mb-5">
      <div className="flex flex-col h-[90vh] lg:h-[40rem] justify-between w-[95%] md:max-w-2xl pt-10 mx-auto stretch">
        <div className="w-full">
          <h3 className="text-4xl font-semibold">Genkin AI Chat system</h3>

          <p className="mt-2">
            Genkin leverages the power of Google Gemini and Vercel AI SDK to
            give intelligent repsonses to your questions. Go ahead and try
            <span className="italic">
              &quot;Made and investment of $400 today&quot;
            </span>
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="grid gap-4 grid-cols-2">
            <div
              onClick={() =>
                exampleHandlerPrompt(
                  `List all transaction from the last 10 days`
                )
              }
              className="bg-rose-50 hover:bg-rose-100 transition duration-100 ease-in-out rounded-lg p-4 hover:cursor-pointer"
            >
              <h5 className="font-semibold">List all trasactions</h5>
              <p>from the past 10 days</p>
            </div>
            <div
              onClick={() =>
                exampleHandlerPrompt(`Bought some groceries & supplies for $20`)
              }
              className="bg-rose-50 hover:bg-rose-100 transition duration-100 ease-in-out rounded-lg p-4 hover:cursor-pointer"
            >
              <h5 className="font-semibold">
                Bought some groceries & supplies
              </h5>
              <p>today for $20</p>
            </div>
          </div>

          <ChatInput
            isFixed={false}
            handleSubmit={handleSubmit}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </main>
  );
}

function ActiveChat({ conversation, handleSubmit, input, setInput }) {
  // const { messagesRef, scrollRef, visibilityRef } = useScrollAnchor();

  const visibilityRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (visibilityRef) {
      visibilityRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [conversation]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16 overflow-auto">
      <div className="flex flex-col w-[98%] md:max-w-2xl pt-10 mx-auto stretch">
        <div className="space-y-6">
          {conversation.map((message: any, i: number) => (
            <div key={i}>
              {message.spinner}
              {message.display}
              {message.attachments}
            </div>
          ))}

          <div className="h-px w-full pt-[6rem]" ref={visibilityRef} />
        </div>

        <ChatInput
          isFixed={true}
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
        />
      </div>
    </main>
  );
}

function ChatInput({ handleSubmit, input, setInput, isFixed }) {
  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        isFixed && 'fixed bottom-11'
      } flex bg-rose-50 justify-between rounded-full w-full max-w-2xl items-center`}
    >
      <input
        className={`text-black bg-rose-50 w-full rounded-l-full max-w-2xl p-4 focus:outline-none`}
        value={input}
        placeholder="Type your prompt"
        onChange={(e) => setInput(e.target.value)}
      />
      <SendHorizontal className="relative text-red-600 z-10 right-4" />
    </form>
  );
}
