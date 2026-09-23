import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { TableOfContents, TocItem } from '../components/TableOfContents';
import { ChevronRight, Copy, Check, ChevronDown } from 'lucide-react';

const TOC_ITEMS: TocItem[] = [
  { id: 'init-api', label: 'envboot.init(options?)' },
  { id: 'validate-api', label: 'envboot.validate(options?)' },
  { id: 'types', label: 'TypeScript Types' },
];

export const ApiPage: React.FC = () => {
  const [copiedMd, setCopiedMd] = useState(false);

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(
      `# EnvBoot Runtime API\n\n- envboot.init(options?): Enforce environment startup guard\n- envboot.validate(options?): Non-terminating programmatic check`
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
            <span className="text-zinc-900 dark:text-zinc-300 font-medium">Runtime API</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Runtime API Reference
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-normal">
              Programmatic methods for validating environment contracts and querying configuration state.
            </p>
          </div>

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

        {/* 1. envboot.init */}
        <section id="init-api" className="space-y-4 scroll-mt-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">
              envboot.init(options?)
            </h2>
            <p className="text-xs font-mono text-zinc-500">
              Synchronously validates active environment and aborts process on failure.
            </p>
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Reads the root contract, assesses environment values across process / runtime bindings, and halts execution before any dependent application code executes.
          </p>

          <CodeBlock
            language="typescript"
            code={`import envboot, { type InitOptions } from "envboot";

const options: InitOptions = {
  // Optional custom path to .envboot.json
  configPath: "./config/.envboot.json",

  // Whether to exit immediately with code 1 on failure (default: true)
  exitOnError: true,

  // Custom logger callback
  onViolation: (result) => {
    console.error("Missing required variables:", result.missingRequired);
  }
};

envboot.init(options);`}
          />

          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60">
            <table className="w-full min-w-[500px] text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                  <th className="py-2.5 px-4 font-semibold">Parameter</th>
                  <th className="py-2.5 px-4 font-semibold">Type</th>
                  <th className="py-2.5 px-4 font-semibold">Default</th>
                  <th className="py-2.5 px-4 font-semibold font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                <tr>
                  <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">configPath</td>
                  <td className="py-2.5 px-4 text-zinc-500">string</td>
                  <td className="py-2.5 px-4 text-zinc-500">".envboot.json"</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Path to contract file relative to project root.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">exitOnError</td>
                  <td className="py-2.5 px-4 text-zinc-500">boolean</td>
                  <td className="py-2.5 px-4 text-zinc-500">true</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Calls process.exit(1) on failure. Set false for testing.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-zinc-950 dark:text-white">env</td>
                  <td className="py-2.5 px-4 text-zinc-500">Record&lt;string, string&gt;</td>
                  <td className="py-2.5 px-4 text-zinc-500">process.env</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Custom env dictionary (e.g. import.meta.env).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. envboot.validate */}
        <section id="validate-api" className="space-y-4 scroll-mt-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">
              envboot.validate(options?)
            </h2>
            <p className="text-xs font-mono text-zinc-500">
              Non-terminating inspection returning a structured result object.
            </p>
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Use <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">validate()</code> when you want programmatic inspection without exiting the process, such as inside unit tests or health-check endpoints:
          </p>

          <CodeBlock
            language="typescript"
            code={`import envboot from "envboot";

const result = envboot.validate();

if (!result.valid) {
  console.log("Missing Required:", result.missingRequired);
  console.log("Missing Optional:", result.missingOptional);
}`}
          />
        </section>

        {/* 3. Types */}
        <section id="types" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">TypeScript Types</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            EnvBoot ships with full TypeScript declaration files out of the box:
          </p>

          <CodeBlock
            language="typescript"
            filename="types.d.ts"
            code={`export interface EnvBootConfig {
  required: string[];
  optional?: string[];
  ignore?: string[];
}

export interface ValidationResult {
  valid: boolean;
  missingRequired: string[];
  missingOptional: string[];
  driftWarnings: string[];
}

export interface InitOptions {
  configPath?: string;
  config?: EnvBootConfig;
  env?: Record<string, string | undefined>;
  exitOnError?: boolean;
  onViolation?: (result: ValidationResult) => void;
}`}
          />
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
