import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import PartnerStrip from "../components/PartnerStrip";
import TrendingCourses from "../components/TrendingCourses";
import NewReleaseCourses from "../components/NewReleasesCourses";
import CategoryChips from "../components/CategoryChips";
import PromoCards from "../components/PromoCards";
import Banner1 from "../assets/banner1.jpg";

const valueProps = [
  {
    icon: "bi-graph-up-arrow",
    title: "Get in-demand skills",
    text: "Job-focused training in data, AI, cybersecurity, business and more.",
  },
  {
    icon: "bi-compass",
    title: "Launch a new career",
    text: "Structured pathways with practical projects and expert instructors.",
  },
  {
    icon: "bi-award",
    title: "Earn a certificate",
    text: "Download certificates on completion to share with employers.",
  },
];

export default function Home() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />

      <main id="main" className="page__main">
        {/* Hero */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero__grid">
            <div>
              <p className="eyebrow">
                <i className="bi bi-patch-check" aria-hidden="true" />
                Tanzania&apos;s training marketplace
              </p>
              <h1 className="hero__title" id="hero-title">
                Training that moves your career forward.
              </h1>
              <p className="hero__lead">
                Browse accredited courses and upcoming intakes from leading universities,
                colleges and professional training providers — then enrol online in
                minutes.
              </p>

              <div className="hero__actions">
                <Link className="btn btn-primary btn-lg" to="/trainings">
                  Browse trainings
                  <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>
                <Link className="btn btn-secondary-ink btn-lg" to="/tenant-register">
                  For training providers
                </Link>
              </div>

              <ul className="hero__notes">
                <li>
                  <i className="bi bi-patch-check" aria-hidden="true" /> Accredited providers
                </li>
                <li>
                  <i className="bi bi-laptop" aria-hidden="true" /> Online &amp; physical
                  intakes
                </li>
                <li>
                  <i className="bi bi-phone" aria-hidden="true" /> Mobile money checkout
                </li>
              </ul>
            </div>

            <div className="hero__media">
              <div className="hero__art">
                <img
                  src={Banner1}
                  alt="Learner exploring professional training content"
                  width="1340"
                  height="400"
                />
              </div>

              <div className="hero__float">
                <span className="hero__float-icon" aria-hidden="true">
                  <i className="bi bi-journal-bookmark" />
                </span>
                <span className="hero__float-body">
                  <span className="hero__float-eyebrow">New intake</span>
                  <span className="hero__float-title">Web Development</span>
                  <span className="hero__float-meta">
                    Tech Academy · Online · 5 seats left
                  </span>
                </span>
                <Link className="btn btn-ghost btn-sm" to="/trainings">
                  View
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="section--tight" aria-label="Training partners">
          <div className="container">
            <PartnerStrip />
          </div>
        </section>

        {/* Value props */}
        <section className="section" aria-labelledby="value-title">
          <div className="container">
            <div className="section-head">
              <div>
                <h2 className="section-head__title" id="value-title">
                  Why learners choose TrainHub TZ
                </h2>
                <p className="section-head__sub">
                  One place to find, compare and enrol in professional training across
                  Tanzania.
                </p>
              </div>
            </div>

            <div className="value-grid">
              {valueProps.map((item) => (
                <article className="value-card" key={item.title}>
                  <span className="icon-tile" aria-hidden="true">
                    <i className={`bi ${item.icon}`} />
                  </span>
                  <div>
                    <h3 className="value-card__title">{item.title}</h3>
                    <p className="value-card__text">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Featured programme */}
        <section className="section--tight" aria-label="Featured programme">
          <div className="container">
            <HeroBanner />
          </div>
        </section>

        {/* Trending */}
        <section className="section" aria-labelledby="trending-title">
          <div className="container">
            <div className="section-head">
              <div>
                <h2 className="section-head__title" id="trending-title">
                  Trending courses
                </h2>
                <p className="section-head__sub">
                  Popular programmes and skills learners are exploring right now.
                </p>
              </div>
              <Link className="section-head__link" to="/trainings">
                View all trainings <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>

            <TrendingCourses />
          </div>
        </section>

        {/* New trainings */}
        <NewReleaseCourses />

        {/* Categories */}
        <section className="section section--tight" aria-labelledby="categories-title">
          <div className="container">
            <div className="section-head">
              <div>
                <h2 className="section-head__title" id="categories-title">
                  Categories
                </h2>
                <p className="section-head__sub">
                  Explore training by field of study or professional skill.
                </p>
              </div>
            </div>
            <CategoryChips />
          </div>
        </section>

        {/* Promo */}
        <section className="section" aria-label="TrainHub TZ for teams and individuals">
          <div className="container">
            <PromoCards />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
