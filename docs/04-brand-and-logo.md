# TrainHub TZ — brand identity applied

The supplied `traininghub logo.png` is now the single source of the brand. Everything below
was derived from that one file with ImageMagick (no re-drawing, no font substitution), so the
globe, the "TrainHub TZ" wordmark and the colours stay exactly as supplied.

Source file: 413 × 127 px RGBA PNG, trim box 347 × 89 px.
Sampled brand colours: wordmark navy `#124a94`, globe blue `#166bd8`,
globe orange `#ffab2f`, "TZ" green `#388951`.

---

## 1. Derived assets (checked in)

| File | Size | Where it is used |
|---|---|---|
| `src/assets/trainhub-logo.png` | 346 × 62 | Header (light surfaces) — globe + wordmark, tagline row cropped off so the lockup stays legible at 38 px tall |
| `src/assets/trainhub-logo-inverse.png` | 346 × 62 | Footer, provider sidebar, auth aside — same lockup with the wordmark recoloured white for navy backgrounds |
| `src/assets/trainhub-mark.png` | 103 × 89 | Source for the favicons, kept for future use (email templates, app icon) |
| `public/favicon.png` | 512 × 512 | `index.html` `<link rel="icon">` (replaces the hand-drawn `favicon.svg`) |
| `public/apple-touch-icon.png` | 180 × 180 | iOS home-screen icon |
| `public/og-image.png` | 1200 × 630 | `og:image` / social share card — full logo with tagline on a light surface |

`public/favicon.svg` (the previous placeholder mark) was deleted.

---

## 2. Component change — `src/components/Logo.jsx`

Before: a text lockup (`TrainingHub` + a subtitle) next to a placeholder SVG mark.
Now: the supplied artwork itself, with `inverse` and `size` props.

```jsx
<Logo />                                  // header, light surface
<Logo inverse />                          // footer, auth aside
<Logo inverse to="/provider/dashboard" size="sm" />   // provider sidebar
```

- `alt="TrainHub TZ"` carries the name; the anchor also has `aria-label="TrainHub TZ — home"`, so
  assistive tech gets one clear name and no repeated text.
- The `<img>` declares intrinsic `width`/`height`, so the header never shifts while it loads.
- Sizes: `sm` 2rem, default 2.375rem, `lg` 2.75rem tall (aspect ratio preserved).

---

## 3. Copy and metadata

| Location | Before | Now |
|---|---|---|
| Header/footer wordmark | "TrainingHub" + "Training marketplace" | the logo artwork (no duplicated text) |
| Page titles | `… · TrainingHub` | `… · TrainHub TZ` |
| `<title>` | TrainingHub — Professional training in Tanzania | TrainHub TZ — Professional training in Tanzania |
| OG title | TrainingHub — Professional training marketplace | TrainHub TZ — Elevating skills. Transforming Tanzania. |
| Meta description | "TrainingHub connects learners…" | "TrainHub TZ connects learners…" |
| Footer | blurb only | tagline "Elevating skills. Transforming Tanzania." above the blurb |
| Footer copyright | © TrainingHub | © TrainHub TZ |
| Auth aside | TRAININGHUB | TRAINHUB TZ (+ copyright line) |
| Provider top bar | "TrainingHub provider workspace" | "TrainHub TZ provider workspace" |
| Home / promo / partner copy | "TrainingHub" | "TrainHub TZ" |

The code identifier `TrainingHubCheckout` (component and filename) was intentionally **not**
renamed — it is an internal symbol, and renaming it would touch routing for no user-visible gain.

---

## 4. Design tokens re-anchored to the logo

The palette in `src/styles/tokens.css` was already navy-led; the accent colours were re-sampled
from the supplied artwork so hover states, badges and highlights match the brand instead of the
old teal:

| Token | Before | Now | Source |
|---|---|---|---|
| `--accent-500` | `#0f9487` (teal) | `#388951` | the "TZ" green |
| `--accent-600` | `#0b7a70` | `#2f7344` | darkened for AA text on white |
| `--accent-700` | `#0a645c` | `#265c37` | — |
| `--accent-50 / -100 / -200` | teal tints | `#ecf7ef / #d1ecda / #a9dab7` | green tints |
| `--amber-400` | `#f0b429` | `#f6a723` | the globe orange |
| `--amber-100 / -600` | `#fdf3d8 / #b45309` | `#fff2dc / #b3540a` | — |
| `--brand-800` (navy) | `#0a2e67` | unchanged | deepened for text contrast; the logo navy `#124a94` is used as supplied in the artwork only |

---

## 5. Verification

Against the production build (`vite preview`), headless Chromium:

- **66 route/viewport checks** (22 routes × 1440 / 820 / 390 px): every page renders its `<h1>`,
  no horizontal overflow, page title ends with `· TrainHub TZ`, and **every `.brand__logo`
  reported `complete && naturalWidth > 0`** (i.e. the new artwork loads on every route).
- Logo renders at 212 × 38 px in the desktop header, 246 × 44 px in the footer,
  201 × 36 px in the provider sidebar/drawer — all with the correct aspect ratio.
- `favicon.png` and `og-image.png` return **200** from the preview server.
- axe-core (WCAG 2.0/2.1/2.2 A+AA + best practice) across 14 audits (guest + signed-in, desktop +
  mobile): **0 violations** — the logo's accessible name passes
  `image-alt`, `label-content-name-mismatch` and `link-name`.
- `npx eslint .` clean, `npm run build` passes.

Screenshots of every surface are in `docs/screenshots/`, including
`header-guest.png` / `header-signed-in.png` (header crops) and `footer-brand.png`.

---

## 6. If you have better source files

The PNG provided is 346 px wide for the lockup — sharp at the sizes used, but it will soften if
printed or shown on a 3× display at large sizes. If a **vector (SVG/AI/EPS)** version of the logo
exists, drop it in `src/assets/trainhub-logo.svg` (plus an inverse variant) and switch the two
imports in `src/components/Logo.jsx`; nothing else needs to change. A 2×/3× PNG export would give
the same benefit with no code change.
