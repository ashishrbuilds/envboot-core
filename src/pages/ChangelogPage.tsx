import React, { useState, useEffect } from 'react';
import { Seo } from '../components/Seo';
import { 
  fetchGitHubReleases, 
  GitHubRelease 
} from '../services/githubReleases';
import { 
  ExternalLink, 
  RefreshCw, 
  Search, 
  Tag, 
  Calendar, 
  Download,
  ChevronRight
} from 'lucide-react';

export const ChangelogPage: React.FC = () => {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetchGitHubReleases(force);
      setReleases(res.releases);
      setLastSynced(res.lastFetched);
    } catch (e) {
      console.error('Error fetching releases:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(false);
  }, []);

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  // Render markdown body nicely into formatted sections
  const renderReleaseBody = (body: string) => {
    if (!body || body.trim() === '') {
      return <p className="text-zinc-500 italic text-xs">No release notes provided.</p>;
    }

    const lines = body.split('\n');
    return (
      <div className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          if (trimmed.startsWith('# ')) {
            return (
              <h3 key={idx} className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white pt-2 pb-1 border-b border-zinc-200 dark:border-zinc-800">
                {trimmed.replace(/^#\s+/, '')}
              </h3>
            );
          }
          if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 pt-1">
                {trimmed.replace(/^###?\s+/, '')}
              </h4>
            );
          }
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const content = trimmed.slice(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0"></span>
                <span>{formatInlineMarkdown(content)}</span>
              </div>
            );
          }
          if (trimmed.startsWith('```')) {
            return null; // Inline simple code handling
          }
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="p-3 my-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/40 text-xs italic rounded-xl text-zinc-600 dark:text-zinc-400">
                {trimmed.replace(/^>\s+/, '')}
              </blockquote>
            );
          }
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }

          return <p key={idx}>{formatInlineMarkdown(line)}</p>;
        })}
      </div>
    );
  };

  // Helper to parse `code` and links in bullet lines
  const formatInlineMarkdown = (text: string) => {
    // Regex for bold **text**, code `code`, and links [text](url)
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|https?:\/\/[^\s]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-zinc-950 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 font-mono text-[11px] sm:text-xs">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('http')) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-400 underline-offset-2 hover:decoration-zinc-900 dark:hover:decoration-white font-mono text-xs break-all"
          >
            {part.length > 40 ? part.slice(0, 37) + '...' : part}
          </a>
        );
      }
      return part;
    });
  };

  const filteredReleases = releases.filter((rel) => {
    const matchesSearch =
      searchQuery === '' ||
      rel.tag_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rel.body?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="max-w-4xl space-y-10 pb-16">
      <Seo
        title="Changelog & Releases — EnvBoot"
        description="Real-time release notes, new features, bug fixes, and version history for EnvBoot, synchronized live from GitHub."
        keywords={[
          'envboot changelog',
          'envboot releases',
          'envboot version history',
          'github releases envboot',
          'envboot updates',
        ]}
        canonicalPath="/docs/changelog"
        type="article"
      />

      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
          <span>Docs</span>
          <ChevronRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
          <span className="text-zinc-900 dark:text-zinc-300 font-medium">Changelog</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Release Changelog
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Live version history, release notes, and breaking changes synchronized directly from GitHub releases.
            </p>
          </div>

          {/* Sync Button */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors shadow-sm disabled:opacity-50"
              title="Pull latest releases from GitHub API"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Syncing...' : 'Sync GitHub'}</span>
            </button>

            <a
              href="https://github.com/ashishrbuilds/envboot/releases"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              title="Open GitHub Releases"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Sync Status Badge */}
        {lastSynced && (
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Synced: {lastSynced}</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span>{releases.length} Release(s) available</span>
          </div>
        )}
      </header>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search releases (e.g. v0.1.6, doctor, sync)..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-sm"
          />
        </div>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && releases.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-zinc-400" />
          <p className="text-xs font-mono text-zinc-500">Connecting to GitHub Releases API...</p>
        </div>
      ) : filteredReleases.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-8 space-y-2">
          <Tag className="w-8 h-8 mx-auto text-zinc-400" />
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">No matching releases found</h3>
          <p className="text-xs text-zinc-500">
            No release matches your search query "{searchQuery}".
          </p>
        </div>
      ) : (
        /* Timeline Container */
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
          {filteredReleases.map((rel, index) => {
            const isLatest = index === 0;

            return (
              <article key={rel.id} className="relative space-y-4 group">
                {/* Node icon on spine */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                    isLatest
                      ? 'border-zinc-900 bg-zinc-900 dark:border-white dark:bg-white shadow-sm ring-4 ring-zinc-200 dark:ring-zinc-800'
                      : 'border-zinc-400 bg-white dark:border-zinc-600 dark:bg-zinc-950 group-hover:border-zinc-900 dark:group-hover:border-zinc-300'
                  }`}
                />

                {/* Release Header */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold font-mono text-zinc-950 dark:text-white tracking-tight">
                      {rel.tag_name}
                    </span>

                    {isLatest && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm">
                        Latest
                      </span>
                    )}

                    {rel.prerelease && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        Pre-release
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono ml-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(rel.published_at)}</span>
                    </div>
                  </div>

                  {/* Author metadata */}
                  {rel.author && (
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                      {rel.author.avatar_url && (
                        <img
                          src={rel.author.avatar_url}
                          alt={rel.author.login}
                          className="w-4 h-4 rounded-full border border-zinc-200 dark:border-zinc-800"
                        />
                      )}
                      <span>Published by</span>
                      <a
                        href={rel.author.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white font-medium"
                      >
                        @{rel.author.login}
                      </a>
                    </div>
                  )}
                </div>

                {/* Release Body Container */}
                <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-4 shadow-sm">
                  {renderReleaseBody(rel.body)}

                  {/* Download Assets / GitHub links footer */}
                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2 font-mono">
                      {rel.tarball_url && (
                        <a
                          href={rel.tarball_url}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>tar.gz</span>
                        </a>
                      )}
                      {rel.zipball_url && (
                        <a
                          href={rel.zipball_url}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>zip</span>
                        </a>
                      )}
                    </div>

                    <a
                      href={rel.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white font-medium transition-colors"
                    >
                      <span>View on GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
