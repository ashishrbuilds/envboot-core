import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <img
                src="/envboot.png"
                alt="EnvBoot Logo"
                className="w-5 h-5 rounded object-contain"
              />
              <span className="text-base font-bold text-zinc-950 dark:text-white">
                EnvBoot
              </span>
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700">
                v0.1.7
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              Zero-runtime-dependency environment contract and validation tool for JavaScript and TypeScript projects. MIT Licensed open-source software.
            </p>
          </div>

          {/* Docs Links */}
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono uppercase tracking-wider">
              Documentation
            </div>
            <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-400">
              <li><Link to="/docs/quickstart" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Quickstart</Link></li>
              <li><Link to="/docs/cli" className="hover:text-zinc-950 dark:hover:text-white transition-colors">CLI Commands</Link></li>
              <li><Link to="/docs/frameworks" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Framework Recipes</Link></li>
              <li><Link to="/docs/ci-cd" className="hover:text-zinc-950 dark:hover:text-white transition-colors">CI/CD Drift Guard</Link></li>
              <li><Link to="/docs/api" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Runtime API</Link></li>
            </ul>
          </div>

          {/* Community & Links */}
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono uppercase tracking-wider">
              Ecosystem
            </div>
            <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-400">
              <li>
                <a 
                  href="https://github.com/ashishrbuilds/envboot" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  GitHub Repository <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.npmjs.com/package/envboot" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  npm Registry <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/playground" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Interactive Playground
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            MIT © {new Date().getFullYear()}{' '}
            <a
              href="https://github.com/ashishrbuilds"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-2 font-medium"
            >
              Ashish Ranjan
            </a>{' '}
            &{' '}
            <a
              href="https://github.com/ashishrbuilds/envboot/graphs/contributors"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-2"
            >
              EnvBoot Contributors
            </a>
            .
          </div>
          <div className="font-mono text-[11px]">
            Guarding environments with zero runtime dependencies.
          </div>
        </div>
      </div>
    </footer>
  );
};
