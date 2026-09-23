import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const DocsLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Sidebar docked directly on the left edge */}
      <Sidebar />
      
      {/* Main documentation container starting right after the sidebar */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen relative">
        <main className="flex-1 min-w-0 py-8 px-6 sm:px-8 lg:px-12 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
