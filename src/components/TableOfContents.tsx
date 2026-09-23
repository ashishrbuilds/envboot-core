import React, { useState, useEffect } from 'react';
import { AlignLeft } from 'lucide-react';

export interface TocItem {
  id: string;
  label: string;
  level?: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (!items || items.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <div className="hidden xl:block w-60 shrink-0 sticky top-10 h-[calc(100vh-5rem)] overflow-y-auto pl-4 text-xs select-none">
      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium text-xs mb-3">
        <AlignLeft className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
        <span>On this page</span>
      </div>

      <nav className="border-l border-zinc-200 dark:border-zinc-800 ml-1.5 pl-3 space-y-2.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block text-left w-full transition-all leading-snug relative ${
                isActive
                  ? 'text-zinc-950 dark:text-white font-semibold before:absolute before:-left-[14px] before:top-0.5 before:bottom-0.5 before:w-[2px] before:bg-zinc-950 dark:before:bg-white'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              } ${item.level === 3 ? 'pl-2 text-[11px] text-zinc-400 dark:text-zinc-500' : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
