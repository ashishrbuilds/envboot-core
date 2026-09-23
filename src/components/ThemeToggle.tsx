import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'dropdown' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'dropdown',
  className = '',
}) => {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Segmented control variant (e.g. for Sidebar footer or settings)
  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 ${className}`}
        role="group"
        aria-label="Theme mode selector"
      >
        <button
          type="button"
          onClick={() => setThemeMode('light')}
          title="Light theme"
          aria-label="Light theme"
          aria-pressed={themeMode === 'light'}
          className={`p-1.5 rounded-md transition-all duration-150 ${
            themeMode === 'light'
              ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setThemeMode('dark')}
          title="Dark theme"
          aria-label="Dark theme"
          aria-pressed={themeMode === 'dark'}
          className={`p-1.5 rounded-md transition-all duration-150 ${
            themeMode === 'dark'
              ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setThemeMode('auto')}
          title={`System default (${resolvedTheme})`}
          aria-label="System theme (auto)"
          aria-pressed={themeMode === 'auto'}
          className={`p-1.5 rounded-md transition-all duration-150 ${
            themeMode === 'auto'
              ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // Dropdown variant (e.g. for Navbar or Headers)
  const getButtonTitle = () => {
    if (themeMode === 'auto') return `Theme: System (${resolvedTheme})`;
    if (themeMode === 'dark') return 'Theme: Dark';
    return 'Theme: Light';
  };

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode; hint?: string }[] = [
    {
      mode: 'light',
      label: 'Light',
      icon: <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
    },
    {
      mode: 'dark',
      label: 'Dark',
      icon: <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />,
    },
    {
      mode: 'auto',
      label: 'System',
      icon: <Monitor className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
      hint: `Auto (${resolvedTheme})`,
    },
  ];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={getButtonTitle()}
        title={getButtonTitle()}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 flex items-center justify-center"
      >
        {themeMode === 'auto' ? (
          <Monitor className="w-4 h-4" />
        ) : themeMode === 'dark' ? (
          <Moon className="w-4 h-4 text-zinc-300" />
        ) : (
          <Sun className="w-4 h-4 text-zinc-700" />
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-38 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-950/5 dark:shadow-zinc-950/50 py-1 z-50 animate-in fade-in zoom-in-95 duration-100 focus:outline-none"
        >
          <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Theme
          </div>
          {options.map((option) => {
            const isSelected = themeMode === option.mode;
            return (
              <button
                key={option.mode}
                role="menuitem"
                type="button"
                onClick={() => {
                  setThemeMode(option.mode);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'font-medium text-zinc-950 dark:text-white bg-zinc-100/80 dark:bg-zinc-800/80'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span>{option.label}</span>
                  {option.hint && (
                    <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
                      {option.hint}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
