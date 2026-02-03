import { useState, useCallback } from "react";
import type { Message, ChatState, ChatSession } from "../types";
import { sendMessageToBot } from "../services/mockChatService";

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const addMessage = useCallback((message: Message) => {
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message
      const userMsg: Message = {
        id: `msg-${Date.now()}`,
        role: "user",
        content,
        timestamp: Date.now(),
        status: "sent",
      };
      addMessage(userMsg);

      // Set loading
      setChatState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await sendMessageToBot(content);
        addMessage(response);
      } catch (err: any) {
        setChatState((prev) => ({
          ...prev,
          error: "Failed to get response. Please try again.",
        }));
      } finally {
        setChatState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [addMessage],
  );

  const saveCurrentSession = useCallback(() => {
    if (chatState.messages.length === 0) return;

    const newSession: ChatSession = {
      id: activeSessionId || `session-${Date.now()}`,
      title:
        chatState.messages[0].content.substring(0, 30) +
        (chatState.messages[0].content.length > 30 ? "..." : ""),
      messages: chatState.messages,
      timestamp: Date.now(),
    };

    setSessions((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === newSession.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newSession;
        return updated;
      }
      return [newSession, ...prev];
    });
  }, [chatState.messages, activeSessionId]);

  const createNewChat = useCallback(() => {
    saveCurrentSession();
    setChatState({
      messages: [],
      isLoading: false,
      error: null,
    });
    setActiveSessionId(null);
  }, [saveCurrentSession]);

  const loadSession = useCallback(
    (sessionId: string) => {
      saveCurrentSession();
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        setChatState({
          messages: session.messages,
          isLoading: false,
          error: null,
        });
        setActiveSessionId(session.id);
      }
    },
    [sessions, saveCurrentSession],
  );

  const clearChat = useCallback(() => {
    createNewChat();
  }, [createNewChat]);

  return {
    ...chatState,
    sendMessage,
    clearChat,
    sessions,
    loadSession,
    activeSessionId,
  };
};
