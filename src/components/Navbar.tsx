import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Github, 
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Documentation', path: '/docs/quickstart' },
    { label: 'CLI', path: '/docs/cli' },
    { label: 'Frameworks', path: '/docs/frameworks' },
    { label: 'CI/CD', path: '/docs/ci-cd' },
    { label: 'API', path: '/docs/api' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85 light:border-slate-200 light:bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          
          {/* Brand Identity: Logo + Name + Version Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/15 transition-all">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <span className="text-base font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                EnvBoot
              </span>
            </Link>

            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-400 dark:text-slate-400 light:text-slate-600">
              v0.1.7
            </span>
          </div>

          {/* Center Navigation Links (Clean, single-line, no wrapping) */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-emerald-400 font-semibold bg-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/playground"
              className={`whitespace-nowrap ml-1 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all text-xs font-semibold ${
                location.pathname === '/playground'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-900/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Playground</span>
            </Link>
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Box Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between gap-3 w-40 sm:w-52 px-3 py-1.5 text-xs text-slate-400 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-lg hover:border-slate-700 hover:text-slate-200 transition-colors"
              title="Search documentation (Cmd + K)"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Search docs...</span>
                <span className="sm:hidden">Search</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-200 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 rounded">
                ⌘K
              </kbd>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/ashishrbuilds/envboot"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* npm */}
            <a
              href="https://www.npmjs.com/package/envboot"
              target="_blank"
              rel="noreferrer"
              aria-label="npm Registry"
              className="px-2 py-1 text-xs font-mono font-bold text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-md transition-colors"
              title="npm package"
            >
              npm
            </a>

            {/* Divider */}
            <div className="h-4 w-px bg-slate-800 dark:bg-slate-800 light:bg-slate-200 hidden sm:block"></div>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 mt-2"
            >
              ✨ Interactive Playground
            </Link>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
