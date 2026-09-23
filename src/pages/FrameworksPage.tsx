import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Callout } from '../components/Callout';
import { TableOfContents, TocItem } from '../components/TableOfContents';
import { 
  Layers, 
  Zap, 
  Server, 
  ShieldCheck, 
  Cpu,
  ChevronRight
} from 'lucide-react';

const TOC_ITEMS: TocItem[] = [
  { id: 'nextjs', label: 'Next.js (App & Pages)' },
  { id: 'vite', label: 'Vite & Browser Frontend' },
  { id: 'express', label: 'Express & Fastify' },
  { id: 'nestjs', label: 'NestJS' },
  { id: 'bun-deno', label: 'Bun & Deno Runtimes' },
];

export const FrameworksPage: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>('all');

  const frameworks = [
    { id: 'all', label: 'All Frameworks', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'nextjs', label: 'Next.js', icon: <Zap className="w-3.5 h-3.5 text-slate-100" /> },
    { id: 'vite', label: 'Vite / React', icon: <Zap className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'express', label: 'Express / Fastify', icon: <Server className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'nestjs', label: 'NestJS', icon: <ShieldCheck className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'bun-deno', label: 'Bun & Deno', icon: <Cpu className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  return (
    <div className="flex gap-10 xl:gap-14 items-start w-full">
      <div className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl space-y-10">
        
        {/* Breadcrumb & Header */}
        <header className="space-y-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-slate-300 font-medium">Frameworks</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Framework Integration Recipes
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Step-by-step implementation patterns for injecting EnvBoot guards into full-stack frameworks, client bundlers, and backend APIs.
            </p>
          </div>

          {/* Interactive Framework Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1">
            {frameworks.map((fw) => (
              <button
                key={fw.id}
                onClick={() => setSelectedFramework(fw.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  selectedFramework === fw.id
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800'
                }`}
              >
                {fw.icon}
                <span>{fw.label}</span>
              </button>
            ))}
          </div>
        </header>

        {/* 1. Next.js Section */}
        {(selectedFramework === 'all' || selectedFramework === 'nextjs') && (
          <section id="nextjs" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100">
                  <Zap className="w-4 h-4 text-slate-100" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Next.js</h2>
                  <p className="text-xs text-slate-400">App Router, Pages Router & Build Guard</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-900 border border-slate-800 text-slate-400">
                Full-Stack
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              In Next.js, initialize EnvBoot before server components render or layout trees mount. 
              Choose between runtime layout validation or build-time config guards:
            </p>

            <CodeBlock
              tabs={[
                {
                  title: 'App Router (layout.tsx)',
                  filename: 'src/app/layout.tsx',
                  language: 'tsx',
                  code: `import envboot from "envboot";

// Verify environment before layout renders or server components mount
envboot.init();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
                },
                {
                  title: 'Pages Router (_app.tsx)',
                  filename: 'src/pages/_app.tsx',
                  language: 'tsx',
                  code: `import envboot from "envboot";
import type { AppProps } from "next/app";

// Guard startup before page tree renders
envboot.init();

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}`,
                },
                {
                  title: 'Build Guard (next.config.mjs)',
                  filename: 'next.config.mjs',
                  language: 'javascript',
                  code: `import envboot from "envboot";

// Halt "next build" if environment variables are missing
envboot.init();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;`,
                },
              ]}
            />
          </section>
        )}

        {/* 2. Vite & Frontend Section */}
        {(selectedFramework === 'all' || selectedFramework === 'vite') && (
          <section id="vite" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-400">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Vite & Browser Frontend</h2>
                  <p className="text-xs text-slate-400">React, Vue, Svelte (Client Bundles)</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-cyan-950/40 border border-cyan-800/40 text-cyan-300">
                Browser Safe
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Browser environments cannot call Node.js <code className="font-mono text-cyan-300">process.exit()</code>. 
              Import <code className="font-mono text-emerald-400">envboot/browser</code> to validate client variables (<code className="font-mono text-cyan-300">import.meta.env</code>) and throw fatal runtime errors before mounting React:
            </p>

            <CodeBlock
              tabs={[
                {
                  title: 'src/main.tsx',
                  filename: 'src/main.tsx',
                  language: 'tsx',
                  code: `import envboot from "envboot/browser";
import contract from "../.envboot.json";

// Guard frontend environment before React mounts
envboot.init({
  config: contract,
  env: import.meta.env,
  exitOnError: true,
});

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
                },
                {
                  title: 'package.json (Fail-Fast)',
                  filename: 'package.json',
                  language: 'json',
                  code: `{
  "scripts": {
    "dev": "envboot check && vite",
    "build": "envboot check && tsc -b && vite build"
  }
}`,
                },
              ]}
            />

            <Callout type="tip" title="Pre-Bundling Protection">
              Prepend <code className="font-mono text-emerald-400">envboot check</code> to your dev and build scripts. 
              This prevents Vite from even launching when required variables are missing from your local <code className="font-mono text-slate-300">.env</code>.
            </Callout>
          </section>
        )}

        {/* 3. Express, Fastify & Koa Section */}
        {(selectedFramework === 'all' || selectedFramework === 'express') && (
          <section id="express" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-400">
                  <Server className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Express & Fastify</h2>
                  <p className="text-xs text-slate-400">Node.js HTTP Server & Microservices</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
                Backend
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Place the guard at the very top of your entry file before establishing database connections or binding socket listeners:
            </p>

            <CodeBlock
              tabs={[
                {
                  title: 'Express (TypeScript)',
                  filename: 'src/server.ts',
                  language: 'typescript',
                  code: `import envboot from "envboot";

// Halts process immediately with exit code 1 if DATABASE_URL or PORT are missing
envboot.init();

import express from "express";
import { connectDatabase } from "./db";

const app = express();
const port = process.env.PORT || 3000;

await connectDatabase(process.env.DATABASE_URL!);

app.listen(port, () => {
  console.log(\`Server listening on http://localhost:\${port}\`);
});`,
                },
                {
                  title: 'Fastify',
                  filename: 'src/app.ts',
                  language: 'typescript',
                  code: `import envboot from "envboot";
import Fastify from "fastify";

envboot.init();

const fastify = Fastify({ logger: true });

fastify.get("/", async (req, reply) => {
  return { status: "ok" };
});

await fastify.listen({ port: Number(process.env.PORT) || 3000 });`,
                },
              ]}
            />
          </section>
        )}

        {/* 4. NestJS Section */}
        {(selectedFramework === 'all' || selectedFramework === 'nestjs') && (
          <section id="nestjs" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-400">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">NestJS</h2>
                  <p className="text-xs text-slate-400">Enterprise TypeScript Applications</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-950/40 border border-rose-800/40 text-rose-300">
                Enterprise
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              In NestJS, invoke <code className="font-mono text-emerald-400">envboot.init()</code> in <code className="font-mono text-slate-300">src/main.ts</code> before creating the application factory to ensure dependencies receive valid environment configurations:
            </p>

            <CodeBlock
              filename="src/main.ts"
              language="typescript"
              code={`import envboot from "envboot";

// Halt NestJS bootstrap before dependency injection container loads
envboot.init();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();`}
            />
          </section>
        )}

        {/* 5. Bun & Deno Section */}
        {(selectedFramework === 'all' || selectedFramework === 'bun-deno') && (
          <section id="bun-deno" className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-400">
                  <Cpu className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Bun & Deno Runtimes</h2>
                  <p className="text-xs text-slate-400">Native ESM & Modern JavaScript Runtimes</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-950/40 border border-amber-800/40 text-amber-300">
                Runtimes
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              EnvBoot has zero dependencies and natively validates variables whether accessed through <code className="font-mono text-cyan-300">Bun.env</code> or <code className="font-mono text-cyan-300">Deno.env</code>:
            </p>

            <CodeBlock
              tabs={[
                {
                  title: 'Bun HTTP Server',
                  filename: 'server.ts (Bun)',
                  language: 'typescript',
                  code: `import envboot from "envboot";

// Validates Bun.env with zero dependencies
envboot.init();

Bun.serve({
  port: Bun.env.PORT || 3000,
  fetch(req) {
    return new Response("OK");
  },
});`,
                },
                {
                  title: 'Deno HTTP',
                  filename: 'main.ts (Deno)',
                  language: 'typescript',
                  code: `import envboot from "npm:envboot";

// Validates Deno.env at startup
envboot.init();

Deno.serve({ port: 3000 }, (_req) => {
  return new Response("Hello from Deno!");
});`,
                },
              ]}
            />
          </section>
        )}
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
