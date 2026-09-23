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

  // Close dropdown on click outside or Escape key
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

  // Segmented control variant (e.g. for Sidebar footer or Mobile drawer)
  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-lg bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 ${className}`}
        role="group"
        aria-label="Theme mode selector"
      >
        <button
          type="button"
          onClick={() => setThemeMode('light')}
          title="Light theme"
          aria-label="Light theme"
          aria-pressed={themeMode === 'light'}
          className={`p-1.5 rounded-md transition-all duration-150 focus:outline-none focus-visible:outline-none ${
            themeMode === 'light'
              ? 'bg-white text-zinc-950 shadow-xs border border-zinc-200/90 font-medium'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 border border-transparent'
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
          className={`p-1.5 rounded-md transition-all duration-150 focus:outline-none focus-visible:outline-none ${
            themeMode === 'dark'
              ? 'bg-zinc-800 text-zinc-100 shadow-xs border border-zinc-700/60 font-medium'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 border border-transparent'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setThemeMode('auto')}
          title={`System auto (${resolvedTheme})`}
          aria-label="System theme (auto)"
          aria-pressed={themeMode === 'auto'}
          className={`p-1.5 rounded-md transition-all duration-150 focus:outline-none focus-visible:outline-none ${
            themeMode === 'auto'
              ? 'bg-white text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100 shadow-xs border border-zinc-200/90 dark:border-zinc-700/60 font-medium'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 border border-transparent'
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
      icon: <Sun className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
    },
    {
      mode: 'dark',
      label: 'Dark',
      icon: <Moon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
    },
    {
      mode: 'auto',
      label: 'System',
      icon: <Monitor className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />,
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
        className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus:outline-none focus-visible:outline-none flex items-center justify-center border border-transparent"
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
          className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-950/10 dark:shadow-zinc-950/60 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 focus:outline-none"
        >
          <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
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
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between whitespace-nowrap transition-colors focus:outline-none ${
                  isSelected
                    ? 'font-medium text-zinc-950 dark:text-white bg-zinc-100/90 dark:bg-zinc-800/90'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {option.hint && (
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                      {option.hint}
                    </span>
                  )}
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white stroke-[2.5]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
