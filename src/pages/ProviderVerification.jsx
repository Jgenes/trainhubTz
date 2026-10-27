import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function ProviderVerification() {
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
              <i className="bi bi-hourglass-split" />
            </span>
            <h1 className="status-hero__title">Your information is under review</h1>
            <p className="status-hero__text">
              Thanks for submitting your provider details. Our team is verifying your
              organisation — this usually takes a few business days.
            </p>
            <div className="btn-row justify-content-center">
              <Link className="btn btn-primary" to="/provider/dashboard">
                Go to provider dashboard
              </Link>
              <Link className="btn btn-secondary-ink" to="/">
                Back to home
              </Link>
            </div>
          </div>

          <div className="container-narrow px-0 mt-5">
            <div className="panel panel--muted">
              <h2 className="h6 mb-3">What happens next</h2>
              <ul className="check-list">
                <li>
                  <i className="bi bi-1-circle" aria-hidden="true" />
                  We review your registration and contact details.
                </li>
                <li>
                  <i className="bi bi-2-circle" aria-hidden="true" />
                  You will be notified by email once verification is complete.
                </li>
                <li>
                  <i className="bi bi-3-circle" aria-hidden="true" />
                  After approval you can publish courses and open intakes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
