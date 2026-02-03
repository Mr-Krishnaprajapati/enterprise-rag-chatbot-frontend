import { useState, useRef, useEffect } from "react";
import { useChat } from "./hooks/useChat";
import { MessageBubble } from "./components/chat/MessageBubble";
import { ChatInput } from "./components/chat/ChatInput";
import { DocumentViewer } from "./components/documents/DocumentViewer";
import type { Citation } from "./types";
import "./App.css";

function App() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    sessions,
    loadSession,
    activeSessionId,
  } = useChat();
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCitationClick = (citation: Citation) => {
    setActiveCitation(citation);
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden font-sans selection:bg-indigo-500/30">
      <div className="w-20 lg:w-64 border-r border-white/5 bg-gray-900 flex flex-col justify-between hidden md:flex shrink-0 transition-all duration-300">
        <div className="p-4 lg:p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 shrink-0">
              V
            </div>
            <h1 className="font-bold text-lg tracking-tight hidden lg:block overflow-hidden whitespace-nowrap">
              VectorIQ
            </h1>
          </div>

          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            <button
              onClick={clearChat}
              className="flex items-center gap-3 p-3 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 rounded-xl cursor-pointer text-indigo-300 hover:text-white transition-all group w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
              <span className="text-sm font-semibold hidden lg:block">
                New Chat
              </span>
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2">
              <div className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:block">
                History
              </div>
              {sessions.length === 0 ? (
                <p className="text-xs text-gray-600 px-2 italic hidden lg:block">
                  No previous chats
                </p>
              ) : (
                <div className="space-y-1">
                  {sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => loadSession(session.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-lg w-full text-left transition-colors text-sm ${
                        activeSessionId === session.id
                          ? "bg-white/10 text-white"
                          : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span className="truncate hidden lg:block">
                        {session.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 lg:p-6 border-t border-white/5">
            <div className="flex items-center gap-3 text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
              </svg>
              <span className="text-sm font-medium hidden lg:block">
                Settings
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col flex-1 transition-all duration-300 relative`}
      >
        <header className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-end md:justify-between items-center pointer-events-none">
          <div className="md:hidden pointer-events-auto">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
              V
            </div>
          </div>
          <div className="pointer-events-auto">
            <button
              onClick={clearChat}
              className="text-xs font-semibold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/5 transition-all md:hidden"
            >
              New Chat
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth pt-20">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg md:max-w-3xl mx-auto p-6 animate-fade-in pb-32">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl flex items-center justify-center mb-6 md:mb-8 shadow-2xl shadow-black/50 border border-white/5 shrink-0">
                <span className="text-3xl md:text-4xl">✨</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                Enterprise Knowledge Base
              </h2>
              <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-md mx-auto">
                Connects to internal documentation. Ask about PTO, Security
                Policies, or Remote Work guidelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {[
                  "What is the PTO policy?",
                  "Remote work guidelines?",
                  "Travel expense policy?",
                  "IT Password requirements",
                  "Health benefits overview",
                  "Performance review process?",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="p-3 text-sm text-gray-400 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl hover:border-indigo-500/30 text-left transition-all hover:text-indigo-300 shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full pb-32">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onCitationClick={handleCitationClick}
                />
              ))}

              {isLoading && (
                <div className="flex justify-start mb-6 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white mr-3 opacity-50">
                    AI
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex gap-1 items-center">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s]"></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s]"></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]"></span>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center p-3 mb-4 bg-red-900/20 text-red-200 rounded-xl border border-red-500/20 text-sm animate-shake">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent z-20">
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </div>

      {activeCitation && (
        <div className="w-full md:w-[450px] border-l border-white/10 shadow-2xl z-30 transition-all duration-300 transform translate-x-0 bg-gray-900 absolute right-0 inset-y-0 md:relative">
          <DocumentViewer
            citation={activeCitation}
            onClose={() => setActiveCitation(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
