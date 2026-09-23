import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { usePackageManager, PackageManager } from '../context/PackageManagerContext';

interface CodeBlockProps {
  code?: string;
  language?: string;
  filename?: string;
  // Multi package manager variant
  pmCommands?: {
    npm: string;
    pnpm: string;
    yarn: string;
    bun: string;
    deno: string;
  };
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  filename,
  pmCommands,
}) => {
  const { packageManager, setPackageManager } = usePackageManager();
  const [copied, setCopied] = useState(false);

  const activeCode = pmCommands ? pmCommands[packageManager] : code || '';

  const handleCopy = async () => {
    if (!activeCode) return;
    await navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-950 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-900 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-800">
        {pmCommands ? (
          <div className="flex items-center gap-1">
            {(['npm', 'pnpm', 'yarn', 'bun', 'deno'] as PackageManager[]).map((pm) => (
              <button
                key={pm}
                onClick={() => setPackageManager(pm)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors ${
                  packageManager === pm
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            </div>
            {filename && (
              <span className="text-xs font-mono text-slate-300 font-medium">
                {filename}
              </span>
            )}
            {!filename && language && (
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-medium">
                {language}
              </span>
            )}
          </div>
        )}

        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code contents */}
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-200 selection:bg-emerald-500/30">
        <code>{activeCode}</code>
      </pre>
    </div>
  );
};
