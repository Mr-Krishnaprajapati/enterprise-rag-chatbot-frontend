# Enterprise RAG Chatbot Frontend

An enterprise-grade, frontend-only React application that simulates a Retrieval-Augmented Generation (RAG) chatbot interface.

## Overview

This project implements a polished, interview-ready chat interface designed for enterprise scenarios. It features a realistic chat simulation with latency, error handling, and citation management, all without requiring a backend.

## Features

- **Chat Interface**: Chronological message history, distinct user/assistant bubbles, and auto-scrolling.
- **RAG Simulation**: Mocked API service simulating network latency (2-3s) and random failures (5%).
- **Citations**: Assistant responses include clickable citations that open a document viewer.
- **Document Viewer**: Side panel displaying document details and highlighted snippets.
- **Polish**: Tailwind CSS for a clean, modern, and responsive UI.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks (useState, useCallback)
- **Deployment**: Static site ready

## Application Architecture

The project follows a clean separation of concerns:

```
src/
├── components/       # UI Components
│   ├── chat/        # Chat-specific components (chatInput, MessageBubble)
│   └── documents/   # Document viewer components (DocumentViewer)
├── hooks/           # Custom React Hooks (useChat)
├── services/        # Mock API logic (mockChatService.ts)
├── types/           # Shared TypeScript interfaces (index.ts)
└── App.tsx          # Main layout and composition
```

## Key Components

- **`App.tsx`**: The main layout container. Manages the overall app structure, including the sidebar (history), chat area, and the sliding document viewer panel.
- **`useChat.ts`**: The central logic hub. Manages the chat state (messages, loading, errors), handles API calls to the mock service, and persists session data.
- **`MessageBubble.tsx`**: Renders individual chat messages. Handles condition styling for user vs. assistant roles and renders the list of interactive citation chips.
- **`DocumentViewer.tsx`**: A dedicated side-panel component for displaying the full content of a cited document. It reinforces the "responsive" and "interactive" nature of the app.
- **`mockChatService.ts`**: Simulates the backend infrastructure. It provides realistic latency, failure simulation, and generating the specific "Answer + Citations" response structure.

## State Management

This application uses a straightforward, **frontend-centric state management** approach suitable for single-page applications of this scale:
- **Local State (`useState`)**: Used for UI-specific state like the currently active citation (which drives the Document Viewer) and input field values.
- **Custom Hooks (`useChat`)**: Encapsulates the complex business logic (sending messages, appending to history, handling loading/error states). This mimics a "Store" pattern without the overhead of Redux or Context API.
- **Prop Drilling**: Data flow is unidirectional and shallow (App -> components), keeping the architecture predictable and easy to debug.

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Integration Guide (Production)

To wire this frontend to a real backend:
1.  **Replace Service Layer**: Swap `src/services/mockChatService.ts` with a real API client (using `axios` or `fetch`) that connects to your RAG API endpoint.
2.  **Match Contracts**: Ensure your backend returns the JSON structure defined in `src/types/index.ts` (specifically the `Message` and `Citation` interfaces).
3.  **Environment Variables**: Move configuration (API URLs, timeouts) to a `.env` file.
4.  **Error Handling**: Update the `useChat` hook to interpret real HTTP status codes (401, 429, 500) for more granular user feedback.

## Design Decisions & Trade-offs

- **Mock Implementation**: We built a sophisticated `mockChatService` to simulate network variability (latency, errors) instead of a simple hardcoded list. This allows for "End-to-End" testing of the UI resilience without a running backend.
- **No Heavy State Library**: We deliberately avoided Redux/Zustand. The application's state (a list of messages) is linear and simple enough that React's built-in hooks provide the most performant and "clean code" solution.
- **Tailwind CSS**: Chosen for speed and consistency. It allows us to match the "Premium" aesthetic quickly with utility classes rather than writing custom CSS files for every component.

## Potential Improvements

Given more time, we would enhance the following areas:
- **Accessibility (a11y)**: Add ARIA labels to the Document Viewer and ensure full keyboard navigation support for citation chips.
- **Rich Document Rendering**: Support Markdown or PDF rendering within the Document Viewer for a truer "Document" experience.
- **User Settings**: Add a settings modal to allow users to toggle "Dark Mode" or adjust the "Simulated Latency" to test different network conditions.
- **Testing**: Add Unit tests (Vitest) for the `useChat` hook and Component tests (React Testing Library) for the interaction flows.
