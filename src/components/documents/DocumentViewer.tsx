import type { Citation } from "../../types";

interface DocumentViewerProps {
  citation: Citation | null;
  onClose: () => void;
}

export const DocumentViewer = ({ citation, onClose }: DocumentViewerProps) => {
  if (!citation) return null;

  return (
    <div className="h-full flex flex-col bg-gray-900 border-l border-white/10 shadow-2xl overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex justify-between items-start bg-gray-900/50 backdrop-blur-sm">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1 block">
            Document Source
          </span>
          <h3 className="font-bold text-lg text-white leading-tight">
            {citation.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            Page {citation.page}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-all"
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto w-full custom-scrollbar">
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-xl mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-all"></div>
          <p className="text-xs font-bold text-indigo-300 uppercase tracking-wide mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m10 9 5 3-5 3" />
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            Relevant Excerpt
          </p>
          <p className="text-indigo-50 text-base italic leading-relaxed relative z-10 border-l-2 border-indigo-500/50 pl-4">
            "{citation.snippet}"
          </p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none">
          <h4 className="text-gray-200 border-b border-white/10 pb-2 mb-4 font-semibold">
            Full Document Content
          </h4>
          <div className="p-5 bg-white/5 rounded-xl border border-white/5 whitespace-pre-line text-gray-300 leading-relaxed font-light">
            {citation.documentContent}
          </div>
        </div>
      </div>
    </div>
  );
};
