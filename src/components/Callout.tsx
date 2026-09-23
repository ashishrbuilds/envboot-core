import React from 'react';
import { Info, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface CalloutProps {
  type?: 'note' | 'tip' | 'warning' | 'caution';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type = 'note', title, children }) => {
  const configs = {
    note: {
      icon: <Info className="w-5 h-5 text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Note',
    },
    tip: {
      icon: <CheckCircle2 className="w-5 h-5 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5" />,
      defaultTitle: 'Tip',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5" />,
      defaultTitle: 'Warning',
    },
    caution: {
      icon: <ShieldAlert className="w-5 h-5 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5" />,
      defaultTitle: 'Caution',
    },
  };

  const current = configs[type];

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-4 flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      {current.icon}
      <div className="flex-1 space-y-1">
        {title && (
          <div className="font-semibold text-zinc-950 dark:text-white">
            {title}
          </div>
        )}
        <div className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};
