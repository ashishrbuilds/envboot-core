import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Terminal, 
  Layers, 
  ShieldAlert, 
  Code2, 
  Sparkles,
  ChevronRight,
  FileCheck
} from 'lucide-react';

interface SidebarGroup {
  title: string;
  items: {
    label: string;
    path: string;
    icon?: React.ReactNode;
  }[];
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction & Quickstart', path: '/docs/quickstart', icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
  {
    title: 'CLI Reference',
    items: [
      { label: 'Commands & Flags', path: '/docs/cli', icon: <Terminal className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Framework Integration',
    items: [
      { label: 'Vite, Next.js, Express, Bun', path: '/docs/frameworks', icon: <Layers className="w-4 h-4" /> },
    ],
  },
  {
    title: 'CI/CD & Security',
    items: [
      { label: 'Drift Protection & Secret Shield', path: '/docs/ci-cd', icon: <ShieldAlert className="w-4 h-4" /> },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'Programmatic API', path: '/docs/api', icon: <Code2 className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Interactive Tools',
    items: [
      { label: 'Contract Playground', path: '/playground', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-slate-800/80 p-6 pr-4 space-y-8 bg-slate-950/40">
      {SIDEBAR_GROUPS.map((group) => (
        <div key={group.title} className="space-y-2">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
            {group.title}
          </div>
          <div className="space-y-1">
            {group.items.map((item) => {
              const active = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all group ${
                    active
                      ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quick Contract Card */}
      <div className="pt-4 border-t border-slate-900">
        <div className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/40 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>.envboot.json</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Zero dependencies at runtime. Startup crashes happen before code mounts.
          </p>
        </div>
      </div>
    </aside>
  );
};
