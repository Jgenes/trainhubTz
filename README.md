# TrainingHub TZ — frontend

## API configuration

The app talks to the live Laravel API at **`https://api.traininghubtz.co.tz/api`**
and loads uploaded files from `https://api.traininghubtz.co.tz/storage`.

The base URL is defined in `src/api/config.js` and can be overridden per
environment with Vite env vars (copy `.env.example` to `.env.local`):

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `https://api.traininghubtz.co.tz/api` | Axios `baseURL` for every API call |
| `VITE_STORAGE_BASE_URL` | `<API origin>/storage` | Prefix for course banners / uploaded files |
| `VITE_API_PROXY_TARGET` | `https://api.traininghubtz.co.tz` | Dev-server proxy target for relative `/api` requests |

Production builds **ignore** localhost and tunnel hosts (`ngrok`, `trycloudflare`,
`loca.lt`): `vite.config.js` sanitises the value and injects it at build time, so a
stale env var cannot ship a broken bundle. `npm run build` also runs
`scripts/check-api-url.mjs`, which fails if the output still references a private
or tunnel host.

## Getting started

```bash
npm install
npm run dev
```

## Troubleshooting: site still calls an old API host

If the deployed browser console shows requests to a host such as
`https://xxxx.ngrok-free.dev/api/...` with `CORS policy: No
'Access-Control-Allow-Origin' header` and `404`, the browser is running an **old
bundle** — the URL is baked into the JS file at build time.

1. Confirm which bundle is live: view the page source, open the referenced
   `assets/index-*.js`, and search it for `ngrok-free.dev`.
2. Find the leftover value in the build environment:
   `grep -rn "ngrok-free.dev" . --exclude-dir=node_modules --exclude-dir=.git`
   (including `.env*`) and check the hosting dashboard's env vars
   (`VITE_API_BASE_URL`, `VITE_API_URL`, `REACT_APP_API_URL`).
3. Rebuild (`npm run build`) and upload the new `dist/`, then purge the CDN and
   hard-reload. A new content hash in `assets/index-*.js` proves the deploy landed.

Immediate stopgap when you cannot rebuild right away — patch the deployed bundle
on the server:

```bash
cd public_html            # or dist/
sed -i 's|https://unsecurely-unaddressed-stepanie.ngrok-free.dev|https://api.traininghubtz.co.tz|g' assets/index-*.js
```

The file name keeps its old hash, so purge any CDN/cache afterwards.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
