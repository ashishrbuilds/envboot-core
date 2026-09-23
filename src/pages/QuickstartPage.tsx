import React from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Callout } from '../components/Callout';
import { TableOfContents, TocItem } from '../components/TableOfContents';

const TOC_ITEMS: TocItem[] = [
  { id: 'installation', label: '1. Automated Setup' },
  { id: 'contract-file', label: '2. Contract File (.envboot.json)' },
  { id: 'guard-injection', label: '3. Startup Guard Injection' },
  { id: 'fail-fast', label: '4. Fail-Fast package.json Scripts' },
  { id: 'env-loader', label: '5. Cascading .env Loader' },
  { id: 'next-steps', label: 'Next Steps' },
];

export const QuickstartPage: React.FC = () => {
  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 space-y-12">
        <header className="space-y-3 pb-6 border-b border-slate-800">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Quickstart Guide
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Get up and running with EnvBoot in less than a minute. Automatically detect environment variables, 
            generate contracts, and inject zero-overhead startup guards.
          </p>
        </header>

        {/* Step 1: Automated Setup */}
        <section id="installation" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">1. Automated Setup</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Run the interactive initialization command from the root of your project. 
            EnvBoot will parse your codebase using an AST scanner, classify discovered variables, and inject the startup guard into your application entrypoint:
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

        {/* Step 2: Contract File */}
        <section id="contract-file" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">2. The Contract (.envboot.json)</h2>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
              <div className="font-mono text-xs font-bold text-emerald-400">required</div>
              <div className="text-xs text-slate-400">
                Application terminates immediately with exit code 1 if missing.
              </div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
              <div className="font-mono text-xs font-bold text-amber-400">optional</div>
              <div className="text-xs text-slate-400">
                Warns in stdout when missing, but allows application to continue.
              </div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1">
              <div className="font-mono text-xs font-bold text-slate-400">ignore</div>
              <div className="text-xs text-slate-400">
                System or framework variables excluded from drift warnings.
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Startup Guard Injection */}
        <section id="guard-injection" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">3. Startup Guard Injection</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The CLI automatically places the guard at the top of your detected entrypoint. 
            You continue writing standard, native code without wrapping <code className="font-mono text-cyan-300">process.env</code>:
          </p>

          <CodeBlock
            language="typescript"
            filename="src/server.ts (Node / Express / Backend)"
            code={`import envboot from "envboot";

// Halts execution immediately if required variables are missing
envboot.init();

// Continue writing standard native code:
import express from "express";

const app = express();
const dbUrl = process.env.DATABASE_URL; // Type-safe & guaranteed present!`}
          />

          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            For browser frontends (like Vite + React), use the client-safe browser module:
          </p>

          <CodeBlock
            language="tsx"
            filename="src/main.tsx (Vite / React)"
            code={`import envboot from "envboot/browser";
import config from "../.envboot.json";

// Throws fatal error & displays error overlay before React mounts
envboot.init({
  config,
  env: import.meta.env,
  exitOnError: true,
});

import React from "react";
import ReactDOM from "react-dom/client";`}
          />
        </section>

        {/* Step 4: Fail-fast scripts */}
        <section id="fail-fast" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">4. Fail-Fast package.json Scripts</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Best practice: Prepend <code className="font-mono text-emerald-400">envboot check</code> to your development and build scripts. 
            This prevents Vite, Next.js, or TypeScript compilers from even spinning up when variables are incomplete:
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

        {/* Step 5: Cascading loader */}
        <section id="env-loader" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">5. Cascading .env Loader</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            EnvBoot includes a zero-runtime-dependency cascading loader that mirrors standard framework precedence:
          </p>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 font-mono text-xs space-y-2 text-slate-300">
            <div className="font-bold text-emerald-400 text-sm font-sans">Precedence Order (Highest to Lowest):</div>
            <ol className="list-decimal pl-5 space-y-1">
              <li><span className="text-white font-semibold">System Environment</span> (process.env, Docker, Kubernetes secrets)</li>
              <li><span className="text-slate-300">.env.[mode].local</span> (e.g. .env.development.local)</li>
              <li><span className="text-slate-300">.env.[mode]</span> (based on NODE_ENV)</li>
              <li><span className="text-slate-300">.env.local</span></li>
              <li><span className="text-slate-300">.env</span></li>
            </ol>
          </div>
        </section>

        <section id="next-steps" className="pt-6 border-t border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-slate-100">Next Steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="#/docs/cli" 
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/40 transition-colors group block"
            >
              <div className="font-semibold text-slate-200 group-hover:text-emerald-400">
                CLI Commands Reference →
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Explore check, doctor, sync, and all CLI flags.
              </div>
            </a>
            <a 
              href="#/docs/frameworks" 
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/40 transition-colors group block"
            >
              <div className="font-semibold text-slate-200 group-hover:text-emerald-400">
                Framework Integration Guides →
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Recipes for Next.js, Express, Fastify, Bun, and Deno.
              </div>
            </a>
          </div>
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
