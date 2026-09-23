import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { TableOfContents, TocItem } from '../components/TableOfContents';
import { 
  ShieldCheck, 
  AlertOctagon, 
  ChevronRight, 
  Copy, 
  Check, 
  ChevronDown 
} from 'lucide-react';

const TOC_ITEMS: TocItem[] = [
  { id: 'github-actions', label: 'GitHub Actions Recipe' },
  { id: 'drift-detection', label: 'Drift & Stale Variable Detection' },
  { id: 'strict-mode', label: 'Strict Mode Enforcement' },
  { id: 'secret-shield', label: 'Secret Shield Guarantee' },
];

export const CiCdPage: React.FC = () => {
  const [copiedMd, setCopiedMd] = useState(false);

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(
      `# CI/CD Guard & Secret Shield: EnvBoot\n\nRun \`npx envboot@latest check --strict\` in GitHub Actions to prevent environment drift.`
    );
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="flex gap-10 xl:gap-14 items-start w-full">
      <div className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl space-y-10">
        
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
            <span className="text-zinc-900 dark:text-zinc-300 font-medium">CI/CD & Security</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              CI/CD Guard & Secret Shield
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-normal">
              Continuous contract verification, code drift prevention, and zero credential leakage guarantees.
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

        {/* GitHub Actions */}
        <section id="github-actions" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">GitHub Actions Recipe</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Run <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded font-medium">envboot check --strict</code> during PR validation to reject commits containing undocumented environment variables:
          </p>

          <CodeBlock
            language="yaml"
            filename=".github/workflows/ci.yml"
            code={`name: CI & Environment Drift Guard

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  env-check:
    name: Verify EnvBoot Contract
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Run EnvBoot Strict Check
        run: npx envboot@latest check --strict
        env:
          # Inject mock/CI environment variables to satisfy required keys:
          DATABASE_URL: \${{ secrets.CI_DATABASE_URL }}
          API_KEY: \${{ secrets.CI_API_KEY }}`}
          />
        </section>

        {/* Drift Detection */}
        <section id="drift-detection" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Drift & Stale Variable Detection</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            As developers merge pull requests, they often reference new variables like <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">process.env.NEW_FEATURE_FLAG</code> without telling DevOps or adding them to <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">.envboot.json</code>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-2">
              <div className="flex items-center gap-2 text-zinc-950 dark:text-white font-bold text-sm">
                <AlertOctagon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <span>Undocumented Variable Drift</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                AST analysis detects variable calls in code that were never documented in the schema. In strict mode, CI fails before deployment.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-2">
              <div className="flex items-center gap-2 text-zinc-950 dark:text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <span>Obsolete Contract Cleanup</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                When code references are deleted, <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">envboot sync --prune</code> removes them from the schema, ensuring developers never maintain dead keys.
              </p>
            </div>
          </div>
        </section>

        {/* Strict Mode */}
        <section id="strict-mode" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Strict Mode Enforcement</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            By default, <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">envboot check</code> prints non-blocking warnings if it discovers undocumented variables in source files. With <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded font-bold">--strict</code>, any undocumented source reference triggers an immediate exit code 1.
          </p>

          <CodeBlock
            language="bash"
            code={`# Strict exit on code drift:
npx envboot@latest check --strict`}
          />
        </section>

        {/* Secret Shield */}
        <section id="secret-shield" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Secret Shield Guarantee</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Security audits frequently find that environment validator tools accidentally dump production credentials into log files when validations fail. EnvBoot guarantees:
          </p>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <span>Zero-Leakage Principle</span>
            </div>
            <p className="leading-relaxed">
              EnvBoot only ever logs variable <strong>names</strong> (e.g., <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">DATABASE_URL</code>). Variable <strong>values</strong> are never printed to stdout, stderr, or log streams, making it safe for publicly accessible CI logs.
            </p>
          </div>
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
