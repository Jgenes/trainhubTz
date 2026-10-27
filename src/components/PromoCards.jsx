import { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/banner2.jpg";

function PromoMedia({ src, alt, icon }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="promo-card__media">
      {failed ? (
        <div className="promo-card__placeholder" aria-hidden="true">
          <i className={`bi ${icon}`} />
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

const TEAM_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80";

export default function PromoCards() {
  return (
    <div className="promo-grid">
      <section className="promo-card promo-card--team" aria-labelledby="promo-teams">
        <span className="promo-badge" aria-hidden="true">
          <strong>50%</strong>
          <span>team off</span>
        </span>

        <div>
          <p className="promo-card__brand">
            <strong>TrainHub TZ</strong> <span>for teams</span>
          </p>
          <h2 className="promo-card__title" id="promo-teams">
            Train your team in top skills and join 3,700+ teams worldwide
          </h2>
          <p className="promo-card__text mb-4">
            Flexible licences, progress reporting and curated learning paths for
            organisations. Up to 125 licences.
          </p>
          <Link className="btn btn-inverse" to="/trainings">
            Enrol now <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>

        <PromoMedia
          src={TEAM_IMAGE}
          alt="Team collaborating during a training session"
          icon="bi-people"
        />
      </section>

      <section className="promo-card promo-card--solo" aria-labelledby="promo-individual">
        <span className="promo-card__decor" aria-hidden="true" />
        <div>
          <p className="eyebrow">Individual learners</p>
          <h2 className="promo-card__title" id="promo-individual">
            Start, switch, or advance your career
          </h2>
          <p className="promo-card__text mb-4">
            Grow with 10,000+ courses from top organizations.
          </p>
          <Link className="btn btn-primary" to="/register">
            Join for free <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>

        <PromoMedia
          src={Banner}
          alt="Learner exploring AI and immersive training content"
          icon="bi-mortarboard"
        />
      </section>
    </div>
  );
}
