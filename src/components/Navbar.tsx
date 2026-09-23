import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Github, 
  Sparkles
} from 'lucide-react';
import { SearchModal } from './SearchModal';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Documentation', path: '/docs/quickstart' },
    { label: 'CLI', path: '/docs/cli' },
    { label: 'Frameworks', path: '/docs/frameworks' },
    { label: 'CI/CD', path: '/docs/ci-cd' },
    { label: 'API', path: '/docs/api' },
    { label: 'Changelog', path: '/docs/changelog' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          
          {/* Brand Identity: Logo + Name + Version Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/envboot.png"
                alt="EnvBoot Logo"
                className="w-8 h-8 rounded-lg object-contain shadow-sm group-hover:scale-105 transition-transform"
              />
              <span className="text-base font-bold tracking-tight text-zinc-950 dark:text-white">
                EnvBoot
              </span>
            </Link>

            <span className="hidden sm:inline-flex text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
              v0.1.7
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-zinc-950 dark:text-white font-semibold bg-zinc-200/80 dark:bg-zinc-800'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900/60'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/playground"
              className={`whitespace-nowrap ml-1 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all text-xs font-semibold ${
                location.pathname === '/playground'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Playground</span>
            </Link>
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search Box Trigger (Icon on mobile, input trigger on tablet/desktop) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title="Search documentation"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center justify-between gap-3 w-44 md:w-52 px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              title="Search documentation (Cmd + K)"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                <span>Search docs...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded">
                ⌘K
              </kbd>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/ashishrbuilds/envboot"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4.5 h-4.5" />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-zinc-200 text-zinc-950 dark:bg-zinc-800 dark:text-white font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
            >
              <Sparkles className="w-4 h-4" />
              <span>Contract Playground</span>
            </Link>

            <div className="pt-3 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Appearance</span>
              <ThemeToggle variant="segmented" />
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
