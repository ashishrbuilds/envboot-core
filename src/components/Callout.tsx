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
      icon: <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />,
      container: 'bg-sky-950/20 border-sky-800/40 text-sky-200/90 dark:text-sky-200/90 light:bg-sky-50 light:border-sky-200 light:text-sky-900',
      titleColor: 'text-sky-300 dark:text-sky-300 light:text-sky-950 font-semibold',
      defaultTitle: 'Note',
    },
    tip: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
      container: 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200/90 dark:text-emerald-200/90 light:bg-emerald-50 light:border-emerald-200 light:text-emerald-900',
      titleColor: 'text-emerald-300 dark:text-emerald-300 light:text-emerald-950 font-semibold',
      defaultTitle: 'Pro Tip',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
      container: 'bg-amber-950/20 border-amber-800/40 text-amber-200/90 dark:text-amber-200/90 light:bg-amber-50 light:border-amber-200 light:text-amber-900',
      titleColor: 'text-amber-300 dark:text-amber-300 light:text-amber-950 font-semibold',
      defaultTitle: 'Warning',
    },
    caution: {
      icon: <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
      container: 'bg-rose-950/20 border-rose-800/40 text-rose-200/90 dark:text-rose-200/90 light:bg-rose-50 light:border-rose-200 light:text-rose-900',
      titleColor: 'text-rose-300 dark:text-rose-300 light:text-rose-950 font-semibold',
      defaultTitle: 'Caution',
    },
  };

  const current = configs[type];

  return (
    <div className={`my-6 rounded-xl border p-4 flex gap-3 text-sm leading-relaxed ${current.container}`}>
      {current.icon}
      <div className="flex-1 space-y-1">
        {title && <div className={current.titleColor}>{title}</div>}
        <div className="text-slate-300 dark:text-slate-300 light:text-slate-700">{children}</div>
      </div>
    </div>
  );
};
