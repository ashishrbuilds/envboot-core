import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Callout } from '../components/Callout';
import { TableOfContents, TocItem } from '../components/TableOfContents';
import { 
  Copy, 
  Check, 
  ChevronDown, 
  Bot, 
  Cpu, 
  Layers
} from 'lucide-react';

const TOC_ITEMS: TocItem[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'core-concepts', label: 'Architecture & Modules', level: 3 },
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
      <div className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl space-y-10">
        
        {/* Fumadocs Header */}
        <header className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Quick Start
            </h1>
            <p className="text-base text-slate-400 font-normal">
              Getting Started with EnvBoot
            </p>
          </div>

          {/* Fumadocs Action Buttons Row */}
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

        {/* Fumadocs "Using an AI agent?" Prompt Card */}
        <div className="p-5 rounded-2xl border border-slate-800/90 bg-slate-900/30 space-y-3">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Using an AI agent?</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Copy the setup instructions into your agent (Claude Code, Cursor, Codex, etc.), it will follow the recommended way to set up envboot across your project.
          </p>
          <button
            onClick={handleCopyAiInstructions}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-colors"
          >
            {copiedAi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedAi ? 'Copied to Clipboard' : 'Copy Instructions'}</span>
          </button>
        </div>

        {/* Introduction Section */}
        <section id="introduction" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Introduction</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white font-semibold">EnvBoot</strong> is a zero-runtime-dependency environment contract and validation tool, designed to be fast, flexible, and completely unbloated for modern JavaScript and TypeScript applications. It consists of multiple layers:
          </p>

          {/* 2-Column Cards matching Fumadocs */}
          <div id="core-concepts" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">EnvBoot Core</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero-runtime-dependency validator that aborts application startup before invalid state or missing database credentials execute.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">EnvBoot CLI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated AST scanner, contract synchronizer (<code className="font-mono text-emerald-400">sync</code>), and health diagnostics (<code className="font-mono text-emerald-400">doctor</code>).
              </p>
            </div>
          </div>
        </section>

        {/* Automatic Installation */}
        <section id="installation" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Automatic Installation</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Run the initialization command from your repository root. EnvBoot automatically parses your code, classifies variables, creates <code className="font-mono text-emerald-400">.envboot.json</code>, and injects the guard:
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
            Add <code className="font-mono text-emerald-300 font-semibold">--yes</code> (or <code className="font-mono text-emerald-300 font-semibold">-y</code>) to accept all detected variables non-interactively without prompt confirmation:
            <code className="block mt-1 font-mono text-xs bg-slate-900/60 p-2 rounded border border-slate-800 text-emerald-400">
              npx envboot@latest init --yes
            </code>
          </Callout>
        </section>

        {/* Contract File */}
        <section id="contract-file" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Contract Schema (.envboot.json)</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
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
        <section id="guard-injection" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Startup Guard Injection</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
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
        <section id="fail-fast" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Fail-Fast package.json Scripts</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Prepend <code className="font-mono text-emerald-400">envboot check</code> to your development and build scripts to block dev servers from booting when variables are incomplete:
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
        <section id="env-loader" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Cascading .env Loader</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            EnvBoot includes a zero-runtime-dependency cascading loader that mirrors framework precedence:
          </p>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 font-mono text-xs space-y-2 text-slate-300">
            <div className="font-bold text-amber-400 text-sm font-sans">Precedence Order:</div>
            <ol className="list-decimal pl-5 space-y-1">
              <li><span className="text-white font-semibold">System Environment</span> (process.env, Docker, Kubernetes)</li>
              <li><span className="text-slate-300">.env.[mode].local</span> (e.g. .env.development.local)</li>
              <li><span className="text-slate-300">.env.[mode]</span> (based on NODE_ENV)</li>
              <li><span className="text-slate-300">.env.local</span></li>
              <li><span className="text-slate-300">.env</span></li>
            </ol>
          </div>
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
