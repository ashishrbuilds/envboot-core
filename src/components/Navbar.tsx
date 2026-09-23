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
  ExternalLink,
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
    { label: 'Overview', path: '/' },
    { label: 'Quickstart', path: '/docs/quickstart' },
    { label: 'CLI Commands', path: '/docs/cli' },
    { label: 'Frameworks', path: '/docs/frameworks' },
    { label: 'CI/CD Guard', path: '/docs/ci-cd' },
    { label: 'Runtime API', path: '/docs/api' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80 light:border-slate-200 light:bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Version */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:border-emerald-400/60 transition-all">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white dark:text-white light:text-slate-900 flex items-center gap-1.5">
                  EnvBoot
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:inline">
                  zero-runtime-deps
                </span>
              </div>
            </Link>

            <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-full bg-slate-800/80 text-emerald-400 border border-slate-700/60">
              v0.1.7
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/playground"
              className={`ml-1 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs font-semibold ${
                location.pathname === '/playground'
                  ? 'bg-emerald-500 text-emerald-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Playground
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Quick search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-900/90 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-slate-200 transition-colors"
              title="Search documentation"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/ashishrbuilds/envboot"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* npm Link */}
            <a
              href="https://www.npmjs.com/package/envboot"
              target="_blank"
              rel="noreferrer"
              aria-label="npm package"
              className="px-2 py-1 text-xs font-mono font-bold text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors flex items-center gap-1"
            >
              npm
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
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
