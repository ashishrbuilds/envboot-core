import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  ArrowRight, 
  Cpu, 
  RefreshCw, 
  Lock, 
  Zap, 
  FileCode,
  Layers,
  Sparkles
} from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { TerminalSimulator } from '../components/TerminalSimulator';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.1]">
            Zero-Runtime-Dependency Environment Contract & Validation
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-normal">
            Catch missing environment variables before your server starts or client mounts. 
            Automated AST detection, CI drift protection, and zero runtime bloat for JavaScript & TypeScript.
          </p>
        </div>

        {/* Quick Install Multi-Package Manager */}
        <div className="max-w-xl mx-auto">
          <CodeBlock
            pmCommands={{
              npm: 'npx envboot@latest init',
              pnpm: 'pnpm dlx envboot@latest init',
              yarn: 'yarn dlx envboot@latest init',
              bun: 'bunx envboot@latest init',
              deno: 'deno run -A npm:envboot@latest init',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/docs/quickstart"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/playground"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Try Playground
          </Link>
          <Link
            to="/docs/cli"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800 font-semibold text-sm transition-all"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            CLI Reference
          </Link>
        </div>
      </section>

      {/* Interactive Terminal Demo */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-white dark:text-white light:text-slate-900">
              Interactive Terminal Simulator
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Explore authentic CLI commands, real diagnostic output, and failure simulation.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 self-start sm:self-auto">
            Live preview
          </span>
        </div>

        <TerminalSimulator />
      </section>

      {/* Feature Pillars */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-white dark:text-white light:text-slate-900">
            Engineered for Production Reliability
          </h2>
          <p className="text-slate-400 text-sm">
            Everything your team needs to prevent environment incidents without introducing heavy dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Zero Runtime Overhead</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Exactly <code className="text-emerald-400 font-mono">0</code> runtime dependencies. No heavy schemas, no validation library lock-in, and instant execution.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Zero Code Refactoring</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Keep writing native <code className="text-cyan-300 font-mono">process.env.KEY</code> or <code className="text-cyan-300 font-mono">import.meta.env</code> without wrapping variables in custom accessors.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Automated AST Scanner</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Parses your entire codebase to automatically discover environment variables across JavaScript, TypeScript, JSX, and TSX files.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">CI/CD Drift Protection</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Run <code className="text-amber-300 font-mono">envboot check</code> in GitHub Actions to catch undocumented environment variables before PRs merge.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Cascading .env Loader</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Built-in loader with zero external dependencies. Respects priority from system env to local overrides with full syntax support.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Secret Shield Privacy</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Strict privacy guarantee: EnvBoot never prints or leaks variable values to terminal logs or CI artifacts—only verification status.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-slate-900">
            How EnvBoot Compares
          </h2>
          <p className="text-sm text-slate-400">
            Why development teams choose EnvBoot over manual checks or heavy runtime validators.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono text-xs">
                <th className="py-3.5 px-4 font-semibold">Feature</th>
                <th className="py-3.5 px-4 font-bold text-emerald-400 bg-emerald-500/5">EnvBoot</th>
                <th className="py-3.5 px-4 font-medium">Native process.env</th>
                <th className="py-3.5 px-4 font-medium">Zod / @t3-oss/env</th>
                <th className="py-3.5 px-4 font-medium">dotenv-safe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-200">Runtime Dependencies</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">0 (Zero)</td>
                <td className="py-3 px-4 text-slate-400">0</td>
                <td className="py-3 px-4 text-rose-400">Heavy (~50kb+)</td>
                <td className="py-3 px-4 text-slate-400">3+ deps</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-200">Code Refactoring</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">None (Keep native)</td>
                <td className="py-3 px-4 text-slate-400">None</td>
                <td className="py-3 px-4 text-rose-400">Requires env.X wrappers</td>
                <td className="py-3 px-4 text-slate-400">None</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-200">Automated AST Scanner</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">Yes (Automatic)</td>
                <td className="py-3 px-4 text-slate-500">No</td>
                <td className="py-3 px-4 text-slate-500">No</td>
                <td className="py-3 px-4 text-slate-500">No</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-200">Zero-Dep .env Loader</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">Yes (Built-in)</td>
                <td className="py-3 px-4 text-slate-500">No</td>
                <td className="py-3 px-4 text-slate-500">No</td>
                <td className="py-3 px-4 text-slate-400">Requires dotenv</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-200">Browser / Vite Support</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">Yes (envboot/browser)</td>
                <td className="py-3 px-4 text-slate-500">Manual</td>
                <td className="py-3 px-4 text-amber-400">Complex setup</td>
                <td className="py-3 px-4 text-slate-500">Node only</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-200">CI Drift Detection</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">Yes (envboot check)</td>
                <td className="py-3 px-4 text-slate-500">No</td>
                <td className="py-3 px-4 text-slate-500">No</td>
                <td className="py-3 px-4 text-amber-400">Partial</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Getting Started Callout Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to guard your environment?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Initialize EnvBoot in under 30 seconds with automatic AST discovery and entrypoint injection.
            </p>
          </div>
          <Link
            to="/docs/quickstart"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-all whitespace-nowrap shadow-lg shadow-emerald-500/20"
          >
            Read the Quickstart Guide
          </Link>
        </div>
      </section>
    </div>
  );
};
