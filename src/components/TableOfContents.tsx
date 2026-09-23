import React from 'react';

export interface TocItem {
  id: string;
  label: string;
  level?: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden xl:block w-56 shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pl-6 border-l border-slate-800/60 text-xs">
      <div className="font-semibold text-slate-300 uppercase tracking-wider font-mono text-[11px] mb-3">
        On This Page
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`block text-left w-full text-slate-400 hover:text-emerald-400 transition-colors leading-snug ${
              item.level === 3 ? 'pl-3 text-[11px] text-slate-500' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
