import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Terminal, Code2, Shield, Wrench, Scale, GitCommit } from 'lucide-react';
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
    icon: <BookOpen className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['quickstart', 'install', 'init', 'setup', 'guard', 'startup'],
  },
  {
    title: 'What is EnvBoot (Architecture)',
    category: 'Getting Started',
    path: '/docs/quickstart#what-is-envboot',
    icon: <Shield className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['what is', 'architecture', 'core', 'overview'],
  },
  {
    title: 'Comparisons (dotenv vs Zod vs EnvBoot)',
    category: 'Getting Started',
    path: '/docs/quickstart#comparisons',
    icon: <Scale className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['comparisons', 'dotenv', 'zod', 't3-env', 'envalid', 'why'],
  },
  {
    title: 'Startup Guard Injection',
    category: 'Getting Started',
    path: '/docs/quickstart#guard-injection',
    icon: <Code2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['guard', 'entrypoint', 'server.ts', 'main.tsx', 'import envboot'],
  },
  {
    title: 'CLI Reference (init, check, doctor, sync)',
    category: 'CLI Reference',
    path: '/docs/cli',
    icon: <Terminal className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['cli', 'commands', 'flags', 'strict', 'prune', 'config'],
  },
  {
    title: 'Diagnostic Health Check (envboot doctor)',
    category: 'CLI Reference',
    path: '/docs/cli#doctor',
    icon: <Terminal className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['doctor', 'diagnostic', 'health', 'inspect'],
  },
  {
    title: 'CI Drift Protection (envboot check)',
    category: 'CLI Reference',
    path: '/docs/cli#check',
    icon: <Terminal className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['check', 'ci', 'drift', 'fail', 'exit 1'],
  },
  {
    title: 'Next.js Integration (App & Pages Router)',
    category: 'Frameworks',
    path: '/docs/frameworks#nextjs',
    icon: <Wrench className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['nextjs', 'next.js', 'app router', 'pages', 'react'],
  },
  {
    title: 'Vite & Frontend Browser Guard (envboot/browser)',
    category: 'Frameworks',
    path: '/docs/frameworks#vite',
    icon: <Wrench className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['vite', 'browser', 'react', 'spa', 'client', 'frontend'],
  },
  {
    title: 'Express, Fastify & Koa Microservices',
    category: 'Frameworks',
    path: '/docs/frameworks#express',
    icon: <Wrench className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['express', 'fastify', 'backend', 'api', 'server', 'node'],
  },
  {
    title: 'NestJS Framework Integration',
    category: 'Frameworks',
    path: '/docs/frameworks#nestjs',
    icon: <Wrench className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['nestjs', 'nest', 'enterprise', 'backend', 'dependency injection'],
  },
  {
    title: 'Bun & Deno Runtimes',
    category: 'Frameworks',
    path: '/docs/frameworks#bun-deno',
    icon: <Wrench className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['bun', 'deno', 'runtimes', 'typescript'],
  },
  {
    title: 'GitHub Actions & CI/CD Pipeline',
    category: 'CI/CD & Security',
    path: '/docs/ci-cd',
    icon: <Shield className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['ci', 'cd', 'github actions', 'pipeline', 'workflow', 'shield'],
  },
  {
    title: 'Runtime API (envboot.init, envboot.validate)',
    category: 'API Reference',
    path: '/docs/api',
    icon: <Code2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['api', 'runtime', 'init', 'validate', 'programmatic', 'typescript'],
  },
  {
    title: 'Interactive Contract Playground',
    category: 'Tools',
    path: '/playground',
    icon: <Wrench className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['playground', 'generator', 'simulator', 'builder', 'contract'],
  },
  {
    title: 'Release Changelog (GitHub Sync)',
    category: 'Ecosystem',
    path: '/docs/changelog',
    icon: <GitCommit className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />,
    keywords: ['changelog', 'releases', 'version', 'github', 'notes', 'updates'],
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
    if (path.includes('#')) {
      const [routePath, hash] = path.split('#');
      navigate(routePath);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      navigate(path);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, guides, and commands..."
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-500">
              No results found for "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.path}
                onClick={() => handleSelect(item.path)}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {item.category}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">Jump</span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>Select to jump</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
