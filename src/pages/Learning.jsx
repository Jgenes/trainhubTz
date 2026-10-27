import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const courses = [
  {
    title: "JavaScript Fundamentals",
    progress: 35,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Fullstack Web Development",
    progress: 60,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Data Science & AI",
    progress: 15,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "PHP & MySQL Backend",
    progress: 80,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
];

const tabs = [
  { id: "all", label: "All courses" },
  { id: "in-progress", label: "In progress" },
  { id: "finished", label: "Finished" },
  { id: "certifications", label: "Certifications" },
];

export default function Learning() {
  const [activeTab, setActiveTab] = useState("all");

  const counts = {
    all: courses.length,
    "in-progress": courses.filter((course) => course.progress < 100).length,
    finished: courses.filter((course) => course.progress >= 100).length,
    certifications: courses.filter((course) => course.progress >= 100).length,
  };

  const visibleCourses = courses.filter((course) => {
    if (activeTab === "finished" || activeTab === "certifications") {
      return course.progress >= 100;
    }
    if (activeTab === "in-progress") return course.progress < 100;
    return true;
  });

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />

      <main id="main" className="page__main">
        <section className="learning-banner">
          <div className="container">
            <h1 className="learning-banner__title">My learning</h1>
            <p className="learning-banner__lead">
              Pick up where you left off and keep your weekly streak going.
            </p>

            <div className="tabs" role="group" aria-label="Filter my courses">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`tab${activeTab === tab.id ? " is-active" : ""}`}
                  aria-pressed={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                  <span className="tab__count">{counts[tab.id]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="container mt-5" aria-labelledby="streak-title">
          <div className="streak">
            <div>
              <h2 className="streak__title" id="streak-title">
                Start a weekly streak
              </h2>
              <p className="streak__text">Let&apos;s chip away at your learning goals.</p>
            </div>

            <div className="streak__right">
              <div className="streak__count">
                <strong>0</strong>
                <span>weeks</span>
                <small>Current streak</small>
              </div>

              <div className="streak__week">
                <span className="streak__check" aria-hidden="true">
                  <i className="bi bi-check-lg" />
                </span>
                <span>
                  <span className="d-block text-sm fw-semibold">1 / 1 visit</span>
                  <span className="d-block text-xs text-muted-ink">Jan 19 – 26</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="container mt-4 mb-5" aria-label="My courses">
          {visibleCourses.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon" aria-hidden="true">
                <i className="bi bi-mortarboard" />
              </span>
              <h2 className="empty-state__title">Nothing here yet</h2>
              <p className="empty-state__text">
                Courses you finish or earn certificates for will appear in this tab.
              </p>
              <Link className="btn btn-primary btn-sm empty-state__action" to="/trainings">
                Browse trainings
              </Link>
            </div>
          ) : (
            <div className="course-grid">
              {visibleCourses.map((course) => (
                <Link
                  className="learning-card"
                  to="/courseLearning"
                  key={course.title}
                >
                  <span className="learning-card__media" aria-hidden="true">
                    <img src={course.image} alt="" loading="lazy" />
                  </span>

                  <span className="learning-card__body">
                    <span className="learning-card__title">{course.title}</span>

                    <span
                      className="progress"
                      role="progressbar"
                      aria-valuenow={course.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`${course.title} progress`}
                    >
                      <span
                        className="progress-bar"
                        style={{ width: `${course.progress}%` }}
                      />
                    </span>

                    <span className="learning-card__meta">
                      <span>{course.progress}% complete</span>
                      <span className="course-card__cta">
                        Continue <i className="bi bi-arrow-right" aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
