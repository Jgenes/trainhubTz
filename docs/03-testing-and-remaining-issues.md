# TrainingHub redesign — testing, verification and remaining issues

Verified on branch `arena/97a4e85c-trainhubtz` against the **production build**
(`npm run build` → `npx vite preview`, Chromium via `puppeteer-core`), not only the
dev server. The Laravel backend (`http://localhost:8000/api`) was **not running** in
this environment, so every API-backed screen was verified in its loading/error/empty
state; successful-response paths were exercised with mocked XHR (see §3).

---

## 0. "My learning" is now a signed-in destination

Requested behaviour: the "My learning" entry point should only appear for a logged-in user.

What changed:

| Layer | Behaviour |
|---|---|
| `src/utils/auth.js` | **NEW** — single source of truth for the session (`token`/`user` in `localStorage`), plus `clearSession()`, `getDisplayName()`, `getInitials()` |
| `src/components/NavBar.jsx` | "My learning" is only rendered in the desktop nav and the mobile drawer when a token exists; it disappears immediately after log out (which now calls `clearSession()`) |
| `src/components/Footer.jsx` | The "My learning" footer link is flagged `authOnly` and filtered out for guests |
| `src/components/RequireAuth.jsx` | **NEW** — `/learning` and `/courseLearning` redirect guests to `/login`, remembering the requested path |
| `src/pages/Login.jsx` → `src/pages/otpVerification.jsx` | The requested path is carried through the OTP step, so after verification the learner lands back on "My learning" instead of the home page. A backend `redirect` still wins if one is returned |

Verified end-to-end with a mocked `/login` + `/verify-otp`:

```
step 1 – guest sent to: /login          (from=/learning)
step 2 – after login:  /otp-verification
step 3 – after OTP:    /learning
token stored: mock-token
nav links: [ 'Trainings', 'My learning', 'For providers' ]
```

Nothing about the API contract changed: the login request, OTP request and the
`token`/`user` storage keys are exactly as before — the guard only reads the token the
existing flow already writes.

> Note: the check is client-side (`localStorage` token present), matching how the
> provider workspace already gated itself. Server-side authorisation is unchanged and
> still belongs to the Laravel API (a `401` continues to redirect to `/login`).

---

## 1. Build and lint

| Check | Command | Result |
|---|---|---|
| Lint | `npx eslint .` | **0 errors, 0 warnings** |
| Production build | `npm run build` | **PASS** — 172 modules, ~3 s |
| Dev server | `npm run dev` | **PASS** — Vite 7.3.0 on port 3000, all routes return 200 |
| Preview server | `npx vite preview` | **PASS** — all routes return 200 (SPA fallback works) |

Bundle after route-level code splitting:

| Chunk | Raw | Gzip |
|---|---|---|
| `index` (shell + public pages) | 406.8 kB | 127.7 kB |
| `dashboard` (chart.js, provider overview) | 167.6 kB | 58.6 kB |
| `dataTableStyles` (react-data-table-component) | 74.1 kB | 24.1 kB |
| provider pages (`course`, `cohortList`, `createCourse`, `createCohort`, `ProviderCohort`, `viewCoure`, `ProviderEnrollment`, layout) | 2.8–10.6 kB each | 1.1–2.7 kB each |
| `index.css` (design system + Bootstrap + icons) | 449.0 kB | 86.6 kB |

---

## 2. Route matrix (66 checks: 22 routes × 3 viewports)

Every route was loaded at **1440px (desktop), 820px (tablet) and 390px (mobile)** and
checked for: rendered `<h1>`, horizontal overflow, `<title>` suffix, and the presence of
header/main/footer landmarks.

```
LAYOUT 66 checks, 0 problems
```

Result per route: **no horizontal overflow at any width, a unique page title on every
route, and one `<h1>` per page** (previous markup had none on several pages).

Routes covered: `/`, `/trainings`, `/course`, `/learning`, `/courseLearning`, `/login`,
`/register`, `/tenant-register`, `/otp-verification`, `/tenant/onboarding`,
`/provider/verification`, `/checkout`, `/provider/dashboard`, `/provider/course`,
`/provider/cohorts`, `/provider/cohorts/:courseId`, `/provider/cohorts/create/:courseId`,
`/provider/cohortlist/:courseId`, `/provider/viewCourse/:id`, `/provider/enrollments`,
`/provider/createCourse`, and the catch-all `*` → 404 page.

---

## 3. Interaction tests (headless Chromium, production build)

| # | Scenario | Result |
|---|---|---|
| 1 | Catalogue text search narrows 10 → 1 card and updates the result count | PASS |
| 2 | Search + category filter combine into the "No trainings found" empty state | PASS |
| 3 | "Clear filters" restores all 10 cards and empties the search box | PASS |
| 4 | Header search submits to `/trainings?q=…` with the query applied | PASS |
| 5 | Account dropdown opens, Escape closes it, focus returns to the trigger | PASS |
| 6 | Course curriculum disclosure opens/closes natively (`<details>`) | PASS |
| 7 | Lesson preview modal opens with focus on the close button | PASS |
| 8 | Tab cycles inside the modal (focus trap) | PASS |
| 9 | Escape closes the modal and returns focus to the lesson button | PASS |
| 10 | Tabs respond to ArrowRight with roving tabindex (`aria-selected` moves) | PASS |
| 11 | Login blocks empty submit and shows two inline field errors + `aria-invalid` | PASS |
| 12 | Password visibility toggle switches input type | PASS |
| 13 | Checkout blocks submit without a payment method (error summary) | PASS |
| 14 | Checkout blocks submit without accepting the terms | PASS |
| 15 | Mobile menu opens, closes on navigation, and closes on Escape | PASS |
| 16 | First Tab lands on the skip link with a visible 2px outline | PASS |
| 17 | Create-cohort form blocks empty submit via native validation, focuses first invalid field | PASS |
| 18 | `prefers-reduced-motion: reduce` removes transitions/animations | PASS |
| 19 | No horizontal overflow at 320/390/768/1024/1440 px on the catalogue | PASS |
| 20 | **Guest does not see "My learning"** in header, mobile drawer or footer | PASS |
| 21 | **Guest visiting `/learning` or `/courseLearning` is redirected to `/login`**, which remembers the requested page | PASS |
| 22 | **Signed-in user sees "My learning"** in header, mobile drawer, footer and account menu; the link shows the active state | PASS |
| 23 | **Full login flow (mocked API): `/learning` → `/login` → `/otp-verification` → back to `/learning`**, nav updates after verification | PASS |
| 24 | Log out clears the token and hides "My learning" again | PASS |

