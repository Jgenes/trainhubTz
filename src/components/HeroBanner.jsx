import { Link } from "react-router-dom";
import PDPC from "../assets/pdpc.png";

const features = [
  "Learn AI and more",
  "Prep for a certification",
  "Practice with AI coaching",
  "Advance your career",
];

/**
 * Featured programme panel (previously the "Personal Data Protection Training"
 * hero banner).
 */
export default function HeroBanner() {
  return (
    <section className="feature" aria-labelledby="featured-programme-title">
      <div>
        <p className="eyebrow eyebrow--inverse">Featured programme</p>
        <h2 className="feature__title" id="featured-programme-title">
          Personal Data Protection Training
        </h2>
        <p className="feature__lead">
          Future-proof your skills with Personal Plan. Get access to a variety of fresh
          content from real-world experts.
        </p>

        <ul className="feature__list">
          {features.map((feature) => (
            <li key={feature}>
              <i className="bi bi-check2-circle" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="btn-row">
          <Link className="btn btn-inverse" to="/course">
            Enrol now <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
          <Link className="btn btn-outline-inverse" to="/course">
            Course details
          </Link>
        </div>
      </div>

      <div className="feature__card">
        <div className="feature__card-logo">
          <img src={PDPC} alt="Personal Data Protection Committee logo" loading="lazy" />
          <div>
            <p className="feature__card-title">Personal Data Protection Committee</p>
            <p className="feature__card-sub">Course provider</p>
          </div>
        </div>

        <dl className="feature__facts mb-0">
          {[
            ["Format", "8 course series"],
            ["Duration", "5 weeks"],
            ["Mode", "Online"],
            ["Location", "Dar es Salaam"],
          ].map(([label, value]) => (
            <div className="feature__fact" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <p className="text-xs text-muted-ink mb-0 mt-3">
          <i className="bi bi-clock" aria-hidden="true" /> Enrolment deadline: 13 February 2026
        </p>
      </div>
    </section>
  );
}
