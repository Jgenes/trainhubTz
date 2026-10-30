// Central API configuration.
// Override with Vite env vars (see .env.example) without touching source code.
const DEFAULT_API_BASE_URL = "https://api.traininghubtz.co.tz/api";

const trimTrailingSlashes = (value) => value.replace(/\/+$/, "");

const env = import.meta.env ?? {};

export const API_BASE_URL = trimTrailingSlashes(
  (env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).trim(),
);

// The API lives under /api; uploaded files are served from the same origin
// under /storage (Laravel `php artisan storage:link`).
export const API_ORIGIN = API_BASE_URL.replace(/\/api$/i, "");

export const STORAGE_BASE_URL = trimTrailingSlashes(
  (env.VITE_STORAGE_BASE_URL || `${API_ORIGIN}/storage`).trim(),
);

/**
 * Turn a stored file path (e.g. "banners/course.jpg") into a full URL.
 * Absolute URLs are returned unchanged.
 */
export const storageUrl = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${STORAGE_BASE_URL}/${String(path).replace(/^\/+/, "")}`;
};