Scripts used were temporary and have been removed from the repo; the assertions above are
reproducible with `puppeteer-core` + `@sparticuz/chromium` pointed at `vite preview`.

> Backend note: `/login` and `/verify-otp` were answered by request interception
> (mocked JSON) to validate the redirect chain. No API contract, endpoint or payload
> was changed — the mock only stood in for the absent server.

---

## 4. Accessibility

Automated audit with **axe-core 4.14** (tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`,
`wcag22aa`, `best-practice`) in real Chromium, with colour contrast included (unlike a
jsdom run):

```
AXE 20 audits, 0 with violations
AXE 44 audits, 0 with violations   (earlier full sweep across all 22 routes at 2 widths)
```

That sweep covers both guest views and signed-in provider views at 1440px and 390px, plus
open-state audits for the mobile navigation, the account dropdown, an open dialog and the
provider drawer (`no violations` in every open state).

Fixes that came out of the audit:

- Dialog focus trap + focus return + `aria-modal` (`src/hooks/useDialogFocus.js`, `src/components/Modal.jsx`).
- Scrollable data tables are keyboard-reachable (`tabIndex={0}` + visible focus ring).
- `document.title` now changes per route, with a `· TrainingHub` suffix.
- Announcement bar is a labelled landmark; brand link has a real accessible name.
- In-text links are underlined instead of relying on colour alone.
- Chart canvas has a text alternative describing the data.
- Provider account button exposes a screen-reader-only name at every breakpoint.
- Loading/empty states announce their own status outside `role="table"` containers.

**Limitation:** automated checks cannot prove WCAG 2.2 AA conformance. A manual pass with
a screen reader (NVDA/VoiceOver) and at 200–400 % zoom is still recommended.

---

## 5. Known issues and recommendations

### 5.1 Deliberately not changed (existing behaviour, needs product/backend input)

1. **`ProviderEnrollment.jsx` still renders hardcoded sample rows.** There is no
   enrolments endpoint in `src/api`; wiring it up needs an API contract. The table is
   styled and responsive, but the data is demo data that predates this work.
2. **`TrainingHubCheckout.jsx` submits to a placeholder flow.** The form validates and
   builds the payment payload locally; no payment endpoint exists in the codebase.
3. **`/learning` and `/courseLearning` show static learner data.** The "My learning"
   page is now gated behind login, but the course list/progress still comes from the
   existing in-file sample data because no learner endpoint is called anywhere in the app.
4. **No real provider auth check server-side in the layout.** The provider layout guards on
   a token in `localStorage` (as it did before); a 401 from the API still triggers the axios
   interceptor redirect.
5. **Password reset** remains a "coming soon" toast (unchanged).

### 5.2 Improvements worth scheduling

- **Split the 449 kB stylesheet** — Bootstrap + Bootstrap Icons + design system are loaded
  together. Targeting only the used Bootstrap modules, or self-hosting a subset icon font,
  would cut ~40 % of the CSS.
- **Remote imagery** — course cards on `/learning`, `/trainings` and the home page point at
  Unsplash/ui-avatars URLs. In an offline or rate-limited environment they fall back to the
  designed placeholder tile, but bundling local assets would remove the external dependency
  (the repo already ships `banner1.jpg`, `banner2.jpg`, `pdpc.png`, `udsm.jpg`, partner logos).
- **`react-data-table-component`** is only used by three provider tables; a small
  design-system table would remove its 74 kB chunk and its inline `<style>` injection.
- **Provider dashboard data** is still the original sample series (45 courses / 12 cohorts /
  350 enrolments). Once `/provider/dashboard` stats exist, `DashboardCards` should take props
  instead of constants.
- **Manual accessibility testing** with a screen reader and zoom, as noted above.
- **RTL / localisation** — the old `dashboard.rtl.css` was deleted with the rest of the
  unreferenced stylesheets; if Swahili/Arabic locales are planned, the token layer is ready
  for logical properties.

### 5.3 Cleanup performed

Deleted (all confirmed unreferenced by `grep` before removal):

```
src/pages/provider/index.jsx        src/pages/provider/cohort.jsx
src/pages/provider/dashboard.css    src/pages/provider/dashboard.rtl.css
src/pages/app.css                   src/dashboard.css
src/app.css                         src/index.css
src/components/CourseraChoices.jsx  src/components/CardSlider.jsx
public/vite.svg
```

`src/components/coursePublishBar.jsx` was kept (nothing mounts it today) but was rewritten
onto the design system because it holds the course-publishing rules; if the feature is
dropped, the file can be deleted.

---

## 6. How to reproduce

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production bundle in dist/
npx vite preview   # serve the production build on :4173
npx eslint .
```

The Laravel API is expected at `http://localhost:8000/api` (`src/api/axio.js`). With the API
stopped, `toast` errors and a "We could not load your courses" panel with a Retry button are
the expected, designed behaviour — not a regression.
