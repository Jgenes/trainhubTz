# TrainingHub — UI audit (before the redesign)

Scope: everything under `src/` at commit `accb720` (branch `main`), reviewed file by file.
Goal of the audit: describe the *existing* UI problems accurately, not to criticise the product.

---

## 1. Stack and architecture (unchanged by this work)

| Area | Detail |
|---|---|
| Framework | React 18.3 + Vite 7.3, `react-router-dom` 7.11 (`BrowserRouter`, flat route list in `src/App.jsx`) |
| Styling | Bootstrap 5.3 CSS + `react-bootstrap` components + four hand-written stylesheets (`src/app.css`, `src/index.css`, `src/dashboard.css`, `src/pages/app.css`, `src/pages/provider/dashboard.css`, `dashboard.rtl.css`) |
| Icon/styling libs | `bootstrap-icons`, `react-icons` (Font Awesome set used in provider tables) |
| Data/tables/charts | `axios` (`src/api/axio.js`), `react-data-table-component`, `chart.js` + `react-chartjs-2` |
| Forms/UX | `react-toastify`, `react-phone-input-2`, `classnames`, `mdb-react-ui-kit` (installed, never imported) |
| Backend | Laravel API on `http://localhost:8000/api` via `VITE_API_URL` / `baseURL` in `src/api/axio.js` |
| Routes | 21 routes + catch-all; provider area (dashboard, courses, cohorts, enrolments, create/edit flows) shares a sidebar layout |

None of the above was replaced. No dependency was added or removed.

---

## 2. Visual-design findings

### 2.1 Typography
- Body copy was **12–13px** in tables, cards and meta rows (`small`, `fs-6`, ad-hoc `font-size: 0.75rem`), with headings jumping between `h2`–`h6` and utility classes, so the hierarchy depended on Bootstrap defaults rather than a scale.
- No font stack was declared; the site rendered in the OS default (Arial/Helvetica on Windows, DejaVu on Linux), which is the single biggest cause of the "dated" look.
- Line height was left at Bootstrap's 1.5 on long descriptions, and several headings had no letter-spacing or margin control, so blocks read as a flat wall of text.

### 2.2 Colour
- The only brand colour was `#0a2e67` used ad hoc; everything else was Bootstrap's default primary `#0d6efd`, success `#198754`, danger `#dc3545`, which clashed with the navy brand.
- Inline hex values appeared in JSX (`style={{ color: "#6c757d" }}`, `borderColor: "rgba(13,110,253,0.9)"`), so the same "grey" and "blue" existed in five slightly different shades.
- No semantic tokens: "muted text", "border", "surface" and "disabled" were re-invented per file.

### 2.3 Spacing and layout
- Sections used a mix of `mt-4`, `mb-5`, `py-5` and bespoke pixel values; vertical rhythm changed from page to page.
- Several layouts used **negative offsets and absolute positioning as layout primitives** (hero art, promo cards, course-sidebar), which broke whenever text wrapped or the viewport narrowed.
- Cards had inconsistent radii (0, 4px, 8px, `1rem`) and inconsistent shadows (`shadow-sm`, custom `box-shadow`), producing visible "seams" between adjacent sections.
- Content width was inconsistent: some sections were full-bleed Bootstrap containers, others were fixed-width blocks, so left edges did not line up down the page.

### 2.4 Components
- **Buttons**: five competing styles (`btn btn-primary`, `btn btn-dark`, custom `.btn-subscribe`, `btn-outline-secondary`, bare `<button>` in `coursePublishBar`) with different radii and paddings; hover/active/disabled states were whatever Bootstrap shipped.
- **Navigation**: the header was a Bootstrap navbar with no active-route state, no keyboard support for the account menu, and a mobile menu that did not close on navigation. Several nav links pointed at routes that do not exist (`/explore`, `/about`, `/my-learning`, `/dashboard`, `/tenant/*`), i.e. links into the catch-all page.
- **Dropdowns**: account menu was `react-bootstrap`'s `Dropdown` mixed with a hand-rolled `.show` class; no `aria-expanded`/`aria-controls`, no Escape handling, no focus return.
- **Modals**: the lesson-preview modal and the two cohort dialogs each re-implemented overlay + Escape + body-scroll locking; none trapped focus, and two used `role="dialog"` without `aria-modal`.
- **Tables**: `react-data-table-component` was styled page-by-page, so the courses, cohorts and enrolments tables looked different from each other; on narrow screens tables overflowed without a keyboard-reachable scroll container.
- **Forms**: labels were mostly rendered as `<div className="form-label">` with **no `htmlFor`/`id` pairing**, so screen readers announced unlabelled inputs; errors appeared only as a toast, never next to the field; no `aria-invalid`, no `aria-describedby`, no error summary.
- **Cards**: three different course-card implementations (New releases, Trending, Learning) with different image ratios, meta rows and CTA placement.

