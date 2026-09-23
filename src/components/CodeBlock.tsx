import React, { useState } from 'react';
import { Check, Copy, FileCode, Terminal } from 'lucide-react';
import { usePackageManager, PackageManager } from '../context/PackageManagerContext';

export interface CodeTab {
  title: string;
  code: string;
  language?: string;
  filename?: string;
}

interface CodeBlockProps {
  code?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  tabs?: CodeTab[];
  pmCommands?: {
    npm: string;
    pnpm: string;
    yarn: string;
    bun: string;
    deno: string;
  };
}

function highlightLine(line: string) {
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
    return <span className="text-zinc-400 dark:text-zinc-500 italic">{line}</span>;
  }

  // Tokenize line using regex
  const regex = /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:import|from|export|default|function|return|const|let|var|await|async|if|else|type|interface|class|new|true|false|null|undefined)\b|\b(?:React|ReactDOM|Response|RootLayout|AppModule|NestFactory|NextConfig|process|Bun|Deno|console|envboot|config)\b|[{}()[\].,;:])/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('//')) {
      parts.push(<span key={match.index} className="text-zinc-400 dark:text-zinc-500 italic">{token}</span>);
    } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
      parts.push(<span key={match.index} className="text-zinc-700 dark:text-zinc-300 font-normal">{token}</span>);
    } else if (
      ['import', 'from', 'export', 'default', 'function', 'return', 'const', 'let', 'var', 'await', 'async', 'if', 'else', 'type', 'interface', 'class', 'new'].includes(token)
    ) {
      parts.push(<span key={match.index} className="text-zinc-950 dark:text-white font-semibold">{token}</span>);
    } else if (['true', 'false', 'null', 'undefined'].includes(token)) {
      parts.push(<span key={match.index} className="text-zinc-800 dark:text-zinc-200 font-semibold">{token}</span>);
    } else if (['React', 'ReactDOM', 'Response', 'RootLayout', 'AppModule', 'NestFactory', 'NextConfig'].includes(token)) {
      parts.push(<span key={match.index} className="text-zinc-900 dark:text-zinc-100 font-medium">{token}</span>);
    } else if (['process', 'Bun', 'Deno', 'console', 'envboot', 'config'].includes(token)) {
      parts.push(<span key={match.index} className="text-zinc-950 dark:text-white font-semibold">{token}</span>);
    } else {
      parts.push(<span key={match.index} className="text-zinc-500 dark:text-zinc-400">{token}</span>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts.length > 0 ? parts : ' ';
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code = '',
  language = 'typescript',
  filename,
  showLineNumbers = true,
  tabs,
  pmCommands,
}) => {
  const { packageManager, setPackageManager } = usePackageManager();
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Determine active code & filename
  let activeCode = code;
  let activeFilename = filename;
  let activeLang = language;

  if (pmCommands) {
    activeCode = pmCommands[packageManager];
    activeLang = 'bash';
  } else if (tabs && tabs.length > 0) {
    const currentTab = tabs[activeTabIdx] || tabs[0];
    activeCode = currentTab.code;
    activeFilename = currentTab.filename || currentTab.title;
    activeLang = currentTab.language || language;
  }

  const handleCopy = async () => {
    if (!activeCode) return;
    await navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = activeCode.trim().split('\n');

  return (
    <div className="my-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 sm:px-3.5 py-1.5 sm:py-2 bg-zinc-100 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 gap-2">
        {/* Left: Tabs or Filename */}
        {pmCommands ? (
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 min-w-0">
            <Terminal className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 mr-1 shrink-0 hidden xs:inline-block" />
            {(['npm', 'pnpm', 'yarn', 'bun', 'deno'] as PackageManager[]).map((pm) => (
              <button
                key={pm}
                onClick={() => setPackageManager(pm)}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-mono font-medium rounded-md transition-colors shrink-0 ${
                  packageManager === pm
                    ? 'bg-zinc-200 text-zinc-950 dark:bg-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-700 font-semibold shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        ) : tabs && tabs.length > 0 ? (
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 min-w-0">
            {tabs.map((tab, idx) => (
              <button
                key={tab.title}
                onClick={() => setActiveTabIdx(idx)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  activeTabIdx === idx
                    ? 'bg-zinc-200 text-zinc-950 dark:bg-zinc-800 dark:text-white font-semibold border border-zinc-300 dark:border-zinc-700 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <span>{tab.title}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-0 truncate">
            <FileCode className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
            {activeFilename ? (
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 font-medium truncate">
                {activeFilename}
              </span>
            ) : (
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium">
                {activeLang}
              </span>
            )}
          </div>
        )}

        {/* Right: Copy Button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shrink-0 ml-1"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
              <span className="text-zinc-900 dark:text-white font-medium hidden xs:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code with Line Numbers and Highlighting */}
      <div className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-zinc-800 dark:text-zinc-200">
        <div className="table w-full">
          {lines.map((line, idx) => (
            <div key={idx} className="table-row hover:bg-zinc-100/50 dark:hover:bg-zinc-900/30 transition-colors">
              {showLineNumbers && !pmCommands && (
                <span className="table-cell pr-4 select-none text-zinc-400 dark:text-zinc-600 text-right w-8 font-mono text-xs">
                  {idx + 1}
                </span>
              )}
              {pmCommands && (
                <span className="table-cell pr-3 select-none text-zinc-500 dark:text-zinc-400 font-bold w-4">
                  $
                </span>
              )}
              <span className="table-cell whitespace-pre">
                {highlightLine(line)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
