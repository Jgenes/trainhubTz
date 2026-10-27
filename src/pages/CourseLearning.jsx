import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CourseContentSidebar from "../components/CourseContentSideBar";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "qa", label: "Q&A" },
  { id: "notes", label: "Notes" },
  { id: "announcements", label: "Announcements" },
  { id: "reviews", label: "Reviews" },
  { id: "tools", label: "Learning tools" },
];

const emptyStates = {
  qa: {
    icon: "bi-chat-left-text",
    title: "No questions yet",
    text: "Discussions for this course will appear here once the cohort starts.",
  },
  notes: {
    icon: "bi-journal-text",
    title: "No notes saved",
    text: "Notes you take during lessons will be saved here.",
  },
  announcements: {
    icon: "bi-megaphone",
    title: "No announcements",
    text: "Updates from your instructor will appear here.",
  },
  reviews: {
    icon: "bi-star",
    title: "No reviews yet",
    text: "Reviews become available after you complete the course.",
  },
  tools: {
    icon: "bi-tools",
    title: "Learning tools",
    text: "Practice exercises and downloadable resources are unlocked as you progress.",
  },
};

export default function CourseLearning() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />

      <main id="main" className="page__main">
        <div className="container section--tight">
          <nav className="breadcrumb-bar" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right" aria-hidden="true" />
            <Link to="/learning">My learning</Link>
            <i className="bi bi-chevron-right" aria-hidden="true" />
            <span aria-current="page">JavaScript Fundamentals</span>
          </nav>

          <div className="player-shell">
            <div>
              <div className="video-wrap">
                <video controls preload="metadata">
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support embedded video.
                </video>
              </div>

              <div
                className="tabs mt-4"
                role="tablist"
                aria-label="Course resources"
                onKeyDown={(event) => {
                  const ids = tabs.map((tab) => tab.id);
                  const index = ids.indexOf(activeTab);
                  if (index === -1) return;

                  let nextId = null;
                  if (event.key === "ArrowRight") nextId = ids[(index + 1) % ids.length];
                  else if (event.key === "ArrowLeft")
                    nextId = ids[(index - 1 + ids.length) % ids.length];
                  else if (event.key === "Home") nextId = ids[0];
                  else if (event.key === "End") nextId = ids[ids.length - 1];
                  if (!nextId) return;

                  event.preventDefault();
                  setActiveTab(nextId);
                  document.getElementById(`tab-${nextId}`)?.focus();
                }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    type="button"
                    role="tab"
                    className="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls="course-tabpanel"
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div
                className="tab-panel"
                role="tabpanel"
                id="course-tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                tabIndex={0}
              >
                {activeTab === "overview" ? (
                  <>
                    <h1 className="h3">The modern JavaScript course for everyone!</h1>

                    <div className="player-meta mb-3">
                      <span>
                        <i className="bi bi-star-fill" aria-hidden="true" />
                        4.7 rating
                      </span>
                      <span>
                        <i className="bi bi-people" aria-hidden="true" />
                        1,014,474 students
                      </span>
                      <span>
                        <i className="bi bi-clock" aria-hidden="true" />
                        71 hours
                      </span>
                      <span>
                        <i className="bi bi-translate" aria-hidden="true" />
                        English
                      </span>
                    </div>

                    <div className="prose">
                      <p>
                        Master JavaScript with projects, challenges and theory. Many
                        courses in one! Learn modern JavaScript from scratch and become
                        job-ready.
                      </p>
                      <p className="text-sm text-muted-ink">
                        Last updated October 2025 · English
                      </p>
                    </div>

                    <div className="panel panel--muted mt-4">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <div>
                          <h2 className="h6 mb-1">Certification</h2>
                          <p className="text-sm text-muted-ink mb-0">
                            Download your certificate upon course completion to showcase
                            your achievement.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-secondary-ink btn-sm"
                          disabled
                          title="Available once you complete the course"
                        >
                          <i className="bi bi-download" aria-hidden="true" />
                          Download certificate
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <span className="empty-state__icon" aria-hidden="true">
                      <i className={`bi ${emptyStates[activeTab].icon}`} />
                    </span>
                    <h2 className="empty-state__title">{emptyStates[activeTab].title}</h2>
                    <p className="empty-state__text">{emptyStates[activeTab].text}</p>
                  </div>
                )}
              </div>
            </div>

            <aside className="player-shell__aside" aria-label="Lesson list">
              <CourseContentSidebar />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
