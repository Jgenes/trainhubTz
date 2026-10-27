import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    // The preview environment proxies the dev server under its own host.
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:5174", // backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
