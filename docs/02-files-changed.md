# TrainingHub redesign — files changed

Branch: `arena/97a4e85c-trainhubtz` (from `main` @ `accb720`)
Change summary: **54 tracked files modified/deleted, 14 new paths** — 5 409 insertions,
6 169 deletions (net −760 lines, despite the new token/component layer).

Legend: **NEW** = added in this work · **REWRITTEN** = same file/API, new implementation ·
**UPDATED** = targeted changes · **DELETED** = removed after confirming zero references.

---

## 1. Design system (new)

| File | What it holds |
|---|---|
| `src/styles/tokens.css` | **NEW** — single source of truth: brand ramp `#eff5fd → #05162f` (800 = original navy `#0a2e67`), accent teal, amber, ink neutrals, semantic surfaces/borders, success/warning/danger/info, type scale (12 → 30px), spacing 0–12, radii 4/8/12/16/22/pill, shadows, focus ring, z-index, container widths, Bootstrap variable overrides |
| `src/styles/base.css` | **NEW** — reset, body typography, link/heading defaults, focus-visible rules, skip link, container, section rhythm, utilities, reduced-motion block |
| `src/styles/components.css` | **NEW** — buttons (primary/secondary/ghost/danger/quiet/link), forms (fields, validation, help text, input groups, phone input), header/nav/dropdown/mobile drawer, footer, cards, badges/status pills, tabs, dialogs, tables, pagination, empty states, toasts, stepper |
| `src/styles/pages.css` | **NEW** — page-specific layouts: home sections, catalogue, course detail/player, auth pages, checkout, onboarding, provider workspace |
| `src/styles/dataTableStyles.js` | **NEW** — one `customStyles` object for `react-data-table-component`, replacing three per-page copies |
| `src/hooks/useDialogFocus.js` | **NEW** — focus trap, Escape, scroll lock and focus restore for dialogs |
| `src/hooks/useTabKeys.js` | **NEW** — Arrow/Home/End handling for the ARIA tabs pattern |
| `src/utils/auth.js` | **NEW** — one place that reads/clears the session (`token`, `user`), plus display-name/initials helpers |

Deleted stylesheets (all superseded, none imported any more):

`src/app.css` · `src/index.css` · `src/dashboard.css` · `src/pages/app.css` ·
`src/pages/provider/dashboard.css` · `src/pages/provider/dashboard.rtl.css`

---

## 2. App shell

| File | Change |
|---|---|
| `index.html` | **REWRITTEN** — `lang="en"`, description/OG/theme-color/`og:image` meta, PNG favicon + apple-touch-icon, removed unused CDN links, TrainHub TZ titles |
| `public/favicon.png` · `public/apple-touch-icon.png` · `public/og-image.png` | **NEW** — derived from the supplied TrainHub TZ logo (see `04-brand-and-logo.md`) |
| `public/vite.svg` | **DELETED** |
| `src/main.jsx` | **REWRITTEN** — imports tokens → base → components → pages, mounts `App` + `ToastContainer`; old six-stylesheet imports removed |
| `src/App.jsx` | **REWRITTEN** — eager public pages, `React.lazy` + `Suspense` for 8 provider pages, `WorkspaceFallback`, per-route `document.title` + scroll-to-top, `/learning` and `/courseLearning` wrapped in `RequireAuth`, 21 routes + catch-all → 404 |
| `vite.config.js` | **UPDATED** — dev/preview bind `0.0.0.0` with `allowedHosts` so the proxied preview works; `/api` proxy retained |

---

## 3. Components

### New

`Logo.jsx` (supplied TrainHub TZ artwork, `inverse` + `size` variants) · `NavBar.jsx` ¹ · `Footer.jsx` ¹ ·
`Dropdown.jsx` (keyboard-accessible menu primitive) · `Modal.jsx` (dialog shell) ·
`ConfirmDialog.jsx` (replaces `window.confirm`) · `RequireAuth.jsx` (learner route guard) ·
`CourseCard.jsx` (one card for every listing) · `PartnerStrip.jsx` · `HeroBanner.jsx` ·
`CategoryChips.jsx` · `NewReleasesCourses.jsx` · `TrendingCourses.jsx` · `PromoCards.jsx` ·
`CourseHero.jsx` · `CourseMetaBar.jsx` · `AboutTab.jsx` ¹ · `CourseDescription.jsx` ·
`AuthLayout.jsx` · `StatusBadge.jsx` · `CapacityBadge.jsx` · `DashboardCards.jsx` ·
`ProgramTabs.jsx` · `OutcomesTab.jsx` · `CoursesTab.jsx`

¹ Listed under “new” because the implementation is new; the filename is unchanged where the
original file already existed and was rewritten in place.

