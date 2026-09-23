import React from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { TableOfContents, TocItem } from '../components/TableOfContents';
import { ShieldCheck, Lock, AlertOctagon } from 'lucide-react';

const TOC_ITEMS: TocItem[] = [
  { id: 'github-actions', label: 'GitHub Actions Recipe' },
  { id: 'drift-detection', label: 'Drift & Stale Variable Detection' },
  { id: 'strict-mode', label: 'Strict Mode Enforcement' },
  { id: 'secret-shield', label: 'Secret Shield Guarantee' },
];

export const CiCdPage: React.FC = () => {
  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 space-y-12">
        <header className="space-y-3 pb-6 border-b border-slate-800">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            CI/CD Guard & Secret Shield
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Eliminate configuration drift in continuous integration, verify pull requests, and enforce environment contracts without leaking secrets.
          </p>
        </header>

        {/* GitHub Actions */}
        <section id="github-actions" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">GitHub Actions Recipe</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Add this step to your GitHub Actions pipeline to verify your environment contract on every push and pull request:
          </p>

          <CodeBlock
            language="yaml"
            filename=".github/workflows/ci.yml"
            code={`name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate-environment:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Verify Environment Contract
        run: npx envboot@latest check --strict
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
          API_URL: \${{ secrets.API_URL }}
          JWT_SECRET: \${{ secrets.JWT_SECRET }}`}
          />
        </section>

        {/* Drift Detection */}
        <section id="drift-detection" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">Drift & Stale Variable Detection</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Codebases change rapidly. Developers often add new variables to code without updating <code className="font-mono text-emerald-400">.envboot.json</code> or <code className="font-mono text-slate-300">.env.example</code>, causing silent production crashes when deployed.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <code className="font-mono text-emerald-400">envboot check</code> automatically compares:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <AlertOctagon className="w-4 h-4" />
                <span>Undocumented Variables</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flags variables referenced in source code AST (<code className="font-mono text-slate-300">process.env.NEW_KEY</code>) that were never recorded in <code className="font-mono text-slate-300">.envboot.json</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-300 text-sm">
                <AlertOctagon className="w-4 h-4 text-slate-400" />
                <span>Stale Template Variables</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flags deprecated variables lingering in <code className="font-mono text-slate-300">.env.example</code> that are no longer referenced anywhere in your source code.
              </p>
            </div>
          </div>
        </section>

        {/* Strict Mode */}
        <section id="strict-mode" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">Strict Mode Enforcement</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            By default, missing required variables will halt CI with exit code 1, while undocumented variables in source code emit warnings.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            When you run <code className="font-mono text-emerald-400">envboot check --strict</code>, any undocumented source drift immediately fails the build with exit code 1. This guarantees that no pull request can merge with untracked environment dependencies.
          </p>
        </section>

        {/* Secret Shield */}
        <section id="secret-shield" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Secret Shield Privacy Guarantee</h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            A common danger of environment debugging tools is accidental credential leakage in public CI logs or screenshot artifacts.
          </p>

          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero-Leak Design Principle</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              EnvBoot never prints, inspects, hashes, or serializes the values of environment variables in console stdout, error messages, or JSON reports. It checks only whether a variable is set and non-empty, rendering strictly verification status symbols (<span className="text-emerald-400 font-mono">✓</span> or <span className="text-rose-400 font-mono">✗</span>).
            </p>
          </div>
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
