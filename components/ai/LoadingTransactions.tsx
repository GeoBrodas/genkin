import BotWrapper from './BotWrapper';

function LoadingTransactions() {
  return (
    <BotWrapper>
      <div className="h-[300px] bg-rose-50 p-4 rounded-lg animate-pulse flex flex-col space-y-4 justify-evenly">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <div key={i} className="flex items-center justify-evenly space-x-4">
            <div className="bg-white rounded-lg h-4 w-16 animate-pulse" />
            <div className="bg-white rounded-lg h-4 flex-1 animate-pulse" />
            <div className="bg-white rounded-lg h-4 flex-1 animate-pulse" />
            <div className="bg-white rounded-lg h-4 flex-1 animate-pulse" />
          </div>
        ))}
      </div>
    </BotWrapper>
  );
}

export default LoadingTransactions;
