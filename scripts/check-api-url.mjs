// Fails the build if the generated bundle still points at a local backend or a
// temporary tunnel (ngrok, cloudflared, localtunnel). Such a bundle loads in the
// browser but every API call dies with ERR_FAILED / CORS, which is hard to spot
// after deployment.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const DIST_DIR = "dist";
const FORBIDDEN = [
  /https?:\/\/localhost[:/]/g,
  /https?:\/\/127\.0\.0\.1[:/]/g,
  /ngrok-free\.(dev|app)/g,
  /[a-z0-9-]+\.ngrok(-free)?\.(dev|io|app)/g,
  /[a-z0-9-]+\.trycloudflare\.com/g,
  /[a-z0-9-]+\.loca\.lt/g,
];

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(js|css|html)$/.test(entry.name)) yield path;
  }
}

const hits = new Map();
try {
  for await (const file of walk(DIST_DIR)) {
    const source = await readFile(file, "utf8");
    for (const pattern of FORBIDDEN) {
      const matches = source.match(pattern);
      if (matches) {
        for (const match of matches) {
          hits.set(match, file);
        }
      }
    }
  }
} catch (error) {
  if (error.code === "ENOENT") {
    console.error(`[check-api-url] No ${DIST_DIR}/ folder found — run "vite build" first.`);
    process.exit(1);
  }
  throw error;
}

if (hits.size > 0) {
  console.error("[check-api-url] Build contains a non-public API host:");
  for (const [match, file] of hits) console.error(`  ${match}  (${file})`);
  console.error(
    "\nSet VITE_API_BASE_URL=https://api.traininghubtz.co.tz/api (and remove any\n" +
      "stale VITE_API_URL / VITE_API_BASE_URL tunnel value from your shell, .env files\n" +
      "and hosting dashboard), then rebuild.",
  );
  process.exit(1);
}

console.log("[check-api-url] OK — bundle points only at public hosts.");
