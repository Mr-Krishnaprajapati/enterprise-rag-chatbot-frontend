import { useState, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div
        className={`relative flex items-center gap-2 p-2 rounded-2xl bg-gray-900/80 backdrop-blur-xl border transition-all duration-300 ${isFocused
          ? "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/20"
          : "border-white/10 shadow-lg shadow-black/20"
          }`}
      >
        <button
          className="p-2 text-gray-500 hover:text-indigo-400 transition-colors rounded-full hover:bg-white/5 cursor-not-allowed"
          title="Attach file (Coming soon)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask anything about company policies..."
          disabled={isLoading}
          className="flex-1 bg-transparent px-2 py-3 text-white placeholder-gray-500 focus:outline-none min-w-0"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${!input.trim() || isLoading
            ? "bg-gray-800 text-gray-600 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 cursor-pointer"
            }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2 11 13" />
              <path d="m22 2-7 20-4-9-9-4 20-7z" />
            </svg>
          )}
        </button>
      </div>
      <p className="text-center text-xs text-gray-600 mt-3 font-medium">
        AI can make mistakes. Please review citations.
      </p>
    </div>
  );
};
