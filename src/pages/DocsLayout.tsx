import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { MessageSquare } from 'lucide-react';
import { AskAiModal } from '../components/AskAiModal';

export const DocsLayout: React.FC = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex bg-[#090d16] text-slate-100 dark:bg-[#090d16] dark:text-slate-100 light:bg-white light:text-slate-900">
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
          className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-2xl flex items-center gap-2 text-xs font-medium hover:border-slate-600 transition-all hover:scale-105"
        >
          <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
          <span>Ask AI</span>
        </button>

        <AskAiModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
      </div>
    </div>
  );
};

