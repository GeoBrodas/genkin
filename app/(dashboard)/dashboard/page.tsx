'use client';

import { useUIState } from 'ai/rsc';
import { AI } from '../actions';
import { useState } from 'react';

export default function DashboardPage() {
  const [input, setInput] = useState<string>('');
  const [idle, setIsNotIdle] = useState<boolean>(true);
  const [conversation, setConversation] = useUIState<typeof AI>();

  // chat submit action
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (idle) {
      setIsNotIdle(false);
    }
  };

  return idle ? (
    <IdleDisplayChat
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

function IdleDisplayChat({ handleSubmit, input, setInput }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch">
        <div className="w-full">hi</div>

        <ChatInput
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
        />
      </div>
    </main>
  );
}

function ActiveChat({ conversation, handleSubmit, input, setInput }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch">
        <div className="space-y-4">
          {conversation.map((m: any) => (
            <div key={m.id} className="whitespace-pre-wrap">
              <span className="font-bold">
                {m.role === 'user' ? 'User: ' : 'AI: '}
              </span>
              <span>{m.content}</span>
            </div>
          ))}
        </div>

        <ChatInput
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
        />
      </div>
    </main>
  );
}

function ChatInput({ handleSubmit, input, setInput }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="fixed text-black bottom-0 w-full max-w-xl p-4 mb-8 border border-red-300 rounded-full focus:outline-none"
        value={input}
        placeholder="Type your prompt"
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}
