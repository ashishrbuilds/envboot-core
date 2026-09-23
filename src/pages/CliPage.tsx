import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Callout } from '../components/Callout';
import { TableOfContents, TocItem } from '../components/TableOfContents';
import { 
  ChevronRight, 
  Copy, 
  Check, 
  ChevronDown, 
  Terminal, 
  CheckCircle2, 
  RefreshCw, 
  Activity 
} from 'lucide-react';

const TOC_ITEMS: TocItem[] = [
  { id: 'command-table', label: 'Command Matrix' },
  { id: 'init', label: 'envboot init' },
  { id: 'check', label: 'envboot check' },
  { id: 'doctor', label: 'envboot doctor' },
  { id: 'sync', label: 'envboot sync' },
  { id: 'exit-codes', label: 'Exit Codes & Automation' },
];

export const CliPage: React.FC = () => {
  const [copiedMd, setCopiedMd] = useState(false);

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(
      `# EnvBoot CLI Reference\n\n- init: Scan AST & initialize guard\n- check: CI validation & drift protection\n- doctor: Diagnostic health check\n- sync: Synchronize .envboot.json`
    );
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="flex gap-10 xl:gap-14 items-start w-full">
      <div className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl space-y-12">
        
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
            <span className="text-zinc-900 dark:text-zinc-300 font-medium">CLI Reference</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              CLI Commands Reference
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-normal">
              Complete command-line interface reference for EnvBoot v0.1.7.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-800 text-xs font-medium transition-colors"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" /> : <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
              <span>{copiedMd ? 'Copied' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={() => {}}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-800 text-xs font-medium transition-colors"
            >
              <span>Open</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </div>
        </header>

        {/* Command Matrix Table */}
        <section id="command-table" className="space-y-4 scroll-mt-12">
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Command Matrix</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300">
                  <th className="py-3 px-4 font-semibold">Command</th>
                  <th className="py-3 px-4 font-semibold">Flags</th>
                  <th className="py-3 px-4 font-semibold font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                <tr>
                  <td className="py-3 px-4 font-bold text-zinc-950 dark:text-white">envboot init</td>
                  <td className="py-3 px-4 text-zinc-500">-y, --yes<br/>--skip-install</td>
                  <td className="py-3 px-4 font-sans text-xs">Scans codebase AST, creates contract, injects guard, installs pkg</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-zinc-950 dark:text-white">envboot check</td>
                  <td className="py-3 px-4 text-zinc-500">--strict<br/>-c, --config &lt;path&gt;</td>
                  <td className="py-3 px-4 font-sans text-xs">Validates active env against contract and flags undocumented source drift</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-zinc-950 dark:text-white">envboot doctor</td>
                  <td className="py-3 px-4 text-zinc-500">-c, --config &lt;path&gt;</td>
                  <td className="py-3 px-4 font-sans text-xs">End-to-end diagnostics of project framework, package manager & contract health</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-zinc-950 dark:text-white">envboot sync</td>
                  <td className="py-3 px-4 text-zinc-500">-y, --yes<br/>--prune<br/>-c, --config &lt;path&gt;</td>
                  <td className="py-3 px-4 font-sans text-xs">Scans for new variables, updates .envboot.json, regenerates .env.example</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* envboot init */}
        <section id="init" className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-4 scroll-mt-12">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
              <Terminal className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white">envboot init</h2>
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Scans the project with an AST parser to extract all environment variable references (<code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">process.env</code>, <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">Bun.env</code>, <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">Deno.env</code>, and <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">import.meta.env</code>). Interactively prompts you to classify them as Required or Optional, generates <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">.envboot.json</code>, injects the guard into your entrypoint, and adds the dependency.
          </p>

          <CodeBlock
            language="bash"
            code={`# Interactive initialization
npx envboot@latest init

# Non-interactive / Accept all defaults
npx envboot@latest init --yes

# Skip automatic package installation
npx envboot@latest init --skip-install`}
          />
        </section>

        {/* envboot check */}
        <section id="check" className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-4 scroll-mt-12">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white">envboot check</h2>
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Validates that the active execution environment satisfies the contract defined in <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">.envboot.json</code>. 
            Also performs drift analysis to warn if variables are used in code but missing from the contract, or if variables in templates are obsolete.
          </p>

          <CodeBlock
            language="bash"
            code={`# Standard check
npx envboot@latest check

# Strict mode: treats undocumented code variables as fatal errors
npx envboot@latest check --strict

# Custom config location
npx envboot@latest check --config ./config/.envboot.json`}
          />

          <Callout type="warning" title="Strict Mode in CI">
            In CI/CD environments, always run with <code className="font-mono font-semibold text-zinc-950 dark:text-white">--strict</code>. This prevents engineers from referencing new variables in code without declaring them in the version-controlled contract.
          </Callout>

          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">Simulated Terminal Output</div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/90 dark:bg-[#08080a] font-mono text-xs text-zinc-800 dark:text-zinc-300 leading-relaxed overflow-x-auto">
              <div className="text-zinc-500">$ npx envboot@latest check</div>
              <div className="mt-2 text-zinc-950 dark:text-white font-bold">EnvBoot v0.1.7 — Contract Verification</div>
              <div className="mt-1 text-zinc-600 dark:text-zinc-400">Loading contract from .envboot.json...</div>
              <div className="text-zinc-700 dark:text-zinc-300">✔ DATABASE_URL is set</div>
              <div className="text-zinc-700 dark:text-zinc-300">✔ API_KEY is set</div>
              <div className="text-zinc-950 dark:text-white font-bold">✖ SENTRY_DSN is MISSING (required)</div>
              <div className="mt-2 text-zinc-950 dark:text-white font-semibold">Error: Missing 1 required environment variable(s).</div>
            </div>
          </div>
        </section>

        {/* envboot doctor */}
        <section id="doctor" className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-4 scroll-mt-12">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
              <Activity className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white">envboot doctor</h2>
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Performs an end-to-end diagnostic of your environment setup, framework detection, entrypoint injection, package manager, and contract synchronization.
          </p>

          <CodeBlock
            language="bash"
            code={`# Run health diagnostic
npx envboot@latest doctor

# Custom config path
npx envboot@latest doctor -c custom/.envboot.json`}
          />
        </section>

        {/* envboot sync */}
        <section id="sync" className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-4 scroll-mt-12">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white">envboot sync</h2>
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Keeps your contract in sync as your codebase evolves. When you introduce new environment variables into your source code, <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">envboot sync</code> automatically detects them, adds them to <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">.envboot.json</code>, and refreshes <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">.env.example</code>.
          </p>

          <CodeBlock
            language="bash"
            code={`# Synchronize contract with latest code references
npx envboot@latest sync

# Prune obsolete variables no longer present in AST
npx envboot@latest sync --prune

# Non-interactive sync in automation scripts
npx envboot@latest sync --yes --prune`}
          />
        </section>

        {/* Exit codes */}
        <section id="exit-codes" className="space-y-4 scroll-mt-12">
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Exit Codes & Automation</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            EnvBoot follows standard UNIX process exit codes, making it simple to chain in scripts or CI:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-1">
              <div className="font-mono font-bold text-zinc-950 dark:text-white text-sm">Exit 0: Success</div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                All required variables are present and validation criteria are satisfied. Execution continues safely.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-1">
              <div className="font-mono font-bold text-zinc-950 dark:text-white text-sm">Exit 1: Contract Violation</div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                One or more required variables are missing, or strict-mode code drift was detected. Process halts immediately.
              </p>
            </div>
          </div>
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
