import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Terminal, Code2, Shield, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  title: string;
  category: string;
  path: string;
  icon: React.ReactNode;
  keywords: string[];
}

const SEARCH_INDEX: SearchResult[] = [
  {
    title: 'Quickstart & Installation',
    category: 'Getting Started',
    path: '/docs/quickstart',
    icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
    keywords: ['quickstart', 'install', 'init', 'setup', 'guard', 'startup'],
  },
  {
    title: 'Startup Guard Injection',
    category: 'Getting Started',
    path: '/docs/quickstart#guard-injection',
    icon: <Code2 className="w-4 h-4 text-emerald-400" />,
    keywords: ['guard', 'entrypoint', 'server.ts', 'main.tsx', 'import envboot'],
  },
  {
    title: 'CLI Reference (init, check, doctor, sync)',
    category: 'CLI Reference',
    path: '/docs/cli',
    icon: <Terminal className="w-4 h-4 text-cyan-400" />,
    keywords: ['cli', 'commands', 'flags', 'strict', 'prune', 'config'],
  },
  {
    title: 'Diagnostic Health Check (envboot doctor)',
    category: 'CLI Reference',
    path: '/docs/cli#doctor',
    icon: <Terminal className="w-4 h-4 text-cyan-400" />,
    keywords: ['doctor', 'diagnostic', 'health', 'inspect'],
  },
  {
    title: 'CI Drift Protection (envboot check)',
    category: 'CLI Reference',
    path: '/docs/cli#check',
    icon: <Terminal className="w-4 h-4 text-cyan-400" />,
    keywords: ['check', 'ci', 'drift', 'fail', 'exit 1'],
  },
  {
    title: 'Next.js Integration (App & Pages Router)',
    category: 'Frameworks',
    path: '/docs/frameworks#nextjs',
    icon: <Wrench className="w-4 h-4 text-indigo-400" />,
    keywords: ['nextjs', 'next.js', 'app router', 'pages', 'react'],
  },
  {
    title: 'Vite & Frontend Browser Guard (envboot/browser)',
    category: 'Frameworks',
    path: '/docs/frameworks#vite',
    icon: <Wrench className="w-4 h-4 text-indigo-400" />,
    keywords: ['vite', 'browser', 'react', 'vue', 'import.meta.env'],
  },
  {
    title: 'Express, Fastify & Backend APIs',
    category: 'Frameworks',
    path: '/docs/frameworks#express',
    icon: <Wrench className="w-4 h-4 text-indigo-400" />,
    keywords: ['express', 'fastify', 'koa', 'nestjs', 'node', 'server'],
  },
  {
    title: 'Bun & Deno Runtimes',
    category: 'Frameworks',
    path: '/docs/frameworks#bun-deno',
    icon: <Wrench className="w-4 h-4 text-indigo-400" />,
    keywords: ['bun', 'deno', 'runtimes', 'bun.env', 'deno.env'],
  },
  {
    title: 'GitHub Actions & CI Drift Protection',
    category: 'CI/CD & Security',
    path: '/docs/ci-cd',
    icon: <Shield className="w-4 h-4 text-emerald-400" />,
    keywords: ['ci', 'cd', 'github actions', 'workflow', 'yaml', 'pipeline'],
  },
  {
    title: 'Secret Shield Privacy Guarantee',
    category: 'CI/CD & Security',
    path: '/docs/ci-cd#secret-shield',
    icon: <Shield className="w-4 h-4 text-emerald-400" />,
    keywords: ['secret', 'shield', 'mask', 'redact', 'security', 'privacy'],
  },
  {
    title: 'Runtime API (envboot.init, envboot.validate)',
    category: 'API Reference',
    path: '/docs/api',
    icon: <Code2 className="w-4 h-4 text-purple-400" />,
    keywords: ['api', 'runtime', 'init', 'validate', 'programmatic', 'typescript'],
  },
  {
    title: 'Interactive Contract Playground',
    category: 'Tools',
    path: '/playground',
    icon: <Wrench className="w-4 h-4 text-amber-400" />,
    keywords: ['playground', 'generator', 'simulator', 'builder', 'contract'],
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? SEARCH_INDEX.slice(0, 6)
    : SEARCH_INDEX.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
        );
      });

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, guides, and commands..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              No results found for "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.path}
                onClick={() => handleSelect(item.path)}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 group-hover:border-slate-600">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200 group-hover:text-emerald-300">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.category}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">Jump</span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span>Navigation: Select to jump</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
