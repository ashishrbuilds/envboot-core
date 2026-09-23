import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Code2, 
  Sparkles,
  ChevronDown,
  Search,
  Hash
} from 'lucide-react';

interface SidebarSubItem {
  label: string;
  hash: string;
}

interface SidebarItem {
  label: string;
  path: string;
  badge?: string;
  subItems?: SidebarSubItem[];
}

interface SidebarFolder {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: SidebarItem[];
}

const FUMADOCS_FOLDERS: SidebarFolder[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
    items: [
      {
        label: 'Quickstart Guide',
        path: '/docs/quickstart',
        badge: 'Core',
        subItems: [
          { label: 'Automated Setup', hash: '#installation' },
          { label: 'Contract Schema', hash: '#contract-file' },
          { label: 'Guard Injection', hash: '#guard-injection' },
          { label: 'Fail-Fast Scripts', hash: '#fail-fast' },
          { label: 'Cascading Loader', hash: '#env-loader' },
        ],
      },
    ],
  },
  {
    id: 'cli-reference',
    title: 'CLI Reference',
    icon: <Terminal className="w-4 h-4 text-cyan-400" />,
    items: [
      {
        label: 'CLI Commands & Flags',
        path: '/docs/cli',
        badge: 'v0.1.7',
        subItems: [
          { label: 'Command Matrix', hash: '#command-table' },
          { label: 'envboot init', hash: '#init' },
          { label: 'envboot check', hash: '#check' },
          { label: 'envboot doctor', hash: '#doctor' },
          { label: 'envboot sync', hash: '#sync' },
          { label: 'Exit Codes', hash: '#exit-codes' },
        ],
      },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    icon: <Layers className="w-4 h-4 text-indigo-400" />,
    items: [
      {
        label: 'Integration Recipes',
        path: '/docs/frameworks',
        subItems: [
          { label: 'Next.js (App / Pages)', hash: '#nextjs' },
          { label: 'Vite & Browser', hash: '#vite' },
          { label: 'Express, Fastify & Koa', hash: '#express' },
          { label: 'NestJS', hash: '#nestjs' },
          { label: 'Bun & Deno', hash: '#bun-deno' },
        ],
      },
    ],
  },
  {
    id: 'security-ci',
    title: 'CI/CD & Security',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    items: [
      {
        label: 'Drift & Secret Shield',
        path: '/docs/ci-cd',
        subItems: [
          { label: 'GitHub Actions', hash: '#github-actions' },
          { label: 'Drift Detection', hash: '#drift-detection' },
          { label: 'Strict Mode', hash: '#strict-mode' },
          { label: 'Secret Shield', hash: '#secret-shield' },
        ],
      },
    ],
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    icon: <Code2 className="w-4 h-4 text-purple-400" />,
    items: [
      {
        label: 'Runtime Methods & Types',
        path: '/docs/api',
        subItems: [
          { label: 'envboot.init()', hash: '#init-api' },
          { label: 'envboot.validate()', hash: '#validate-api' },
          { label: 'TypeScript Types', hash: '#types' },
        ],
      },
    ],
  },
  {
    id: 'interactive-tools',
    title: 'Interactive Tools',
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    items: [
      {
        label: 'Contract Playground',
        path: '/playground',
        badge: 'Live',
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({});
  const [filterQuery, setFilterQuery] = useState('');

  const toggleFolder = (folderId: string) => {
    setCollapsedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleSubItemClick = (path: string, hash: string) => {
    navigate(`${path}${hash}`);
    const el = document.getElementById(hash.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-68 shrink-0 hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-slate-800/80 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50/50 p-4 pr-3 select-none text-xs">
      
      {/* Fumadocs Quick Filter / Search input */}
      <div className="mb-5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter documentation..."
            className="w-full bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 dark:text-slate-200 light:text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Fumadocs Tree Folders */}
      <div className="space-y-4">
        {FUMADOCS_FOLDERS.map((folder) => {
          const isCollapsed = collapsedFolders[folder.id];
          const hasMatchingItems = folder.items.some((item) =>
            item.label.toLowerCase().includes(filterQuery.toLowerCase())
          );

          if (filterQuery && !hasMatchingItems) return null;

          return (
            <div key={folder.id} className="space-y-1">
              {/* Folder Header */}
              <button
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-colors font-medium group text-left"
              >
                <div className="flex items-center gap-2">
                  {folder.icon}
                  <span className="font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 tracking-tight">
                    {folder.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    isCollapsed ? '-rotate-90' : 'rotate-0'
                  }`}
                />
              </button>

              {/* Tree Indentation & Items */}
              {!isCollapsed && (
                <div className="border-l border-slate-800/80 dark:border-slate-800/80 light:border-slate-300 ml-4 pl-3 py-0.5 space-y-1">
                  {folder.items.map((item) => {
                    const isPageActive = location.pathname === item.path;

                    if (
                      filterQuery &&
                      !item.label.toLowerCase().includes(filterQuery.toLowerCase())
                    ) {
                      return null;
                    }

                    return (
                      <div key={item.path} className="space-y-1">
                        {/* Page Link */}
                        <NavLink
                          to={item.path}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md transition-all group ${
                            isPageActive
                              ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 dark:text-slate-400 dark:hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-medium border ${
                                isPageActive
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : 'bg-slate-900 text-slate-500 border-slate-800 group-hover:border-slate-700'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </NavLink>

                        {/* Fumadocs In-Page TOC sub-items (Visible when page is active) */}
                        {isPageActive && item.subItems && item.subItems.length > 0 && (
                          <div className="border-l border-emerald-500/30 ml-2.5 pl-2.5 py-1 space-y-0.5 animate-fadeIn">
                            {item.subItems.map((sub) => (
                              <button
                                key={sub.hash}
                                onClick={() => handleSubItemClick(item.path, sub.hash)}
                                className="w-full text-left py-1 px-1.5 rounded text-[11px] text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/5 transition-colors flex items-center gap-1.5 truncate"
                              >
                                <Hash className="w-2.5 h-2.5 text-slate-600 shrink-0" />
                                <span className="truncate">{sub.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fumadocs Bottom Context Widget */}
      <div className="mt-8 pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center justify-between font-mono font-semibold text-slate-300">
            <span>envboot</span>
            <span className="text-emerald-400 text-[10px]">v0.1.7</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-500">
            Zero runtime dependencies. Contracts enforced at boot.
          </p>
        </div>
      </div>
    </aside>
  );
};
