import React from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Callout } from '../components/Callout';
import { TableOfContents, TocItem } from '../components/TableOfContents';

const TOC_ITEMS: TocItem[] = [
  { id: 'nextjs', label: 'Next.js (App & Pages Router)' },
  { id: 'vite', label: 'Vite & Frontend (React/Vue/Svelte)' },
  { id: 'express', label: 'Express, Fastify & Koa' },
  { id: 'nestjs', label: 'NestJS' },
  { id: 'bun-deno', label: 'Bun & Deno Runtimes' },
];

export const FrameworksPage: React.FC = () => {
  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 space-y-12">
        <header className="space-y-3 pb-6 border-b border-slate-800">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Framework Integration Recipes
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Production-ready recipes for injecting EnvBoot guards across modern full-stack frameworks, frontend bundlers, and backend servers.
          </p>
        </header>

        {/* Next.js */}
        <section id="nextjs" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">Next.js (App Router & Pages Router)</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            In Next.js, initialize EnvBoot at the top of your root layout or entry configuration:
          </p>

          <CodeBlock
            language="tsx"
            filename="src/app/layout.tsx (App Router)"
            code={`import envboot from "envboot";

// Verify environment before layout renders or server components mount
envboot.init();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}
          />

          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            Alternatively, to guard the Next.js compilation step before webpack/turbopack starts:
          </p>

          <CodeBlock
            language="javascript"
            filename="next.config.mjs"
            code={`import envboot from "envboot";

// Halt next build if environment variables are missing
envboot.init();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your configuration
};

export default nextConfig;`}
          />
        </section>

        {/* Vite & Frontend */}
        <section id="vite" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">Vite & Frontend (React / Vue / Svelte)</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Browsers cannot access Node.js <code className="font-mono text-cyan-300">process.exit</code>. 
            EnvBoot provides a dedicated, lightweight browser bundle (<code className="font-mono text-emerald-400">envboot/browser</code>) that validates client variables (<code className="font-mono text-cyan-300">import.meta.env</code>) and throws a fatal error overlay before frontend apps mount:
          </p>

          <CodeBlock
            language="tsx"
            filename="src/main.tsx"
            code={`import envboot from "envboot/browser";
import contract from "../.envboot.json";

// Guard frontend environment
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
);`}
          />

          <Callout type="tip" title="Build Guard in package.json">
            Prepend <code className="font-mono text-emerald-400">envboot check</code> to your Vite dev and build scripts:
            <code className="block mt-1 font-mono text-xs bg-slate-900/60 p-2 rounded border border-slate-800 text-emerald-300">
              "dev": "envboot check && vite", "build": "envboot check && tsc -b && vite build"
            </code>
          </Callout>
        </section>

        {/* Express / Fastify / Koa */}
        <section id="express" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">Express, Fastify & Koa</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Place the guard at the very top of your server file before importing database drivers or listening on ports:
          </p>

          <CodeBlock
            language="typescript"
            filename="src/index.ts (Express)"
            code={`import envboot from "envboot";

// Halts with exit code 1 immediately if DATABASE_URL or PORT are missing
envboot.init();

import express from "express";
import { connectDatabase } from "./db";

const app = express();
const port = process.env.PORT || 3000;

await connectDatabase(process.env.DATABASE_URL!);

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});`}
          />
        </section>

        {/* NestJS */}
        <section id="nestjs" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">NestJS</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            In NestJS applications, invoke <code className="font-mono text-emerald-400">envboot.init()</code> in <code className="font-mono text-slate-300">src/main.ts</code> before creating the application factory:
          </p>

          <CodeBlock
            language="typescript"
            filename="src/main.ts"
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

        {/* Bun & Deno */}
        <section id="bun-deno" className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">Bun & Deno Runtimes</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            EnvBoot has zero dependencies and natively detects variables accessed via <code className="font-mono text-cyan-300">Bun.env</code> and <code className="font-mono text-cyan-300">Deno.env</code>:
          </p>

          <CodeBlock
            language="typescript"
            filename="server.ts (Bun)"
            code={`import envboot from "envboot";

envboot.init();

Bun.serve({
  port: Bun.env.PORT || 3000,
  fetch(req) {
    return new Response("OK");
  },
});`}
          />
        </section>
      </div>

      <TableOfContents items={TOC_ITEMS} />
    </div>
  );
};
