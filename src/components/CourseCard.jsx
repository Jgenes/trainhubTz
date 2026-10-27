import { useState } from "react";
import { Link } from "react-router-dom";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

/**
 * Course summary card used on the homepage and the trainings catalogue.
 * Accepts the course shape already used across the app:
 * { title, category, provider, providerLogo, img, startDate, remainingSeats, mode, enrollmentOpen }
 */
export default function CourseCard({ course, to = "/course" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const seats = Number(course.remainingSeats) || 0;
  const isOpen = course.enrollmentOpen !== false && seats > 0;
  const startDate = formatDate(course.startDate);

  let seatClass = "";
  let seatLabel = seats > 0 ? `${seats} seats available` : "No seats left";

  if (seats > 0 && seats <= 3) {
    seatClass = " seats--low";
    seatLabel = `Only ${seats} ${seats === 1 ? "seat" : "seats"} left`;
  }

  if (!isOpen) {
    seatClass = " seats--none";
    seatLabel = "Enrolment closed";
  }

  return (
    <article className="course-card">
      <div className="course-card__media">
        {course.img && !imageFailed ? (
          <img
            src={course.img}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="course-card__fallback" aria-hidden="true">
            <i className="bi bi-mortarboard" />
          </div>
        )}

        {!isOpen ? (
          <span className="course-card__flag course-card__flag--closed">
            <i className="bi bi-slash-circle" aria-hidden="true" /> Enrolment closed
          </span>
        ) : seats <= 3 ? (
          <span className="course-card__flag">
            <i className="bi bi-lightning-charge-fill" aria-hidden="true" /> Few seats left
          </span>
        ) : null}
      </div>

      <div className="course-card__body">
        {course.category ? (
          <span className="course-card__category">{course.category}</span>
        ) : null}

        <h3 className="course-card__title">
          <Link to={to}>{course.title}</Link>
        </h3>

        <div className="course-card__provider">
          {course.providerLogo && !logoFailed ? (
            <img
              src={course.providerLogo}
              alt=""
              loading="lazy"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="avatar avatar--sm" aria-hidden="true">
              {initials(course.provider || course.title)}
            </span>
          )}
          <span className="text-truncate">{course.provider}</span>
        </div>

        <ul className="course-card__meta">
          {startDate ? (
            <li>
              <i className="bi bi-calendar3" aria-hidden="true" />
              Starts {startDate}
            </li>
          ) : null}
          {course.mode ? (
            <li>
              <i className="bi bi-broadcast" aria-hidden="true" />
              {course.mode}
            </li>
          ) : null}
        </ul>

        <div className="course-card__footer">
          <span className={`seats${seatClass}`}>
            <span className="dot" aria-hidden="true" />
            {seatLabel}
          </span>
          <Link className="course-card__cta" to={to} aria-label={`View ${course.title}`}>
            View <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
