import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AskAiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QAPair {
  q: string;
  a: string;
  link?: string;
  linkLabel?: string;
}

const KNOWLEDGE_BASE: QAPair[] = [
  {
    q: 'How do I initialize EnvBoot in a project?',
    a: 'Run `npx envboot@latest init` (or with `-y` for non-interactive mode). EnvBoot scans your codebase with an AST parser, identifies all environment variables, creates `.envboot.json`, and injects the runtime guard at the top of your entrypoint.',
    link: '/docs/quickstart#installation',
    linkLabel: 'View Quickstart Installation',
  },
  {
    q: 'How do I validate environment variables in CI/CD?',
    a: 'Add `npx envboot@latest check --strict` to your GitHub Actions or CI pipeline. If any required variable is missing or code drift is detected, EnvBoot exits with code 1 and lists missing variables without ever exposing secret values.',
    link: '/docs/ci-cd#github-actions',
    linkLabel: 'View CI/CD Guide',
  },
  {
    q: 'How do I use EnvBoot in Next.js (App Router)?',
    a: 'Add `import envboot from "envboot"; envboot.init();` at the very top of `src/app/layout.tsx`. If environment validation fails, the server fails fast before rendering any components or executing database queries.',
    link: '/docs/frameworks#nextjs',
    linkLabel: 'View Next.js Recipe',
  },
  {
    q: 'How do I configure optional variables in .envboot.json?',
    a: 'In `.envboot.json`, place optional keys inside the `"optional": ["REDIS_URL", "SENTRY_DSN"]` array. EnvBoot warns if they are missing in development but will not abort the process.',
    link: '/docs/quickstart#contract-file',
    linkLabel: 'View Contract Schema',
  },
  {
    q: 'How do I run diagnostic health checks?',
    a: 'Run `npx envboot@latest doctor`. It runs comprehensive diagnostics verifying framework detection, AST parity, package manager, and contract health.',
    link: '/docs/cli#doctor',
    linkLabel: 'View CLI Doctor',
  },
];

export const AskAiModal: React.FC<AskAiModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<QAPair | null>(null);

  if (!isOpen) return null;

  const handleSelectPredefined = (item: QAPair) => {
    setQuery(item.q);
    setAnswer(item);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const lower = query.toLowerCase();
    const matched = KNOWLEDGE_BASE.find(
      (k) =>
        k.q.toLowerCase().includes(lower) ||
        lower.split(' ').some((word) => word.length > 3 && k.q.toLowerCase().includes(word))
    );

    if (matched) {
      setAnswer(matched);
    } else {
      setAnswer({
        q: query,
        a: `EnvBoot validates environment variables with zero runtime dependencies. For CLI usage run \`npx envboot@latest --help\`, or explore the documentation for framework recipes, CI/CD drift protection, and contract schema rules.`,
        link: '/docs/quickstart',
        linkLabel: 'Explore Quickstart Documentation',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b101b] border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">Ask EnvBoot AI</h2>
              <p className="text-[11px] text-slate-400">Instant answers from official documentation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Pre-suggested questions */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Suggested Questions</span>
            </div>
            <div className="space-y-1.5">
              {KNOWLEDGE_BASE.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPredefined(item)}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{item.q}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Answer Area */}
          {answer && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/20 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <Bot className="w-3.5 h-3.5" />
                <span>Answer</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">{answer.a}</p>
              {answer.link && (
                <button
                  onClick={() => {
                    navigate(answer.link!);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium pt-1"
                >
                  <span>{answer.linkLabel || 'Learn more in documentation'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Query Input Footer */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-[#070a12] flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about EnvBoot..."
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/70"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3 h-3" />
            <span>Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
};
