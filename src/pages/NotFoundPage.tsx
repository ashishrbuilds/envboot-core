import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';
import { Seo } from '../components/Seo';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Seo
        title="404 — Page Not Found"
        description="The documentation page you are looking for could not be found."
      />

      <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-xl w-full text-center space-y-8">
          {/* Terminal-inspired Contract Drift Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>404: ROUTE_UNDEFINED</span>
          </div>

          {/* Heading and explanation */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
              The contract definition for this path does not exist. The page may have been relocated, renamed, or never declared in the manifest.
            </p>
          </div>

          {/* Simulated EnvBoot Terminal output */}
          <div className="bg-zinc-950 text-left rounded-xl p-4 border border-zinc-800 shadow-xl shadow-black/20 font-mono text-xs text-zinc-300 overflow-hidden">
            <div className="flex items-center gap-1.5 pb-3 border-b border-zinc-800 text-[11px] text-zinc-500">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-zinc-400">envboot check --route</span>
            </div>
            <div className="pt-3 space-y-1 text-[11px] leading-relaxed">
              <p className="text-zinc-500">$ npx envboot check {typeof window !== 'undefined' ? window.location.hash : ''}</p>
              <p className="text-rose-400 font-semibold">✖ Contract violation: Missing route contract</p>
              <p className="text-zinc-400">  Diagnosis: Target URL is not mapped in documentation manifest.</p>
              <p className="text-zinc-500">  Recommended action: Return to index or explore documented modules.</p>
            </div>
          </div>

          {/* Recovery Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/docs/quickstart"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Documentation</span>
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-medium text-sm border border-zinc-200 dark:border-zinc-800 transition-colors"
            >
              <Home className="w-4 h-4 text-zinc-500" />
              <span>Back to Home</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Popular Links */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Popular Destinations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <Link
                to="/docs/quickstart"
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                Quickstart
              </Link>
              <Link
                to="/docs/cli"
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                CLI Reference
              </Link>
              <Link
                to="/docs/frameworks"
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                Framework Recipes
              </Link>
              <Link
                to="/docs/api"
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                Runtime API
              </Link>
              <Link
                to="/playground"
                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                Playground
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
