import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Zap, 
  HelpCircle, 
  Scale, 
  Terminal, 
  Layers, 
  FileCode, 
  ShieldCheck, 
  Lock, 
  Code2, 
  Sparkles, 
  ChevronRight, 
  Search, 
  ChevronsUpDown, 
  PanelLeft, 
  Github, 
  Sun, 
  Moon,
  Home,
  X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SearchModal } from './SearchModal';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  hasChildren?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
  onOpenSearch?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggleCollapse,
  isMobile = false,
  onCloseMobile,
  onOpenSearch,
}) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);
  const [frameworkDropdownOpen, setFrameworkDropdownOpen] = useState(false);

  const sections: NavSection[] = [
    {
      title: 'Introduction',
      items: [
        { label: 'Quick Start', path: '/docs/quickstart', icon: <Zap className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> },
        { label: 'What is EnvBoot', path: '/docs/quickstart#what-is-envboot', icon: <HelpCircle className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> },
        { label: 'Comparisons', path: '/docs/quickstart#comparisons', icon: <Scale className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> },
        { label: 'CLI Commands', path: '/docs/cli', icon: <Terminal className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />, hasChildren: true },
        { label: 'Framework Recipes', path: '/docs/frameworks', icon: <Layers className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />, hasChildren: true },
      ],
    },
    {
      title: 'Configurations',
      items: [
        { label: 'Contract Schema (.envboot.json)', path: '/docs/quickstart#contract-file', icon: <FileCode className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> },
        { label: 'Startup Guard Injection', path: '/docs/quickstart#guard-injection', icon: <ShieldCheck className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> },
        { label: 'CI/CD Drift Protection', path: '/docs/ci-cd', icon: <Lock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />, hasChildren: true },
      ],
    },
    {
      title: 'API & Tools',
      items: [
        { label: 'Runtime API', path: '/docs/api', icon: <Code2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> },
        { label: 'Contract Playground', path: '/playground', icon: <Sparkles className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> },
      ],
    },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (path.includes('#')) {
      const [routePath, hash] = path.split('#');
      if (location.pathname === routePath) {
        e.preventDefault();
        window.location.hash = `${routePath}#${hash}`;
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    if (isMobile) {
      onCloseMobile?.();
    }
  };

  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setInternalSearchOpen(true);
    }
  };

  const content = (
    <>
      {/* Top Scrollable Navigation */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {/* Header: Logo + App Name + Close / Collapse Button */}
        <div className="flex items-center justify-between pt-1 pb-1">
          <NavLink 
            to="/" 
            onClick={() => { if (isMobile) onCloseMobile?.(); }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-100 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-zinc-100" />
            </div>
            <span className="font-bold text-sm text-zinc-950 dark:text-zinc-100 tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              EnvBoot
            </span>
          </NavLink>

          {isMobile ? (
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Trigger */}
        <div>
          <button
            onClick={handleSearchClick}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-normal">Search</span>
            </div>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-500 dark:text-zinc-400">
              ⌘ K
            </kbd>
          </button>
        </div>

        {/* Mode / Framework Selector */}
        <div className="relative">
          <button
            onClick={() => setFrameworkDropdownOpen(!frameworkDropdownOpen)}
            className="w-full bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 flex items-center justify-between text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Documentation</span>
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">v0.1.7</span>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {frameworkDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-1 z-40 space-y-0.5 text-xs">
              <NavLink
                to="/docs/quickstart"
                onClick={() => { setFrameworkDropdownOpen(false); if (isMobile) onCloseMobile?.(); }}
                className="block px-2.5 py-1.5 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white"
              >
                Documentation
              </NavLink>
              <NavLink
                to="/docs/frameworks"
                onClick={() => { setFrameworkDropdownOpen(false); if (isMobile) onCloseMobile?.(); }}
                className="block px-2.5 py-1.5 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white"
              >
                Framework Guides
              </NavLink>
              <NavLink
                to="/playground"
                onClick={() => { setFrameworkDropdownOpen(false); if (isMobile) onCloseMobile?.(); }}
                className="block px-2.5 py-1.5 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white"
              >
                Interactive Playground
              </NavLink>
              <NavLink
                to="/"
                onClick={() => { setFrameworkDropdownOpen(false); if (isMobile) onCloseMobile?.(); }}
                className="block px-2.5 py-1.5 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5"
              >
                <Home className="w-3 h-3 text-zinc-400" />
                <span>Landing Page</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="space-y-6 pt-2">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-2 mb-2 font-mono">
                {section.title}
              </div>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isHashLink = item.path.includes('#');
                  const isActive = isHashLink 
                    ? location.pathname + location.hash === item.path
                    : location.pathname === item.path && !location.hash;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={(e) => handleNavClick(e, item.path)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-zinc-200 text-zinc-950 dark:bg-zinc-800 dark:text-white font-semibold shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.icon}
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.hasChildren && (
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 dark:text-zinc-600 dark:group-hover:text-zinc-400 shrink-0 ml-1" />
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sticky Footer */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <a
          href="https://github.com/ashishrbuilds/envboot"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Repository"
          className="p-1.5 rounded-md hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          <Github className="w-4 h-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white" />
          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">GitHub</span>
        </a>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-md hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-zinc-300" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-600" />
            )}
          </button>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="w-full h-full flex flex-col justify-between select-none">
        {content}
        {!onOpenSearch && (
          <SearchModal isOpen={internalSearchOpen} onClose={() => setInternalSearchOpen(false)} />
        )}
      </div>
    );
  }

  return (
    <>
      <aside 
        className={`hidden lg:flex flex-col justify-between select-none z-30 shrink-0 h-screen sticky top-0 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/80 transition-all duration-200 ${
          collapsed ? 'w-0 overflow-hidden border-r-0' : 'w-64 xl:w-72'
        }`}
      >
        {content}
      </aside>

      {!onOpenSearch && (
        <SearchModal isOpen={internalSearchOpen} onClose={() => setInternalSearchOpen(false)} />
      )}
    </>
  );
};
