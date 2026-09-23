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
      <div className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl space-y-10">
        
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-slate-300 font-medium">CLI Reference</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              CLI Commands Reference
            </h1>
            <p className="text-base text-slate-400 font-normal">
              Complete command-line interface reference for EnvBoot v0.1.7.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedMd ? 'Copied' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={() => {}}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
            >
              <span>Open</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </header>

        {/* Command Matrix Table */}
        <section id="command-table" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">Command Matrix</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#070a12]">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                  <th className="py-3 px-4 font-semibold">Command</th>
                  <th className="py-3 px-4 font-semibold">Flags</th>
                  <th className="py-3 px-4 font-semibold font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3 px-4 text-emerald-400 font-bold">envboot init</td>
                  <td className="py-3 px-4 text-slate-400">-y, --yes<br/>--skip-install</td>
                  <td className="py-3 px-4 font-sans text-xs">Scans codebase AST, creates contract, injects guard, installs pkg</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-emerald-400 font-bold">envboot check</td>
                  <td className="py-3 px-4 text-slate-400">--strict<br/>-c, --config &lt;path&gt;</td>
                  <td className="py-3 px-4 font-sans text-xs">Validates active env against contract and flags undocumented source drift</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-emerald-400 font-bold">envboot doctor</td>
                  <td className="py-3 px-4 text-slate-400">-c, --config &lt;path&gt;</td>
                  <td className="py-3 px-4 font-sans text-xs">End-to-end diagnostics of project framework, package manager & contract health</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-emerald-400 font-bold">envboot sync</td>
                  <td className="py-3 px-4 text-slate-400">-y, --yes<br/>--prune<br/>-c, --config &lt;path&gt;</td>
                  <td className="py-3 px-4 font-sans text-xs">Scans for new variables, updates .envboot.json, regenerates .env.example</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* envboot init */}
        <section id="init" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Terminal className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">envboot init</h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Scans the project with an AST parser to extract all environment variable references (<code className="font-mono text-cyan-300">process.env</code>, <code className="font-mono text-cyan-300">Bun.env</code>, <code className="font-mono text-cyan-300">Deno.env</code>, and <code className="font-mono text-cyan-300">import.meta.env</code>). Interactively prompts you to classify them as Required or Optional, generates <code className="font-mono text-emerald-400">.envboot.json</code>, injects the guard into your entrypoint, and adds the dependency.
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
        <section id="check" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">envboot check</h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Validates that the active execution environment satisfies the contract defined in <code className="font-mono text-emerald-400">.envboot.json</code>. 
            Also performs drift analysis to warn if variables are used in code but missing from the contract, or if variables in templates are obsolete.
          </p>

          <CodeBlock
            language="bash"
            code={`# Standard check (exits with code 1 if required variables are missing)
npx envboot@latest check

# Strict mode: fails build with exit code 1 if ANY undocumented drift exists
npx envboot@latest check --strict

# Custom contract location
npx envboot@latest check -c config/env.contract.json`}
          />

          <Callout type="note" title="Sample CI Output">
            <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
{`EnvBoot Check

Required
────────────────────────────────────────
  ✓ DATABASE_URL
  ✓ API_URL
  ✗ JWT_SECRET

Optional
────────────────────────────────────────
  ✓ REDIS_URL
  ○ SENTRY_DSN

Source analysis
────────────────────────────────────────
  ⚠ STRIPE_SECRET_KEY
    Used in source (src/billing.ts) but missing from .envboot.json

────────────────────────────────────────
Result: FAILED
Error: Missing 1 required environment variable(s).`}
            </pre>
          </Callout>
        </section>

        {/* envboot doctor */}
        <section id="doctor" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Activity className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">envboot doctor</h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Performs an end-to-end diagnostic of your environment setup, framework detection, entrypoint injection, package manager, and contract synchronization.
          </p>

          <CodeBlock
            language="bash"
            code={`# Run health diagnostics
npx envboot@latest doctor

# Custom contract path
npx envboot@latest doctor -c custom/.envboot.json`}
          />
        </section>

        {/* envboot sync */}
        <section id="sync" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">envboot sync</h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Keeps your contract in sync as your codebase evolves. When you introduce new environment variables into your source code, <code className="font-mono text-emerald-400">envboot sync</code> automatically detects them, adds them to <code className="font-mono text-emerald-400">.envboot.json</code>, and refreshes <code className="font-mono text-slate-300">.env.example</code>.
          </p>

          <CodeBlock
            language="bash"
            code={`# Interactive sync
npx envboot@latest sync

# Automated sync for CI / Pre-commit hooks
npx envboot@latest sync --yes

# Automatically prune variables deleted from the codebase
npx envboot@latest sync --yes --prune`}
          />
        </section>

        {/* Exit codes */}
        <section id="exit-codes" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">Exit Codes & Automation</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            EnvBoot follows standard UNIX process exit codes, making it simple to chain in scripts or CI:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
              <div className="font-mono text-xs font-bold text-emerald-400">Exit Code 0 (Success)</div>
              <div className="text-xs text-slate-400">
                All required variables present. No blocking drift detected. Process continues.
              </div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
              <div className="font-mono text-xs font-bold text-rose-400">Exit Code 1 (Failure)</div>
              <div className="text-xs text-slate-400">
                One or more required variables missing, or strict mode failed on code drift.
              </div>
            </div>
          </div>
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
