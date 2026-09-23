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
  Home
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

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [frameworkDropdownOpen, setFrameworkDropdownOpen] = useState(false);

  const sections: NavSection[] = [
    {
      title: 'Introduction',
      items: [
        { label: 'Quick Start', path: '/docs/quickstart', icon: <Zap className="w-4 h-4 text-amber-400" /> },
        { label: 'What is EnvBoot', path: '/docs/quickstart#what-is-envboot', icon: <HelpCircle className="w-4 h-4 text-slate-400" /> },
        { label: 'Comparisons', path: '/docs/quickstart#comparisons', icon: <Scale className="w-4 h-4 text-slate-400" /> },
        { label: 'CLI Commands', path: '/docs/cli', icon: <Terminal className="w-4 h-4 text-slate-400" />, hasChildren: true },
        { label: 'Framework Recipes', path: '/docs/frameworks', icon: <Layers className="w-4 h-4 text-slate-400" />, hasChildren: true },
      ],
    },
    {
      title: 'Configurations',
      items: [
        { label: 'Contract Schema (.envboot.json)', path: '/docs/quickstart#contract-file', icon: <FileCode className="w-4 h-4 text-slate-400" /> },
        { label: 'Startup Guard Injection', path: '/docs/quickstart#guard-injection', icon: <ShieldCheck className="w-4 h-4 text-slate-400" /> },
        { label: 'CI/CD Drift Protection', path: '/docs/ci-cd', icon: <Lock className="w-4 h-4 text-slate-400" />, hasChildren: true },
      ],
    },
    {
      title: 'API & Tools',
      items: [
        { label: 'Runtime API', path: '/docs/api', icon: <Code2 className="w-4 h-4 text-slate-400" /> },
        { label: 'Contract Playground', path: '/playground', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
      ],
    },
  ];

  return (
    <>
      <aside className="w-64 sm:w-72 shrink-0 h-screen sticky top-0 bg-[#090d16] dark:bg-[#090d16] light:bg-slate-50 border-r border-slate-800/80 flex flex-col justify-between select-none z-30">
        
        {/* Top Scrollable Navigation */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Header: Logo + App Name + Sidebar Toggle Button */}
          <div className="flex items-center justify-between pt-1 pb-1">
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500/20 to-emerald-500/30 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-bold text-sm text-slate-100 tracking-tight group-hover:text-amber-300 transition-colors">
                EnvBoot
              </span>
            </NavLink>

            <button
              onClick={() => {}}
              className="p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-850 transition-colors"
              title="Toggle sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Search Trigger */}
          <div>
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-normal text-slate-400">Search</span>
              </div>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-200 border border-slate-700 dark:border-slate-700 light:border-slate-300 rounded text-slate-400">
                ⌘ K
              </kbd>
            </button>
          </div>

          {/* Mode / Framework Selector */}
          <div className="relative">
            <button
              onClick={() => setFrameworkDropdownOpen(!frameworkDropdownOpen)}
              className="w-full bg-slate-900/50 dark:bg-slate-900/50 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-lg px-3 py-2 flex items-center justify-between text-xs font-medium text-slate-200 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-200">Documentation</span>
                <span className="text-[10px] font-mono text-slate-500">v0.1.7</span>
              </div>
              <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {frameworkDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-1 z-40 space-y-0.5 text-xs">
                <NavLink
                  to="/docs/quickstart"
                  onClick={() => setFrameworkDropdownOpen(false)}
                  className="block px-2.5 py-1.5 rounded text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Documentation
                </NavLink>
                <NavLink
                  to="/docs/frameworks"
                  onClick={() => setFrameworkDropdownOpen(false)}
                  className="block px-2.5 py-1.5 rounded text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Framework Guides
                </NavLink>
                <NavLink
                  to="/playground"
                  onClick={() => setFrameworkDropdownOpen(false)}
                  className="block px-2.5 py-1.5 rounded text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Interactive Playground
                </NavLink>
                <NavLink
                  to="/"
                  onClick={() => setFrameworkDropdownOpen(false)}
                  className="block px-2.5 py-1.5 rounded text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-1.5"
                >
                  <Home className="w-3 h-3 text-slate-500" />
                  <span>Landing Page</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          <div className="space-y-6 pt-2">
            {sections.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2 font-mono">
                  {section.title}
                </div>

                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isHashLink = item.path.includes('#');
                    const isActive = isHashLink 
                      ? location.pathname + location.hash === item.path
                      : location.pathname === item.path;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all group ${
                          isActive
                            ? 'bg-amber-500/15 text-amber-300 font-semibold'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 dark:text-slate-400 dark:hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.icon}
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.hasChildren && (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 shrink-0 ml-1" />
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
        <div className="p-3 border-t border-slate-800/80 bg-[#070a12] flex items-center justify-between text-xs text-slate-400">
          <a
            href="https://github.com/ashishrbuilds/envboot"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4 text-slate-400 hover:text-white" />
            <span className="text-[11px] font-medium hidden sm:inline text-slate-400">GitHub</span>
          </a>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-md hover:text-white hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </aside>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
