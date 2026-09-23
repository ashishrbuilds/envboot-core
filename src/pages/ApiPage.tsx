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
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 space-y-10">
        
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-slate-300 font-medium">Runtime API</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Runtime API Reference
            </h1>
            <p className="text-base text-slate-400 font-normal">
              Programmatic methods for validating environment contracts and querying configuration state.
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

        {/* envboot.init */}
        <section id="init-api" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
          <h2 className="text-xl font-bold text-slate-100">envboot.init(options?)</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Loads the contract, validates active environment variables, prints diagnostic tables, and halts execution with exit code 1 if required variables are missing.
          </p>

          <CodeBlock
            language="typescript"
            filename="Standard usage"
            code={`import envboot from "envboot";

// Standard startup guard
envboot.init();`}
          />

          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            Advanced configuration with custom options:
          </p>

          <CodeBlock
            language="typescript"
            filename="Advanced options"
            code={`import envboot from "envboot";

envboot.init({
  // Custom path to contract file
  configPath: "./config/.envboot.json",

  // Prevent process.exit(1) on failure (returns boolean instead)
  exitOnError: false,

  // Suppress terminal table and banner
  quiet: true,

  // Custom environment dictionary
  env: process.env,
});`}
          />

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#070a12] mt-4">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                  <th className="py-2.5 px-4 font-semibold">Option</th>
                  <th className="py-2.5 px-4 font-semibold">Type</th>
                  <th className="py-2.5 px-4 font-semibold">Default</th>
                  <th className="py-2.5 px-4 font-semibold font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 px-4 text-emerald-400">configPath</td>
                  <td className="py-2.5 px-4 text-slate-400">string</td>
                  <td className="py-2.5 px-4 text-slate-500">".envboot.json"</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Relative path to contract schema</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-emerald-400">exitOnError</td>
                  <td className="py-2.5 px-4 text-slate-400">boolean</td>
                  <td className="py-2.5 px-4 text-slate-500">true</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Abort process when required vars are missing</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-emerald-400">quiet</td>
                  <td className="py-2.5 px-4 text-slate-400">boolean</td>
                  <td className="py-2.5 px-4 text-slate-500">false</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Mutes terminal output during verification</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-emerald-400">env</td>
                  <td className="py-2.5 px-4 text-slate-400">Record&lt;string, string&gt;</td>
                  <td className="py-2.5 px-4 text-slate-500">process.env</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Target environment object to inspect</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* envboot.validate */}
        <section id="validate-api" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
          <h2 className="text-xl font-bold text-slate-100">envboot.validate(options?)</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Performs a non-terminating verification check. Returns a typed result object without halting the process or printing to terminal:
          </p>

          <CodeBlock
            language="typescript"
            filename="Programmatic validation"
            code={`import envboot from "envboot";

const result = envboot.validate();

console.log(result.valid);           // boolean: true if all required are present
console.log(result.missingRequired); // string[]: array of missing mandatory keys
console.log(result.presentRequired); // string[]: array of present mandatory keys
console.log(result.missingOptional); // string[]: array of missing optional keys

if (!result.valid) {
  // Handle gracefully in custom error monitoring (Sentry, Datadog)
  console.error("Missing critical configuration:", result.missingRequired);
}`}
          />
        </section>

        {/* TypeScript Types */}
        <section id="types" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-100">TypeScript Types</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            EnvBoot ships with built-in zero-dependency TypeScript definitions:
          </p>

          <CodeBlock
            language="typescript"
            filename="types.d.ts"
            code={`export interface EnvBootConfig {
  required?: string[];
  optional?: string[];
  ignore?: string[];
}

export interface ValidationResult {
  valid: boolean;
  missingRequired: string[];
  presentRequired: string[];
  missingOptional: string[];
  presentOptional: string[];
}

export interface InitOptions {
  configPath?: string;
  config?: EnvBootConfig;
  exitOnError?: boolean;
  quiet?: boolean;
  env?: Record<string, string | undefined>;
}`}
          />
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
