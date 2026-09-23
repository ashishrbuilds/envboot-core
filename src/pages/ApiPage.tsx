import React from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { TableOfContents, TocItem } from '../components/TableOfContents';

const TOC_ITEMS: TocItem[] = [
  { id: 'init-api', label: 'envboot.init(options?)' },
  { id: 'validate-api', label: 'envboot.validate(options?)' },
  { id: 'types', label: 'TypeScript Types' },
];

export const ApiPage: React.FC = () => {
  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 space-y-12">
        <header className="space-y-3 pb-6 border-b border-slate-800">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Runtime API Reference
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Programmatic methods for initializing startup guards, validating environment contracts, and querying configuration state.
          </p>
        </header>

        {/* envboot.init */}
        <section id="init-api" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">envboot.init(options?)</h2>
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

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 mt-4">
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
                  <td className="py-2.5 px-4 font-sans">Relative path to the contract schema</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-emerald-400">exitOnError</td>
                  <td className="py-2.5 px-4 text-slate-400">boolean</td>
                  <td className="py-2.5 px-4 text-slate-500">true (Node)</td>
                  <td className="py-2.5 px-4 font-sans">Whether to abort process when required vars are missing</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-emerald-400">quiet</td>
                  <td className="py-2.5 px-4 text-slate-400">boolean</td>
                  <td className="py-2.5 px-4 text-slate-500">false</td>
                  <td className="py-2.5 px-4 font-sans">Mutes terminal output during verification</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-emerald-400">env</td>
                  <td className="py-2.5 px-4 text-slate-400">Record&lt;string, string&gt;</td>
                  <td className="py-2.5 px-4 text-slate-500">process.env</td>
                  <td className="py-2.5 px-4 font-sans">Target environment object to inspect</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* envboot.validate */}
        <section id="validate-api" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">envboot.validate(options?)</h2>
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
          <h2 className="text-2xl font-bold text-slate-100">TypeScript Types</h2>
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
