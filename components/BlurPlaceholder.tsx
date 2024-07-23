import { Ban } from 'lucide-react';

function BlurPlaceholder() {
  return (
    <div className="absolute flex items-center rounded-sm justify-center z-10 backdrop-blur-sm top-0 w-full h-full">
      <span className="text-gray-400 flex items-center space-x-2">
        <Ban /> <span>No data available</span>
      </span>
    </div>
  );
}

export default BlurPlaceholder;
