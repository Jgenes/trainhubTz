import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// The live API. Any localhost / tunnel value coming from the shell or a .env
// file is ignored in production builds: ngrok-style hosts are ephemeral and do
// not send CORS headers, so a bundle built against them fails in the browser
// with "No 'Access-Control-Allow-Origin' header" + 404 on every request.
const PRODUCTION_API_BASE_URL = "https://api.traininghubtz.co.tz/api";

const NON_PUBLIC_HOST_PATTERN =
  /(^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])|ngrok(-free)?\.(dev|io|app)|trycloudflare\.com|loca\.lt|\.ngrok\.|\.local(:\d+)?(\/|$))/i;

const trimTrailingSlashes = (value) => value.replace(/\/+$/, "");

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, ".", "");
  const configuredApiBaseUrl = (
    env.VITE_API_BASE_URL ||
    env.VITE_API_URL ||
    ""
  ).trim();

  const isProductionBuild = command === "build";
  const canUseConfiguredUrl =
    Boolean(configuredApiBaseUrl) &&
    !NON_PUBLIC_HOST_PATTERN.test(configuredApiBaseUrl);

  if (isProductionBuild && configuredApiBaseUrl && !canUseConfiguredUrl) {
    console.warn(
      `\n[api-config] Ignoring non-public API host "${configuredApiBaseUrl}" in this build; ` +
        `using ${PRODUCTION_API_BASE_URL} instead.\n`,
    );
  }

  const apiBaseUrl = trimTrailingSlashes(
    isProductionBuild
      ? canUseConfiguredUrl
        ? configuredApiBaseUrl
        : PRODUCTION_API_BASE_URL
      : configuredApiBaseUrl || PRODUCTION_API_BASE_URL,
  );

  const apiOrigin = apiBaseUrl.replace(/\/api$/i, "");
  const storageBaseUrl = trimTrailingSlashes(
    (env.VITE_STORAGE_BASE_URL || `${apiOrigin}/storage`).trim(),
  );

  // Relative /api requests (e.g. from tools or future code) are proxied to the
  // live API. Absolute requests use the values injected below.
  const proxyTarget =
    env.VITE_API_PROXY_TARGET || "https://api.traininghubtz.co.tz";

  return {
    plugins: [react()],
    define: {
      __API_BASE_URL__: JSON.stringify(apiBaseUrl),
      __STORAGE_BASE_URL__: JSON.stringify(storageBaseUrl),
    },
    server: {
      host: "0.0.0.0",
      // The preview environment proxies the dev server under its own host.
      allowedHosts: true,
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    preview: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
