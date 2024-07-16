'use client';

import { useActions, useUIState } from 'ai/rsc';
import { AI } from '../actions';
import { useEffect, useRef, useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import UserMessage from '@/components/ai/UserMessage';
import { nanoid } from '@/lib/helpers';
import { useScrollAnchor } from '@/hooks/use-scroll';

export default function DashboardPage() {
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
    <main className="flex flex-col items-center pt-16">
      <div className="flex flex-col h-[34rem] justify-between w-full max-w-2xl pt-10 mx-auto stretch">
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
              <p>from the past 20 days</p>
            </div>
            <div className="bg-rose-50 hover:bg-rose-100 transition duration-100 ease-in-out rounded-lg p-4 hover:cursor-pointer">
              <h5 className="font-semibold">How much did I spend</h5>
              <p>on fuel this month?</p>
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
      <div className="flex flex-col w-full max-w-2xl pt-10 mx-auto stretch">
        <div className="space-y-6">
          {conversation.map((message: any, i: number) => (
            <div key={i}>
              {message.spinner}
              {message.display}
              {message.attachments}
            </div>
          ))}

          <div className="h-px w-full pt-[5rem]" ref={visibilityRef} />
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
