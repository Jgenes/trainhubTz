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

## Getting started

```bash
npm install
npm run dev
```

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
