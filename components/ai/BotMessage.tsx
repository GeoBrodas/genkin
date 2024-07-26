import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { Sparkles } from 'lucide-react';
import { MemoizedReactMarkdown } from './markdown';

function BotMessage({ content }: { content: string }) {
  return (
    <div className="md:relative flex">
      <Sparkles className="lg:absolute lg:-left-10 lg:top-4 h-5 w-5" />
      <div className="rounded-lg p-4 relative">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            li({ children }) {
              return <li className="list-disc">{children}</li>;
            },
            ul({ children }) {
              return <ul className="my-2 pl-6">{children}</ul>;
            },
          }}
        >
          {content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

export default BotMessage;
