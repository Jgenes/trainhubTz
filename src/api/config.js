/* global __API_BASE_URL__, __STORAGE_BASE_URL__ */
// Central API configuration.
//
// Production builds get their values injected by vite.config.js, which
// guarantees the bundle never points at localhost or an ephemeral tunnel
// (ngrok / cloudflared / localtunnel) even if such an env var is left over in
// the shell, a .env file or a hosting dashboard.
//
// `npm run dev` still honours VITE_API_BASE_URL / VITE_API_URL from .env.local.
const FALLBACK_API_BASE_URL = "https://api.traininghubtz.co.tz/api";

const injectedApiBaseUrl =
  typeof __API_BASE_URL__ === "string" ? __API_BASE_URL__ : "";

const devApiBaseUrl = import.meta.env.DEV
  ? (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "").trim()
  : "";

export const API_BASE_URL =
  injectedApiBaseUrl || devApiBaseUrl || FALLBACK_API_BASE_URL;

// The API lives under /api; uploaded files are served from the same origin
// under /storage (Laravel `php artisan storage:link`).
export const API_ORIGIN = API_BASE_URL.replace(/\/api$/i, "");

const injectedStorageBaseUrl =
  typeof __STORAGE_BASE_URL__ === "string" ? __STORAGE_BASE_URL__ : "";

export const STORAGE_BASE_URL =
  injectedStorageBaseUrl || `${API_ORIGIN}/storage`;

/**
 * Turn a stored file path (e.g. "banners/course.jpg") into a full URL.
 * Absolute URLs are returned unchanged.
 */
export const storageUrl = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${STORAGE_BASE_URL}/${String(path).replace(/^\/+/, "")}`;
};
