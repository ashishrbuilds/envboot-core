import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { SearchModal } from '../components/SearchModal';
import { Menu, Search, Sun, Moon, PanelLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const DocsLayout: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Close mobile drawer on route or hash change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  // Current section title for mobile header breadcrumb
  const getCurrentSectionTitle = () => {
    const path = location.pathname;
    if (path.includes('quickstart')) return 'Quick Start';
    if (path.includes('cli')) return 'CLI Reference';
    if (path.includes('frameworks')) return 'Frameworks';
    if (path.includes('ci-cd')) return 'CI/CD';
    if (path.includes('api')) return 'API';
    if (path.includes('changelog')) return 'Changelog';
    return 'Docs';
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Mobile Top Header Bar (sticky on < lg) */}
      <header className="lg:hidden sticky top-0 z-30 w-full h-14 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 -ml-2 rounded-lg text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Open documentation navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/envboot.png"
              alt="EnvBoot Logo"
              className="w-7 h-7 rounded-lg object-contain shadow-sm"
            />
            <span className="font-bold text-sm tracking-tight text-zinc-950 dark:text-white">
              EnvBoot
            </span>
          </Link>

          <span className="text-xs text-zinc-400 dark:text-zinc-500 pl-2 border-l border-zinc-200 dark:border-zinc-800 font-medium">
            {getCurrentSectionTitle()}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Search documentation"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-zinc-300" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (visible when mobileNavOpen is true) */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over panel */}
          <div className="relative w-72 max-w-[85vw] h-full bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between z-10">
            <Sidebar
              isMobile
              onCloseMobile={() => setMobileNavOpen(false)}
              onOpenSearch={() => {
                setMobileNavOpen(false);
                setSearchOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar (visible on lg+) */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main documentation container */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen relative">
        {/* Desktop expand sidebar toggle if collapsed */}
        {collapsed && (
          <div className="hidden lg:block sticky top-3 left-4 z-20 px-6 pt-3">
            <button
              onClick={() => setCollapsed(false)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm transition-colors"
              title="Expand sidebar"
            >
              <PanelLeft className="w-4 h-4" />
              <span>Show Sidebar</span>
            </button>
          </div>
        )}

        <main className="flex-1 min-w-0 py-6 sm:py-8 px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};
