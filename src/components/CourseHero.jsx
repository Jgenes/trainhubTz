import { Link } from "react-router-dom";
import PDPCLogo from "../assets/pdpc.png";
import CourseArt from "../assets/banner2.jpg";

const CourseHero = () => {
  return (
    <section className="course-hero" aria-labelledby="course-title">
      <div className="container course-hero__grid">
        <div>
          <p className="course-hero__provider">
            <img src={PDPCLogo} alt="" width="40" height="40" />
            Personal Data Protection Commission
          </p>

          <h1 className="course-hero__title" id="course-title">
            IBM RAG and Agentic AI Professional Certificate
          </h1>

          <p className="course-hero__lead">
            Build real-world AI with RAG and agentic AI. Use AI tools to streamline
            automation, drive innovation, and take your career further—faster.
          </p>

          <div className="btn-row mt-4">
            <Link className="btn btn-primary btn-lg" to="/checkout">
              Enrol now
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </Link>
            <Link className="btn btn-secondary-ink btn-lg" to="/courseLearning">
              Preview a lesson
            </Link>
          </div>

          <div className="course-hero__meta">
            <span>
              <i className="bi bi-people" aria-hidden="true" />
              <strong>42,272</strong> already enrolled
            </span>
            <span>
              <i className="bi bi-calendar-event" aria-hidden="true" />
              Enrolment deadline: 13 Jan
            </span>
            <span>
              <i className="bi bi-patch-check" aria-hidden="true" />
              Certificate included
            </span>
          </div>
        </div>

        <div className="course-hero__art">
          <img
            src={CourseArt}
            alt="Learner exploring AI and immersive training content"
            width="651"
            height="466"
          />
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