### Rewritten in place

`CourseContentSideBar.jsx` · `coursePublishBar.jsx` (publish checklist moved off inline
styles and emoji onto the design system; still holds the publishing rules).

### Deleted

`CourseraChoices.jsx` (unused, contained “Coursera” copy on a TrainingHub site) ·
`CardSlider.jsx` (replaced by `PartnerStrip`).

---

## 4. Pages

| File | Change |
|---|---|
| `src/pages/Home.jsx` | **REWRITTEN** — hero, partner strip, value props, featured programme, trending, new releases, categories, promo cards; duplicate sections removed |
| `src/pages/trainings.jsx` | **REWRITTEN** — catalogue with filters (search/category/trainer/start date), sort, empty state, debounced URL query sync (`?q=` stays shareable without blocking typing) |
| `src/pages/Course.jsx` | **REWRITTEN** — breadcrumb, hero, meta bar, curriculum tabs, sticky enrol card |
| `src/pages/CourseLearning.jsx` | **REWRITTEN** — player shell, accessible tabs, lesson sidebar with progress |
| `src/pages/Learning.jsx` | **REWRITTEN** — “My learning” dashboard, filter pills (`aria-pressed`), progress cards, empty/error states |
| `src/pages/Login.jsx` | **REWRITTEN** — split auth layout, inline validation, password toggle, pass-through of the guarded page (`from`) |
| `src/pages/Register.jsx` | **REWRITTEN** — same fields/validation/API, new layout, accessible phone input |
| `src/pages/tenantRegister.jsx` | **REWRITTEN** — provider sign-up, same POST payload |
| `src/pages/otpVerification.jsx` | **REWRITTEN** — 6-digit code entry, resend hint, returns to the requested page after success |
| `src/pages/Onboarding.jsx` | **REWRITTEN** — 4-step provider onboarding with stepper, review step, same snake_case payload |
| `src/pages/ProviderVerification.jsx` | **UPDATED** — verified-state panel on the new shell |
| `src/pages/TrainingHubCheckout.jsx` | **REWRITTEN** — billing/contact form, payment method tiles, order summary, error summary (loop/payment wiring still placeholder, see remaining issues) |
| `src/pages/NotFound.jsx` | **NEW** — 404 with search + popular links |
| `src/pages/provider/layouts/ProviderDashboardLayout.jsx` | **REWRITTEN** — dark sidebar, mobile drawer, top bar with account menu, auth guard, `Soon` labels for unbuilt sections |
| `src/pages/provider/course.jsx` | **REWRITTEN** — courses table, search, retry panel, delete confirmation dialog, empty states |
| `src/pages/provider/viewCoure.jsx` | **REWRITTEN** — course summary + edit entry point |
| `src/pages/provider/createCourse.jsx` | **REWRITTEN** — sections/outcomes/skills/requirements repeaters, validation, same FormData POST |
| `src/pages/provider/createCohort.jsx` | **REWRITTEN** — intake form, native + custom validation, same cohort payload |
| `src/pages/provider/cohortList.jsx` | **REWRITTEN** — cohorts table with capacity meters, details dialog, search |
| `src/pages/provider/ProviderCohort.jsx` | **REWRITTEN** — cohorts for one course with the same actions/dialogs |
| `src/pages/provider/ProviderEnrollment.jsx` | **REWRITTEN** — enrolments table (still sample rows; no endpoint exists) |
| `src/pages/provider/dashboard.jsx` | unchanged (thin wrapper around `DashboardCards`) |
| `src/pages/provider/cohort.jsx` | **DELETED** — unrouted duplicate with hardcoded demo rows |
| `src/pages/provider/index.jsx` | **DELETED** — unrouted re-export barrel |

---

## 5. What was *not* touched

- `src/api/*` (`axio.js`, `courseServices.js`, auth helpers) — every endpoint, header,
  payload and interceptor is byte-for-byte unchanged.
- Environment variables (`.env*`) and the Vite proxy target.
- Route paths, route params and navigation targets.
- Form field names, validation rules, request bodies and redirects.
- Authentication/storage contract (`token`, `user`, `role`, `loginEmail` keys).
- `package.json` — **no dependency added or removed**. `jsdom`, `axe-core`,
  `puppeteer-core` and `@sparticuz/chromium` were installed with `--no-save` for testing
  only and are not in `package.json`/lockfile.

---

## 6. Evidence

Screenshots of the finished UI live in `docs/screenshots/` (16 files, 3.1 MB):
home (desktop/tablet/mobile/mobile-nav-open), catalogue, course detail, course player,
my learning, login, register (mobile), checkout, provider onboarding, provider dashboard
(desktop + mobile drawer), provider courses, create course.