### 2.5 Content and iconography
- Emoji used as icons (`✅`, `❌` in the publish bar), mixed with Bootstrap icons and Font Awesome icons in the same table.
- Language mixing: Swahili and English strings inside the same screens, and "Coursera" branding leaked into one component (`CourseraChoices`: "What brings you to Coursera today?").
- Duplicated home-page sections (two "trending"-style lists, two logo strips) that repeated the same information with different visual treatment.

### 2.6 Responsiveness
- Breakpoints were Bootstrap's, but custom CSS used `max-width` media queries that fought them; the provider sidebar left a permanent 240px gutter under 992px, squeezing the content instead of collapsing.
- Hero, promo cards and course sidebar relied on absolute positioning, so at 390px they either overflowed horizontally or overlapped text.
- Touch targets: icon-only buttons (table row actions, announcement close, mobile menu toggle) were ~24–28px, below the 44px comfortable minimum.
- Nothing prevented the page-wide horizontal scrollbar that appeared on `/courseLearning` and on the provider tables.

---

## 3. Accessibility findings (WCAG 2.1/2.2 AA)

| # | Issue | Where |
|---|---|---|
| 1 | Icon-only buttons without an accessible name | table row actions, announcement close, carousel dots |
| 2 | `<a>` wrapping `<button>` (invalid nesting, double activation) | home hero CTAs, promo cards |
| 3 | No visible focus style (global `outline: none` inherited from a reset) | all interactive elements |
| 4 | Form fields without programmatic labels | login, register, onboarding, checkout, cohort forms |
| 5 | Errors announced only through toasts | login, register, checkout, course/cohort creation |
| 6 | Modals without focus trap / focus return / `aria-modal` | lesson preview, cohort details |
| 7 | Tables without caption or scope, and horizontal overflow unreachable by keyboard | all provider tables |
| 8 | Decorative images without `alt=""`, content images with `alt="image"` | home, course hero |
| 9 | Colour contrast: `#94a3b8` and `#a5b4c8` body text on white ≈ 2.4:1, `#0d6efd` links on `#f8f9fa` ≈ 3.9:1 | meta rows, footer links, small labels |
| 10 | `prefers-reduced-motion` ignored (autoplaying hero animation, scroll smooth behaviour) | home |
| 11 | Page `<title>` never changed on navigation; several pages shared the same title | all routes |
| 12 | Landmark structure: content outside `<main>`, multiple unlabelled `<nav>` | home, provider layout |

---

## 4. Performance / maintainability findings

- Six stylesheets loaded from `main.jsx` **plus** `Tabs.css` imported by a component that no longer existed → build failed with "Can't resolve './Tabs.css'".
- Duplicate CSS for the same components in different files (`.card` overridden three times), making a single change require three edits.
- `!important` used to win specificity fights against Bootstrap (~20 occurrences).
- Dead files: `src/pages/provider/index.jsx`, `src/pages/provider/cohort.jsx` (hardcoded demo rows), `src/components/CourseraChoices.jsx`, `src/components/CardSlider.jsx` (replaced by the partner strip), three unused stylesheets.
- Every route was eagerly imported, so the provider workspace (chart.js + data-table) was in the initial bundle.

---

## 5. What this implied for the redesign

1. Introduce **one design-token layer** and delete the competing stylesheets rather than patching them.
2. Rebuild the shell (skip link, header, footer, provider sidebar) once, because every page inherits it.
3. Keep every route, API call, validation rule and prop contract; only markup, classes and interaction details change.
4. Fix accessibility at the component level (buttons, fields, dialogs, tables) so it is not re-implemented per page.
5. Split the bundle along the existing route boundaries with `React.lazy`, since no feature had to move.
