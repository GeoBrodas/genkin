import { User } from 'lucide-react';

function UserMessage({ content }: { content: string }) {
  return (
    <div className="relative flex">
      <User className="mt-4 mr-4 lg:mt-0 lg:mr-4 lg:absolute lg:-left-10 lg:top-4 h-5 w-5" />
      <div className="bg-rose-50 rounded-lg p-4 relative">{content}</div>
    </div>
  );
}

export default UserMessage;
