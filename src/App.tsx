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
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden font-sans selection:bg-cyan-500/30">
      <div className="w-20 lg:w-64 border-r border-white/5 bg-gradient-to-b from-gray-900/50 to-gray-950/50 backdrop-blur-xl flex flex-col justify-between hidden md:flex shrink-0 transition-all duration-500 ease-in-out">
        <div className="p-4 lg:p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30 shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/50 hover:shadow-xl">
              V
            </div>
            <h1 className="font-bold text-lg tracking-tight hidden lg:block overflow-hidden whitespace-nowrap bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              VectorIQ
            </h1>
          </div>

          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            <button
              onClick={clearChat}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 hover:from-cyan-600/20 hover:to-blue-600/20 border border-cyan-500/20 rounded-xl cursor-pointer text-cyan-300 hover:text-white transition-all duration-300 group w-full hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 glass-effect"
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
                className="transition-transform duration-300 group-hover:rotate-12"
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
              <div className="mb-2 px-2 text-xs font-semibold text-cyan-500/60 uppercase tracking-wider hidden lg:block">
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
                      className={`flex items-center gap-3 p-2.5 rounded-lg w-full text-left transition-all duration-300 text-sm hover:scale-[1.02] ${
                        activeSessionId === session.id
                          ? "bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                          : "text-gray-400 hover:bg-white/5 hover:text-cyan-300 hover:border hover:border-cyan-500/10"
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
            <div className="flex items-center gap-3 text-gray-500 hover:text-cyan-300 cursor-pointer transition-all duration-300 hover:scale-105 group">
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
                className="transition-transform duration-500 group-hover:rotate-90"
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30 animate-glow">
              V
            </div>
          </div>
          <div className="pointer-events-auto">
            <button
              onClick={clearChat}
              className="text-xs font-semibold text-cyan-300 hover:text-white bg-gradient-to-r from-cyan-600/10 to-blue-600/10 hover:from-cyan-600/20 hover:to-blue-600/20 px-3 py-1.5 rounded-full border border-cyan-500/20 transition-all duration-300 md:hidden hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              New Chat
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth pt-20">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg md:max-w-3xl mx-auto p-6 animate-fade-in pb-32">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl flex items-center justify-center mb-6 md:mb-8 shadow-2xl shadow-cyan-500/30 border border-cyan-500/20 shrink-0 backdrop-blur-xl animate-glow hover:scale-110 transition-transform duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 md:w-10 md:h-10 text-cyan-400"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle cx="6" cy="6" r="2" fill="currentColor" />
                  <circle cx="18" cy="6" r="2" fill="currentColor" />
                  <circle cx="6" cy="18" r="2" fill="currentColor" />
                  <circle cx="18" cy="18" r="2" fill="currentColor" />
                  <line x1="8" y1="7" x2="10" y2="10" opacity="0.6" />
                  <line x1="16" y1="7" x2="14" y2="10" opacity="0.6" />
                  <line x1="8" y1="17" x2="10" y2="14" opacity="0.6" />
                  <line x1="16" y1="17" x2="14" y2="14" opacity="0.6" />
                  <path d="M12 9 L12 15" opacity="0.4" strokeWidth="2" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 tracking-tight">
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
                    className="p-3 text-sm text-gray-400 bg-gradient-to-br from-white/5 to-white/10 hover:from-cyan-600/10 hover:to-blue-600/10 border border-white/5 rounded-xl hover:border-cyan-500/30 text-left transition-all duration-300 hover:text-cyan-300 shadow-sm hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.02] hover:-translate-y-0.5 glass-effect group"
                  >
                    <span className="group-hover:text-cyan-200 transition-colors duration-300">
                      {q}
                    </span>
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
                <div className="flex justify-start mb-6 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white mr-3 shadow-lg shadow-cyan-500/30 animate-glow">
                    AI
                  </div>
                  <div className="bg-gradient-to-r from-white/5 to-white/10 border border-cyan-500/20 rounded-2xl p-4 flex gap-1 items-center glass-effect">
                    <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s] shadow-sm shadow-cyan-400"></span>
                    <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s] shadow-sm shadow-cyan-400"></span>
                    <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] shadow-sm shadow-cyan-400"></span>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center p-3 mb-4 bg-gradient-to-r from-red-900/20 to-red-800/20 text-red-200 rounded-xl border border-red-500/30 text-sm animate-fade-in shadow-lg shadow-red-500/10">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent z-20">
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </div>

      {activeCitation && (
        <div className="w-full md:w-[450px] border-l border-cyan-500/10 shadow-2xl shadow-cyan-500/5 z-30 transition-all duration-500 transform translate-x-0 bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-xl absolute right-0 inset-y-0 md:relative">
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
