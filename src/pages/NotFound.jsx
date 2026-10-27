import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />

      <main id="main" className="page__main">
        <div className="container section">
          <div className="status-hero">
            <span className="status-hero__icon" aria-hidden="true">
              <i className="bi bi-signpost-split" />
            </span>
            <h1 className="status-hero__title">Page not found</h1>
            <p className="status-hero__text">
              The page you are looking for may have been moved or no longer exists.
              Try browsing the catalogue instead.
            </p>
            <div className="btn-row justify-content-center">
              <Link className="btn btn-primary" to="/trainings">
                Browse trainings
              </Link>
              <Link className="btn btn-secondary-ink" to="/">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
