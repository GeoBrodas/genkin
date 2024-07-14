import { Loader } from 'lucide-react';
import BotWrapper from './BotWrapper';

function Spinner() {
  return (
    <BotWrapper>
      <div className="ml-2 mt-[15px]">
        <Loader className="animate-spin text-gray-400" />
      </div>
    </BotWrapper>
  );
}

export default Spinner;
