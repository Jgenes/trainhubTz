import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  // Relative /api requests (e.g. from tools or future code) are proxied to the
  // live API. Absolute requests use VITE_API_BASE_URL from src/api/config.js.
  const proxyTarget =
    env.VITE_API_PROXY_TARGET || "https://api.traininghubtz.co.tz";

  return {
    plugins: [react()],
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
