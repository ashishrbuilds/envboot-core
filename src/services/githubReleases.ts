import fallbackData from '../data/releasesFallback.json';

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  tarball_url?: string;
  zipball_url?: string;
}

const CACHE_KEY = 'envboot_github_releases_cache';
const TIMESTAMP_KEY = 'envboot_github_releases_timestamp';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const REPO_API_URL = 'https://api.github.com/repos/ashishrbuilds/envboot/releases';

export const getCachedReleases = (): GitHubRelease[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getLastFetchedTime = (): string | null => {
  try {
    return localStorage.getItem(TIMESTAMP_KEY);
  } catch {
    return null;
  }
};

export const fetchGitHubReleases = async (
  forceRefresh = false
): Promise<{ releases: GitHubRelease[]; isFromCache: boolean; lastFetched: string }> => {
  const cached = getCachedReleases();
  const cachedTimestampStr = getLastFetchedTime();
  const now = Date.now();

  const isCacheValid =
    !forceRefresh &&
    cached &&
    cached.length > 0 &&
    cachedTimestampStr &&
    now - parseInt(cachedTimestampStr, 10) < CACHE_TTL_MS;

  if (isCacheValid) {
    return {
      releases: cached,
      isFromCache: true,
      lastFetched: new Date(parseInt(cachedTimestampStr, 10)).toLocaleTimeString(),
    };
  }

  try {
    const response = await fetch(REPO_API_URL, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const data: GitHubRelease[] = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(TIMESTAMP_KEY, now.toString());
      } catch (storageErr) {
        console.warn('Unable to persist releases to localStorage:', storageErr);
      }

      return {
        releases: data,
        isFromCache: false,
        lastFetched: new Date(now).toLocaleTimeString(),
      };
    }
  } catch (error) {
    console.warn('Failed to fetch live releases from GitHub, falling back:', error);
  }

  // Graceful fallback to cached or bundled json
  const fallback = cached || (fallbackData as unknown as GitHubRelease[]);
  return {
    releases: fallback,
    isFromCache: true,
    lastFetched: cachedTimestampStr
      ? new Date(parseInt(cachedTimestampStr, 10)).toLocaleTimeString()
      : 'Bundled Snapshot',
  };
};
