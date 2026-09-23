import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CodeBlock } from '../components/CodeBlock';
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
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace(/^#/, '');
      if (['nextjs', 'vite', 'express', 'nestjs', 'bun-deno'].includes(id)) {
        setSelectedFramework('all');
      }
    }
  }, [location.hash]);

  const frameworks = [
    { id: 'all', label: 'All Frameworks', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'nextjs', label: 'Next.js', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'vite', label: 'Vite / React', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'express', label: 'Express / Fastify', icon: <Server className="w-3.5 h-3.5" /> },
    { id: 'nestjs', label: 'NestJS', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'bun-deno', label: 'Bun & Deno', icon: <Cpu className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex gap-10 xl:gap-14 items-start w-full">
      <div className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl space-y-10">
        
        {/* Breadcrumb & Header */}
        <header className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
            <span className="text-zinc-900 dark:text-zinc-300 font-medium">Frameworks</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Framework Integration Recipes
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
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
                    ? 'bg-zinc-200 text-zinc-950 dark:bg-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-700 shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-zinc-200 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800'
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
          <section id="nextjs" className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-4 scroll-mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Next.js</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">App Router, Pages Router & Build Guard</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400">
                Full-Stack
              </span>
            </div>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
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
                  title: 'next.config.mjs (Build Guard)',
                  filename: 'next.config.mjs',
                  language: 'javascript',
                  code: `import envboot from "envboot";

// Halts "next build" if environment contract is violated
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

        {/* 2. Vite Section */}
        {(selectedFramework === 'all' || selectedFramework === 'vite') && (
          <section id="vite" className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-4 scroll-mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Vite & Browser Frontend</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">React, Vue, Svelte client-side validation</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400">
                Client SPA
              </span>
            </div>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              In client-side single-page applications, use <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">envboot/browser</code>. Pass the bundled <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">.envboot.json</code> contract and <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">import.meta.env</code>.
            </p>

            <CodeBlock
              tabs={[
                {
                  title: 'React Entrypoint (main.tsx)',
                  filename: 'src/main.tsx',
                  language: 'tsx',
                  code: `import React from "react";
import ReactDOM from "react-dom/client";
import envboot from "envboot/browser";
import config from "../.envboot.json";
import App from "./App";

// Throws error modal if VITE_ public variables are missing
envboot.init({
  config,
  env: import.meta.env,
  exitOnError: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
                },
                {
                  title: 'Vite Config (vite.config.ts)',
                  filename: 'vite.config.ts',
                  language: 'typescript',
                  code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envboot from "envboot";

// Verifies build-time environment variables
envboot.init();

export default defineConfig({
  plugins: [react()],
});`,
                },
              ]}
            />
          </section>
        )}

        {/* 3. Express & Fastify Section */}
        {(selectedFramework === 'all' || selectedFramework === 'express') && (
          <section id="express" className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-4 scroll-mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Express, Fastify & Koa</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Node.js HTTP Microservices</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400">
                Backend API
              </span>
            </div>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Place the guard call at the absolute top of your server entry file before initializing database pools, Redis clients, or routes:
            </p>

            <CodeBlock
              tabs={[
                {
                  title: 'Express (index.ts)',
                  filename: 'src/index.ts',
                  language: 'typescript',
                  code: `import envboot from "envboot";

// Aborts startup before socket listens or DB client connects
envboot.init();

import express from "express";
import { Pool } from "pg";

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.listen(process.env.PORT || 3000);`,
                },
                {
                  title: 'Fastify (server.ts)',
                  filename: 'src/server.ts',
                  language: 'typescript',
                  code: `import envboot from "envboot";

// Validate environment
envboot.init();

import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", async () => ({ hello: "world" }));
await fastify.listen({ port: Number(process.env.PORT) || 3000 });`,
                },
              ]}
            />
          </section>
        )}

        {/* 4. NestJS Section */}
        {(selectedFramework === 'all' || selectedFramework === 'nestjs') && (
          <section id="nestjs" className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-4 scroll-mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950 dark:text-white">NestJS Enterprise API</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Dependency injection bootstrap validation</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400">
                Enterprise
              </span>
            </div>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              In NestJS, execute <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">envboot.init()</code> in <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">src/main.ts</code> before <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">NestFactory.create(AppModule)</code>:
            </p>

            <CodeBlock
              filename="src/main.ts"
              language="typescript"
              code={`import envboot from "envboot";

// Halt before Nest DI container initializes providers or decorators
envboot.init();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();`}
            />
          </section>
        )}

        {/* 5. Bun & Deno Section */}
        {(selectedFramework === 'all' || selectedFramework === 'bun-deno') && (
          <section id="bun-deno" className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 space-y-4 scroll-mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Bun & Deno Runtimes</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Native Bun.env and Deno.env support</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400">
                Modern Runtimes
              </span>
            </div>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              EnvBoot automatically detects whether it is running under Bun or Deno and interrogates <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">Bun.env</code> or <code className="font-mono text-zinc-900 dark:text-zinc-200 bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">Deno.env</code> natively:
            </p>

            <CodeBlock
              tabs={[
                {
                  title: 'Bun HTTP',
                  filename: 'index.ts (Bun)',
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
