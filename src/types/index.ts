export interface Citation {
  id: string;
  documentId: string;
  title: string;
  page: number;
  snippet: string;
  documentContent?: string;
}

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  citations?: Citation[];
  timestamp: number;
  status?: "sending" | "sent" | "error";
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}
