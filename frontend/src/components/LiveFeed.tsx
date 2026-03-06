import { Commentary } from "@/types";

interface LiveFeedProps {
  messages: Commentary[];
  isActive: boolean;
  isLoading?: boolean;
}

const formatMinute = (minute?: number) => {
  if (minute === undefined || minute === null) {
    return null;
  }
  return `${minute}`;
};

const formatMetadata = (metadata?: Record<string, unknown>) => {
  if (!metadata || Object.keys(metadata).length === 0) {
    return null;
  }
  try {
    return JSON.stringify(metadata);
  } catch {
    return null;
  }
};

export const LiveFeed: React.FC<LiveFeedProps> = ({
  messages,
  isActive,
  isLoading,
}) => {
  if (!isActive) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 border-2 border-black rounded-2xl border-dashed">
        <div className="w-16 h-16 bg-[#FDE047] rounded-full border-2 border-black flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="font-bold text-xl mb-2">No Match Selected</h3>
        <p className="text-gray-500 mx-w-xs">
          Select a match from the list to view live commentary and real-tiem
          udpates.
        </p>
      </div>
    );
  }

  return <div>LiveFeed</div>;
};
