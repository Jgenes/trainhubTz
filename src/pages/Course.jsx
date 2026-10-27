import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CourseHero from "../components/CourseHero";
import CourseMetaBar from "../components/CourseMetaBar";
import AboutTab from "../components/AboutTab";

const includes = [
  { icon: "bi-collection-play", label: "8 course series included" },
  { icon: "bi-hourglass-split", label: "5 weeks · 4–6 hours per week" },
  { icon: "bi-broadcast", label: "Online with flexible schedule" },
  { icon: "bi-award", label: "Shareable certificate on completion" },
];

export default function Course() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />

      <main id="main" className="page__main">
        <nav className="container breadcrumb-bar pt-4" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <i className="bi bi-chevron-right" aria-hidden="true" />
          <Link to="/trainings">Trainings</Link>
          <i className="bi bi-chevron-right" aria-hidden="true" />
          <span aria-current="page">IBM RAG and Agentic AI Professional Certificate</span>
        </nav>

        <CourseHero />
        <CourseMetaBar />

        <div className="container section--tight">
          <div className="course-layout">
            <AboutTab />

            <aside aria-label="Enrolment">
              <div className="enroll-card">
                <p className="enroll-card__label">Course fee</p>
                <p className="enroll-card__price">$20 USD</p>
                <p className="text-sm text-muted-ink mb-3">
                  One-time payment · includes all 8 courses
                </p>

                <p className="enroll-card__deadline">
                  <i className="bi bi-clock" aria-hidden="true" />
                  Enrolment closes 13 Jan
                </p>

                <Link className="btn btn-primary w-100 mt-3" to="/checkout">
                  Enrol now
                  <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>

                <Link
                  className="btn btn-secondary-ink w-100 mt-2"
                  to="/courseLearning"
                >
                  Preview course content
                </Link>

                <ul className="enroll-card__includes">
                  {includes.map((item) => (
                    <li key={item.label}>
                      <i className={`bi ${item.icon}`} aria-hidden="true" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
