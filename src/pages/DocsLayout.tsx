import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const DocsLayout: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
      <Sidebar />
      <main className="flex-1 min-w-0 py-10 px-0 sm:px-6 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
};
