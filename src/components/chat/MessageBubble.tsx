import type { Message, Citation } from "../../types";

interface MessageBubbleProps {
  message: Message;
  onCitationClick: (citation: Citation) => void;
}

export const MessageBubble = ({
  message,
  onCitationClick,
}: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-6 group animate-fade-in-up`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white mr-3 shadow-lg shadow-indigo-500/20 shrink-0">
          AI
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl p-5 shadow-sm backdrop-blur-sm transition-all duration-300 ${
          isUser
            ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-indigo-900/20 rounded-tr-sm"
            : "bg-white/5 border border-white/10 text-gray-100 shadow-black/20 rounded-tl-sm"
        }`}
      >
        <div
          className={`prose prose-invert max-w-none text-sm leading-relaxed ${isUser ? "text-indigo-50" : "text-gray-300"}`}
        >
          {message.content}
        </div>

        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/10">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
              References
            </p>
            <div className="flex flex-wrap gap-2">
              {message.citations.map((citation) => (
                <button
                  key={citation.id}
                  onClick={() => onCitationClick(citation)}
                  className="group/cit px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <span className="w-5 h-5 rounded-md bg-indigo-500/20 flex items-center justify-center text-[10px] text-indigo-300 font-bold group-hover/cit:bg-indigo-500 group-hover/cit:text-white transition-colors">
                    {citation.page}
                  </span>
                  <span className="truncate max-w-[180px] font-medium">
                    {citation.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-xs font-bold text-gray-300 ml-3 shrink-0">
          You
        </div>
      )}
    </div>
  );
};
