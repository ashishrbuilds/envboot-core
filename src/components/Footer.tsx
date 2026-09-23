import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 dark:border-slate-800/80 dark:bg-slate-950/60 light:border-slate-200 light:bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-base font-bold text-white dark:text-white light:text-slate-900">
                EnvBoot
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                v0.1.7
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Zero-runtime-dependency environment contract and validation tool for JavaScript and TypeScript projects. MIT Licensed open-source software.
            </p>
          </div>

          {/* Docs Links */}
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-slate-200 font-mono uppercase tracking-wider">
              Documentation
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link to="/docs/quickstart" className="hover:text-emerald-400 transition-colors">Quickstart</Link></li>
              <li><Link to="/docs/cli" className="hover:text-emerald-400 transition-colors">CLI Commands</Link></li>
              <li><Link to="/docs/frameworks" className="hover:text-emerald-400 transition-colors">Framework Recipes</Link></li>
              <li><Link to="/docs/ci-cd" className="hover:text-emerald-400 transition-colors">CI/CD Drift Guard</Link></li>
              <li><Link to="/docs/api" className="hover:text-emerald-400 transition-colors">Runtime API</Link></li>
            </ul>
          </div>

          {/* Community & Links */}
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-slate-200 font-mono uppercase tracking-wider">
              Ecosystem
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a 
                  href="https://github.com/ashishrbuilds/envboot" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  GitHub Repository <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.npmjs.com/package/envboot" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  npm Registry <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/playground" className="hover:text-emerald-400 transition-colors">
                  Interactive Playground
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            MIT © {new Date().getFullYear()} Ashish Ranjan & EnvBoot Contributors.
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            Guarding environments with zero runtime dependencies.
          </div>
        </div>
      </div>
    </footer>
  );
};
