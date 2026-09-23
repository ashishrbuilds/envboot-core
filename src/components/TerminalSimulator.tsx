import React, { useState } from 'react';
import { Terminal, ShieldCheck } from 'lucide-react';

type SimulatedCommand = 'init' | 'check' | 'doctor' | 'sync';

export const TerminalSimulator: React.FC = () => {
  const [activeCommand, setActiveCommand] = useState<SimulatedCommand>('doctor');
  const [hasError, setHasError] = useState(false);

  const outputs: Record<SimulatedCommand, { title: string; cmd: string; render: () => React.ReactNode }> = {
    init: {
      title: 'Initialize & Guard',
      cmd: 'npx envboot@latest init',
      render: () => (
        <div className="space-y-2 font-mono text-xs sm:text-sm">
          <div className="text-slate-400">◇  Scanning AST for process.env, Bun.env, Deno.env references...</div>
          <div className="text-slate-300">│  Found 3 unique variables across 14 files</div>
          <div className="text-emerald-400 font-semibold">◇  Discovered variables:</div>
          <div className="pl-4 space-y-0.5 text-slate-300">
            <div>• <span className="text-white font-bold">DATABASE_URL</span> <span className="text-emerald-400">(Required)</span></div>
            <div>• <span className="text-white font-bold">JWT_SECRET</span> <span className="text-emerald-400">(Required)</span></div>
            <div>• <span className="text-white font-bold">REDIS_URL</span> <span className="text-slate-400">(Optional)</span></div>
          </div>
          <div className="text-slate-400">│</div>
          <div className="text-slate-300">◇  Entry point detected: <span className="text-cyan-300 font-semibold">src/server.ts</span></div>
          <div className="text-emerald-400">◇  Applied environment contract & startup guard (.envboot.json)</div>
          <div className="text-emerald-400">◇  Installed envboot dependency.</div>
          <div className="pt-2 text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="text-lg">✔</span> EnvBoot initialized successfully!
          </div>
        </div>
      ),
    },
    check: {
      title: 'CI / Runtime Check',
      cmd: hasError ? 'npx envboot@latest check' : 'npx envboot@latest check',
      render: () => (
        <div className="space-y-3 font-mono text-xs sm:text-sm">
          <div className="text-slate-100 font-bold tracking-wide">EnvBoot Check</div>
          
          <div>
            <div className="text-slate-400 font-medium">Required</div>
            <div className="text-slate-600">────────────────────────────────────────</div>
            <div className="space-y-1">
              <div className="text-emerald-400 flex items-center gap-2">
                <span>✓</span> <span className="text-slate-200">DATABASE_URL</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-2">
                <span>✓</span> <span className="text-slate-200">API_URL</span>
              </div>
              {hasError ? (
                <div className="text-rose-400 flex items-center gap-2">
                  <span>✗</span> <span className="text-rose-200 font-bold">JWT_SECRET</span>
                </div>
              ) : (
                <div className="text-emerald-400 flex items-center gap-2">
                  <span>✓</span> <span className="text-slate-200">JWT_SECRET</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-slate-400 font-medium">Optional</div>
            <div className="text-slate-600">────────────────────────────────────────</div>
            <div className="space-y-1">
              <div className="text-emerald-400 flex items-center gap-2">
                <span>✓</span> <span className="text-slate-200">REDIS_URL</span>
              </div>
              <div className="text-slate-400 flex items-center gap-2">
                <span>○</span> <span className="text-slate-400">SENTRY_DSN</span>
              </div>
            </div>
          </div>

          <div className="text-slate-600">────────────────────────────────────────</div>
          {hasError ? (
            <div className="space-y-1">
              <div className="text-rose-400 font-bold">Result: FAILED</div>
              <div className="text-rose-300">Error: Missing 1 required environment variable(s).</div>
              <div className="text-slate-400 text-xs mt-1">Application startup aborted with exit code 1.</div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-emerald-400 font-bold">Result: PASSED</div>
              <div className="text-slate-400 text-xs">All required environment variables validated. Zero drift detected.</div>
            </div>
          )}
        </div>
      ),
    },
    doctor: {
      title: 'Diagnostic Health Check',
      cmd: 'npx envboot@latest doctor',
      render: () => (
        <div className="space-y-3 font-mono text-xs sm:text-sm">
          <div className="text-cyan-300 font-bold flex items-center gap-2">
            <span>🩺</span> EnvBoot Doctor — Diagnostic Health Check
          </div>

          <div>
            <div className="text-slate-400">Project Environment</div>
            <div className="text-slate-600">────────────────────────────────────────────────────────────</div>
            <div className="grid grid-cols-[140px_1fr] gap-y-1 text-slate-300">
              <span className="text-slate-400">Framework:</span> <span className="text-emerald-400 font-semibold">NEXTJS</span>
              <span className="text-slate-400">Package Manager:</span> <span>pnpm</span>
              <span className="text-slate-400">Module Type:</span> <span>ESM</span>
              <span className="text-slate-400">Entry Point:</span> <span>src/app/layout.tsx <span className="text-emerald-400 font-semibold">(✓ Injected)</span></span>
              <span className="text-slate-400">Contract:</span> <span>.envboot.json <span className="text-emerald-400 font-semibold">(✓ Found)</span></span>
              <span className="text-slate-400">Env Files:</span> <span>.env, .env.local</span>
            </div>
          </div>

          <div>
            <div className="text-slate-400">Diagnostics & Health</div>
            <div className="text-slate-600">────────────────────────────────────────────────────────────</div>
            <div className="space-y-1 text-emerald-400">
              <div>✓ Package dependency: envboot (0.1.7)</div>
              <div>✓ Contract schema: 3 required, 1 optional variable(s)</div>
              <div>✓ All required variables are set in environment</div>
              <div>✓ Source code and contract are fully in sync (0 drift)</div>
            </div>
          </div>

          <div className="text-emerald-300 font-bold pt-1">
            ✨ Everything looks healthy! No issues detected.
          </div>
        </div>
      ),
    },
    sync: {
      title: 'Contract Sync & Drift',
      cmd: 'npx envboot@latest sync --yes',
      render: () => (
        <div className="space-y-2 font-mono text-xs sm:text-sm">
          <div className="text-slate-400">◇  Scanning AST for newly introduced environment references...</div>
          <div className="text-slate-300">│  Found new variable: <span className="text-cyan-300 font-bold">AWS_S3_BUCKET</span> in src/upload.ts</div>
          <div className="text-emerald-400 font-semibold">◇  Updating .envboot.json with 1 new variable...</div>
          <div className="text-emerald-400 font-semibold">◇  Regenerating .env.example template...</div>
          <div className="pt-2 text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="text-lg">✔</span> Environment contract synced successfully!
          </div>
        </div>
      ),
    },
  };

  const current = outputs[activeCommand];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
      {/* Top command switcher */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-4 py-3 gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            envboot-terminal
          </span>
        </div>

        {/* Command tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {(['doctor', 'check', 'init', 'sync'] as SimulatedCommand[]).map((cmd) => (
            <button
              key={cmd}
              onClick={() => setActiveCommand(cmd)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all font-medium whitespace-nowrap ${
                activeCommand === cmd
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cmd}
            </button>
          ))}
        </div>

        {activeCommand === 'check' && (
          <button
            onClick={() => setHasError(!hasError)}
            className={`text-xs px-2.5 py-1 rounded-md border font-mono transition-colors whitespace-nowrap ${
              hasError
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
            }`}
          >
            {hasError ? 'Triggered Fail (Click to Pass)' : 'Simulate Missing Secret'}
          </button>
        )}
      </div>

      {/* Terminal prompt bar */}
      <div className="px-4 sm:px-5 py-2.5 bg-slate-950 border-b border-slate-900 font-mono text-xs text-slate-400 flex items-center gap-2 overflow-x-auto">
        <span className="text-emerald-400 font-bold">$</span>
        <span className="text-slate-100 font-semibold">{current.cmd}</span>
      </div>

      {/* Terminal stdout body */}
      <div className="p-4 sm:p-6 bg-slate-950 text-slate-200 min-h-[260px] overflow-x-auto">
        {current.render()}
      </div>

      {/* Footer bar */}
      <div className="px-4 sm:px-5 py-2 bg-slate-900/40 border-t border-slate-900 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">Secret Shield: Zero sensitive values printed</span>
        </div>
        <span>v0.1.7</span>
      </div>
    </div>
  );
};
