import NavBar from "./NavBar";
import Footer from "./Footer";

const defaultPoints = [
  "Accredited courses from universities, colleges and regulators",
  "Compare intakes, schedules and fees in one place",
  "Enrol online and pay with mobile money",
];

/**
 * Shared shell for authentication pages: marketing panel on the left,
 * focused form card on the right.
 */
export default function AuthLayout({
  title,
  lead,
  asideTitle = "Professional training, made simple.",
  asideText = "Join learners across Tanzania discovering courses from trusted training providers.",
  points = defaultPoints,
  wide = false,
  children,
  footer,
}) {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />

      <main id="main" className="page__main">
        <div className="auth">
          <aside className="auth__aside" aria-hidden="true">
            <div>
              <p className="eyebrow eyebrow--inverse">TrainingHub</p>
              <h2 className="auth__aside-title">{asideTitle}</h2>
              <p className="auth__aside-text">{asideText}</p>

              <ul className="auth__aside-list">
                {points.map((point) => (
                  <li key={point}>
                    <i className="bi bi-check2-circle" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <p className="auth__aside-footer mb-0">
              © {new Date().getFullYear()} TrainingHub · Dar es Salaam, Tanzania
            </p>
          </aside>

          <div className="auth__panel">
            <div className={`auth-card${wide ? " auth-card--wide" : ""}`}>
              <h1 className="auth-card__title">{title}</h1>
              {lead ? <p className="auth-card__lead">{lead}</p> : null}
              {children}
              {footer ? <div className="auth-card__foot">{footer}</div> : null}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
