import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Play, 
  CheckCircle2, 
  XCircle, 
  FileCode,
  Sliders,
  Plus,
  Trash2
} from 'lucide-react';

interface EnvVarItem {
  id: string;
  name: string;
  classification: 'required' | 'optional' | 'ignore';
  isSet: boolean;
}

export const PlaygroundPage: React.FC = () => {
  const [envText, setEnvText] = useState(
    `DATABASE_URL=postgres://user:password@localhost:5432/mydb\nAPI_KEY=sk_live_9837492837492\nPORT=3000\nREDIS_URL=redis://localhost:6379\nNODE_ENV=development\nSENTRY_DSN=`
  );

  const [vars, setVars] = useState<EnvVarItem[]>([
    { id: '1', name: 'DATABASE_URL', classification: 'required', isSet: true },
    { id: '2', name: 'API_KEY', classification: 'required', isSet: true },
    { id: '3', name: 'PORT', classification: 'required', isSet: true },
    { id: '4', name: 'REDIS_URL', classification: 'optional', isSet: true },
    { id: '5', name: 'NODE_ENV', classification: 'ignore', isSet: true },
    { id: '6', name: 'SENTRY_DSN', classification: 'optional', isSet: false },
  ]);

  const [activeTab, setActiveTab] = useState<'node' | 'vite'>('node');
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [simulatedResult, setSimulatedResult] = useState<{
    valid: boolean;
    missingRequired: string[];
    missingOptional: string[];
  } | null>(null);

  // Parse text into variables
  const handleParseEnvText = () => {
    const lines = envText.split('\n');
    const newVars: EnvVarItem[] = [];
    const seen = new Set<string>();

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      const rawKey = eqIdx !== -1 ? trimmed.slice(0, eqIdx).trim() : trimmed;
      const key = rawKey.replace(/^export\s+/, '').trim();
      const val = eqIdx !== -1 ? trimmed.slice(eqIdx + 1).trim() : '';

      if (key && !seen.has(key)) {
        seen.add(key);
        let classification: 'required' | 'optional' | 'ignore' = 'required';
        if (key.includes('OPTIONAL') || key.includes('DEBUG') || key.includes('SENTRY')) {
          classification = 'optional';
        } else if (key === 'NODE_ENV' || key === 'TZ') {
          classification = 'ignore';
        }

        newVars.push({
          id: Math.random().toString(),
          name: key,
          classification,
          isSet: Boolean(val),
        });
      }
    }

    if (newVars.length > 0) {
      setVars(newVars);
    }
  };

  const addCustomVar = () => {
    const name = `NEW_VAR_${vars.length + 1}`;
    setVars([...vars, { id: Math.random().toString(), name, classification: 'required', isSet: true }]);
  };

  const removeVar = (id: string) => {
    setVars(vars.filter((v) => v.id !== id));
  };

  const updateClassification = (id: string, c: 'required' | 'optional' | 'ignore') => {
    setVars(vars.map((v) => (v.id === id ? { ...v, classification: c } : v)));
  };

  const toggleIsSet = (id: string) => {
    setVars(vars.map((v) => (v.id === id ? { ...v, isSet: !v.isSet } : v)));
  };

  // Generate .envboot.json
  const generatedJson = useMemo(() => {
    const req = vars.filter((v) => v.classification === 'required').map((v) => v.name);
    const opt = vars.filter((v) => v.classification === 'optional').map((v) => v.name);
    const ign = vars.filter((v) => v.classification === 'ignore').map((v) => v.name);

    return JSON.stringify(
      {
        required: req,
        optional: opt,
        ...(ign.length > 0 ? { ignore: ign } : {}),
      },
      null,
      2
    );
  }, [vars]);

  const runSimulation = () => {
    const missingReq = vars.filter((v) => v.classification === 'required' && !v.isSet).map((v) => v.name);
    const missingOpt = vars.filter((v) => v.classification === 'optional' && !v.isSet).map((v) => v.name);

    setSimulatedResult({
      valid: missingReq.length === 0,
      missingRequired: missingReq,
      missingOptional: missingOpt,
    });
  };

  const copyConfig = async () => {
    await navigator.clipboard.writeText(generatedJson);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="space-y-10 pb-16">
      <header className="space-y-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Interactive Contract Playground
          </h1>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Paste your environment variables, categorize required vs optional keys, generate <code className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold">.envboot.json</code>, and test runtime validation live.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input and Variables Table */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick paste .env box */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                Paste .env Content
              </label>
              <button
                onClick={handleParseEnvText}
                className="px-3 py-1 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs font-semibold transition-colors"
              >
                Scan & Parse Variables
              </button>
            </div>
            <textarea
              rows={4}
              value={envText}
              onChange={(e) => setEnvText(e.target.value)}
              className="w-full font-mono text-xs p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:border-zinc-500 leading-relaxed resize-none"
              placeholder="DATABASE_URL=...&#10;API_KEY=..."
            />
          </div>

          {/* Configured Variables */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-200">
                  Detected Variables ({vars.length})
                </h2>
              </div>
              <button
                onClick={addCustomVar}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Key
              </button>
            </div>

            <div className="space-y-2">
              {vars.map((v) => (
                <div
                  key={v.id}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
                >
                  <div className="flex items-center gap-2 font-mono font-semibold text-zinc-900 dark:text-zinc-200 min-w-0 truncate">
                    <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0"></span>
                    <span className="truncate">{v.name}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Classification Selector */}
                    <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-0.5 font-mono text-[11px]">
                      {(['required', 'optional', 'ignore'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => updateClassification(v.id, cat)}
                          className={`px-2 py-0.5 rounded-md transition-colors ${
                            v.classification === cat
                              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Simulation value toggle */}
                    <button
                      onClick={() => toggleIsSet(v.id)}
                      className={`px-2 py-1 rounded-lg border font-mono text-[11px] transition-colors flex items-center gap-1 ${
                        v.isSet
                          ? 'bg-zinc-100 border-zinc-300 text-zinc-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200'
                          : 'bg-zinc-200/50 border-zinc-300 text-zinc-500 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-500 line-through'
                      }`}
                      title="Click to toggle variable present / missing in simulation"
                    >
                      {v.isSet ? 'Present' : 'Missing'}
                    </button>

                    <button
                      onClick={() => removeVar(v.id)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors"
                      title="Delete variable"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={runSimulation}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Simulate Validation Check
            </button>
          </div>

          {/* Simulation Output Card */}
          {simulatedResult && (
            <div
              className={`p-5 rounded-2xl border ${
                simulatedResult.valid
                  ? 'border-zinc-300 dark:border-zinc-700 bg-zinc-100/70 dark:bg-zinc-900/40'
                  : 'border-zinc-400 dark:border-zinc-600 bg-zinc-200/50 dark:bg-zinc-900/60'
              } space-y-3 font-mono text-xs`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {simulatedResult.valid ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-zinc-900 dark:text-white" />
                      <span className="text-zinc-950 dark:text-white">STARTUP PERMITTED (PASSED)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-zinc-900 dark:text-white" />
                      <span className="text-zinc-950 dark:text-white">STARTUP ABORTED (FAILED)</span>
                    </>
                  )}
                </div>
                <span className="text-[11px] text-zinc-500">Exit code: {simulatedResult.valid ? '0' : '1'}</span>
              </div>

              <div className="text-zinc-700 dark:text-zinc-300 space-y-1">
                {simulatedResult.valid ? (
                  <div>All required variables are present. Application boots cleanly.</div>
                ) : (
                  <div>
                    Fatal startup crash prevented! Missing required key(s):{' '}
                    <span className="text-zinc-950 dark:text-white font-bold underline">
                      {simulatedResult.missingRequired.join(', ')}
                    </span>
                  </div>
                )}
                {simulatedResult.missingOptional.length > 0 && (
                  <div className="text-zinc-500 text-[11px]">
                    Note: Missing optional variables (non-fatal): {simulatedResult.missingOptional.join(', ')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Generated Contract & Code */}
        <div className="lg:col-span-5 space-y-6">
          {/* Generated .envboot.json */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200">
                Generated .envboot.json
              </span>
              <button
                onClick={copyConfig}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                {copiedConfig ? (
                  <>
                    <Check className="w-3 h-3 text-zinc-950 dark:text-white" />
                    <span className="text-zinc-950 dark:text-white font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 font-mono text-xs text-zinc-800 dark:text-zinc-200 overflow-x-auto leading-relaxed">
              <code>{generatedJson}</code>
            </pre>
          </div>

          {/* Startup Code Preview */}
          <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200">
                Entrypoint Guard Code
              </span>
              <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 p-0.5 font-mono text-[11px]">
                <button
                  onClick={() => setActiveTab('node')}
                  className={`px-2 py-0.5 rounded-md ${
                    activeTab === 'node'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Node.js / Bun
                </button>
                <button
                  onClick={() => setActiveTab('vite')}
                  className={`px-2 py-0.5 rounded-md ${
                    activeTab === 'vite'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Vite / React
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 font-mono text-xs text-zinc-800 dark:text-zinc-300 overflow-x-auto leading-relaxed">
              {activeTab === 'node' ? (
                <code>{`import envboot from "envboot";

// Place at top of src/server.ts:
envboot.init();

// Rest of your server code...`}</code>
              ) : (
                <code>{`import envboot from "envboot/browser";
import contract from "../.envboot.json";

// Place at top of src/main.tsx:
envboot.init({
  config: contract,
  env: import.meta.env,
  exitOnError: true,
});`}</code>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
