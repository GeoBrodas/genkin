import { Sparkles } from 'lucide-react';
import { PropsWithChildren } from 'react';

function BotWrapper({ children }: PropsWithChildren) {
  return (
    <div className="relative flex w-full">
      <Sparkles className="absolute -left-10 top-4 h-5 w-5" />
      <div className="p-4 relative w-full">{children}</div>
    </div>
  );
}

export default BotWrapper;
