import { Sparkles } from 'lucide-react';

function BotMessage({ content }: { content: string }) {
  return (
    <div className="relative flex">
      <Sparkles className="absolute -left-10 top-4 h-5 w-5" />
      <div className="rounded-lg p-4 relative">{content}</div>
    </div>
  );
}

export default BotMessage;
