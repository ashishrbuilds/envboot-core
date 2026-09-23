import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Callout } from '../components/Callout';
import { TableOfContents, TocItem } from '../components/TableOfContents';
import { Seo } from '../components/Seo';
import { 
  Copy, 
  Check, 
  ChevronDown, 
  Bot, 
  Cpu, 
  Layers,
  Scale,
  CheckCircle2,
  XCircle,
  Minus
} from 'lucide-react';

const TOC_ITEMS: TocItem[] = [
  { id: 'what-is-envboot', label: 'What is EnvBoot' },
  { id: 'core-concepts', label: 'Architecture & Modules', level: 3 },
  { id: 'comparisons', label: 'Comparisons' },
  { id: 'installation', label: 'Automatic Installation' },
  { id: 'contract-file', label: 'Contract Schema (.envboot.json)' },
  { id: 'guard-injection', label: 'Startup Guard Injection' },
  { id: 'fail-fast', label: 'Fail-Fast package.json Scripts' },
  { id: 'env-loader', label: 'Cascading .env Loader' },
];

export const QuickstartPage: React.FC = () => {
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedAi, setCopiedAi] = useState(false);

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(
      `# Quick Start: EnvBoot\n\nRun \`npx envboot@latest init\` to set up zero-runtime-dependency environment validation.`
    );
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyAiInstructions = async () => {
    const prompt = `Use envboot for environment variable contracts and validation:
1. Run "npx envboot@latest init" to scan the AST and generate .envboot.json.
2. In the application entrypoint, place "import envboot from 'envboot'; envboot.init();" at the very top.
3. In client apps (Vite/React), use "import envboot from 'envboot/browser';".
4. Add "envboot check" to CI/CD workflows and package.json dev/build scripts.`;
    await navigator.clipboard.writeText(prompt);
    setCopiedAi(true);
    setTimeout(() => setCopiedAi(false), 2000);
  };

  return (
    <div className="flex gap-10 xl:gap-14 items-start w-full">
      <Seo
        title="Quick Start & Installation — EnvBoot Documentation"
        description="Get started with EnvBoot in seconds. Scan your codebase with npx envboot init, generate .envboot.json contracts, and inject startup guards."
        keywords={[
          'envboot quickstart',
          'envboot init',
          'environment contract',
          'startup guard injection',
          'dotenv comparison',
          'zero dependency env',
          'install envboot',
        ]}
        canonicalPath="/docs/quickstart"
        type="article"
      />
      <div className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl space-y-12">
        
        {/* Fumadocs Header */}
        <header className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Quick Start
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-normal">
              Getting Started with EnvBoot
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
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

        {/* Using an AI agent Card */}
        <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800/90 dark:bg-zinc-900/30 space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-200 font-bold text-sm">
            <Bot className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            <span>Using an AI agent?</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Copy the setup instructions into your agent (Claude Code, Cursor, Codex, etc.), it will follow the recommended way to set up envboot across your project.
          </p>
          <button
            onClick={handleCopyAiInstructions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 dark:text-zinc-200 dark:border-zinc-700/80 text-xs font-semibold transition-colors shadow-sm"
          >
            {copiedAi ? <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" /> : <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
            <span>{copiedAi ? 'Copied to Clipboard' : 'Copy Instructions'}</span>
          </button>
        </div>

        {/* What is EnvBoot Section (also aliased with id="introduction") */}
        <section id="what-is-envboot" className="space-y-4 scroll-mt-12">
          <span id="introduction" className="block -mt-12 pt-12" aria-hidden="true" />
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">What is EnvBoot</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <strong className="text-zinc-950 dark:text-white font-semibold">EnvBoot</strong> is a zero-runtime-dependency environment contract and validation tool, designed to be fast, flexible, and completely unbloated for modern JavaScript and TypeScript applications. It consists of multiple layers:
          </p>

          {/* 2-Column Cards matching Fumadocs */}
          <div id="core-concepts" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl border border-zinc-200 bg-zinc-50/70 dark:border-zinc-800/80 dark:bg-zinc-900/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-100">EnvBoot Core</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Zero-runtime-dependency validator that aborts application startup before invalid state or missing credentials execute.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 bg-zinc-50/70 dark:border-zinc-800/80 dark:bg-zinc-900/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-100">EnvBoot CLI</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Automated AST scanner, contract synchronizer (<code className="font-mono text-zinc-800 dark:text-zinc-200">sync</code>), and health diagnostics (<code className="font-mono text-zinc-800 dark:text-zinc-200">doctor</code>).
              </p>
            </div>
          </div>
        </section>

        {/* Comparisons Section */}
        <section id="comparisons" className="space-y-4 scroll-mt-12">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Comparisons</h2>
          </div>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            How EnvBoot compares to traditional environment variable loaders and schema validation libraries:
          </p>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/60">
            <table className="w-full min-w-[580px] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 font-bold text-zinc-950 dark:text-white">EnvBoot</th>
                  <th className="py-3 px-4 text-zinc-500">dotenv</th>
                  <th className="py-3 px-4 text-zinc-500">Zod / t3-env</th>
                  <th className="py-3 px-4 text-zinc-500">Envalid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-xs">
                <tr>
                  <td className="py-3 px-4 font-medium">Runtime Bundle Overhead</td>
                  <td className="py-3 px-4 font-bold text-zinc-950 dark:text-white">0 dependencies (0 kB)</td>
                  <td className="py-3 px-4 text-zinc-500">~15 kB</td>
                  <td className="py-3 px-4 text-zinc-500">~55 kB (Zod core)</td>
                  <td className="py-3 px-4 text-zinc-500">~22 kB</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Automated AST Code Scanner</td>
                  <td className="py-3 px-4"><CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white inline" /> Yes (AST init)</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Auto-generated Contract (.envboot.json)</td>
                  <td className="py-3 px-4"><CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white inline" /> Yes</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                  <td className="py-3 px-4 text-zinc-500"><Minus className="w-4 h-4 inline opacity-40" /> Manual TS Schema</td>
                  <td className="py-3 px-4 text-zinc-500"><Minus className="w-4 h-4 inline opacity-40" /> Manual TS Schema</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">CI/CD Drift & Stale Detection</td>
                  <td className="py-3 px-4"><CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white inline" /> Yes (envboot check)</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Contract Auto-Sync (envboot sync)</td>
                  <td className="py-3 px-4"><CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white inline" /> Yes</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Project Health Doctor (envboot doctor)</td>
                  <td className="py-3 px-4"><CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white inline" /> Yes</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                  <td className="py-3 px-4 text-zinc-500"><XCircle className="w-4 h-4 inline opacity-40" /> No</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Multi-Runtime (Node, Bun, Deno, Browser)</td>
                  <td className="py-3 px-4"><CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white inline" /> First-class</td>
                  <td className="py-3 px-4 text-zinc-500">Node only</td>
                  <td className="py-3 px-4 text-zinc-500">Node / Bundler</td>
                  <td className="py-3 px-4 text-zinc-500">Node only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Automatic Installation */}
        <section id="installation" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Automatic Installation</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Run the initialization command from your repository root. EnvBoot automatically parses your code, classifies variables, creates <code className="font-mono text-zinc-800 dark:text-zinc-200">.envboot.json</code>, and injects the guard:
          </p>

          <CodeBlock
            pmCommands={{
              npm: 'npx envboot@latest init',
              pnpm: 'pnpm dlx envboot@latest init',
              yarn: 'yarn dlx envboot@latest init',
              bun: 'bunx envboot@latest init',
              deno: 'deno run -A npm:envboot@latest init',
            }}
          />

          <Callout type="tip" title="Non-Interactive CI Mode">
            Add <code className="font-mono font-semibold text-zinc-950 dark:text-white">--yes</code> (or <code className="font-mono font-semibold text-zinc-950 dark:text-white">-y</code>) to accept all detected variables non-interactively without prompt confirmation:
            <code className="block mt-1 font-mono text-xs bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
              npx envboot@latest init --yes
            </code>
          </Callout>
        </section>

        {/* Contract File */}
        <section id="contract-file" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Contract Schema (.envboot.json)</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            EnvBoot generates a lightweight, version-controlled JSON contract in your project root:
          </p>

          <CodeBlock
            language="json"
            filename=".envboot.json"
            code={`{
  "required": [
    "DATABASE_URL",
    "API_SECRET_KEY"
  ],
  "optional": [
    "REDIS_URL",
    "ANALYTICS_KEY"
  ],
  "ignore": [
    "NODE_ENV",
    "TZ"
  ]
}`}
          />
        </section>

        {/* Startup Guard Injection */}
        <section id="guard-injection" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Startup Guard Injection</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Place the guard at the top of your detected entrypoint. You continue writing standard native code without custom wrappers:
          </p>

          <CodeBlock
            tabs={[
              {
                title: 'Backend (Node / Express / Bun)',
                filename: 'src/server.ts',
                language: 'typescript',
                code: `import envboot from "envboot";

// Halts execution immediately if required variables are missing
envboot.init();

// Continue writing standard native code:
import express from "express";

const app = express();
const dbUrl = process.env.DATABASE_URL; // Guaranteed present!`,
              },
              {
                title: 'Frontend (Vite / React)',
                filename: 'src/main.tsx',
                language: 'tsx',
                code: `import envboot from "envboot/browser";
import config from "../.envboot.json";

// Throws fatal error overlay before React mounts
envboot.init({
  config,
  env: import.meta.env,
  exitOnError: true,
});

import React from "react";
import ReactDOM from "react-dom/client";`,
              },
            ]}
          />
        </section>

        {/* Fail-Fast Scripts */}
        <section id="fail-fast" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Fail-Fast package.json Scripts</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Prepend <code className="font-mono text-zinc-900 dark:text-zinc-100 font-medium">envboot check</code> to your development and build scripts to block dev servers from booting when variables are incomplete:
          </p>

          <CodeBlock
            language="json"
            filename="package.json"
            code={`{
  "scripts": {
    "dev": "envboot check && vite",
    "build": "envboot check && tsc -b && vite build"
  }
}`}
          />
        </section>

        {/* Cascading Loader */}
        <section id="env-loader" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Cascading .env Loader</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            EnvBoot includes a zero-runtime-dependency cascading loader that mirrors framework precedence:
          </p>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 font-mono text-xs space-y-2 text-zinc-700 dark:text-zinc-300">
            <div className="font-bold text-zinc-950 dark:text-white text-sm font-sans">Precedence Order:</div>
            <ol className="list-decimal pl-5 space-y-1">
              <li><span className="text-zinc-950 dark:text-white font-semibold">System Environment</span> (process.env, Docker, Kubernetes)</li>
              <li><span className="text-zinc-700 dark:text-zinc-300">.env.[mode].local</span> (e.g. .env.development.local)</li>
              <li><span className="text-zinc-700 dark:text-zinc-300">.env.[mode]</span> (based on NODE_ENV)</li>
              <li><span className="text-zinc-700 dark:text-zinc-300">.env.local</span></li>
              <li><span className="text-zinc-700 dark:text-zinc-300">.env</span></li>
            </ol>
          </div>
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
