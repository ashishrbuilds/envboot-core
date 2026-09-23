import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { MessageSquare } from 'lucide-react';
import { AskAiModal } from '../components/AskAiModal';

export const DocsLayout: React.FC = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Sidebar docked directly on the left edge */}
      <Sidebar />
      
      {/* Main documentation container starting right after the sidebar */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen relative">
        <main className="flex-1 min-w-0 py-8 px-6 sm:px-8 lg:px-12 w-full">
          <Outlet />
        </main>

        {/* Fumadocs Floating Ask AI button */}
        <button
          onClick={() => setAiModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700/80 shadow-2xl flex items-center gap-2 text-xs font-medium transition-all hover:scale-105"
        >
          <MessageSquare className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
          <span>Ask AI</span>
        </button>

        <AskAiModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
      </div>
    </div>
  );
};
