import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { isAuthenticated } from "../utils/auth";

const columns = [
  {
    title: "TrainHub TZ",
    links: [
      { label: "Browse trainings", to: "/trainings" },
      { label: "My learning", to: "/learning", authOnly: true },
      { label: "Become a training provider", to: "/tenant-register" },
      { label: "Provider sign in", to: "/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact us", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help and support", href: "#" },
      { label: "Get the app", href: "#" },
      { label: "Affiliate", href: "#" },
      { label: "Investors", href: "#" },
    ],
  },
];

const legalLinks = [
  { label: "Terms", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Cookie settings", href: "#" },
  { label: "Sitemap", href: "#" },
  { label: "Accessibility", href: "#" },
];

const socialLinks = [
  { label: "Facebook", icon: "bi-facebook", href: "#" },
  { label: "Twitter", icon: "bi-twitter-x", href: "#" },
  { label: "Instagram", icon: "bi-instagram", href: "#" },
  { label: "LinkedIn", icon: "bi-linkedin", href: "#" },
];

function FooterLink({ item }) {
  if (item.to) {
    return (
      <Link className="footer-link" to={item.to}>
        {item.label}
      </Link>
    );
  }

  return (
    <a className="footer-link" href={item.href || "#"}>
      {item.label}
    </a>
  );
}

export default function Footer() {
  const [signedIn] = useState(isAuthenticated);

  const visibleLinks = (links) => links.filter((item) => !item.authOnly || signedIn);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo inverse />
            <p className="footer-tagline">Elevating skills. Transforming Tanzania.</p>
            <p className="footer-blurb">
              TrainHub TZ connects learners across Tanzania with accredited courses and
              upcoming intakes from universities, colleges and professional training
              providers.
            </p>

            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  rel="noreferrer"
                >
                  <i className={`bi ${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="footer-title">{column.title}</h2>
              <ul className="footer-list">
                {visibleLinks(column.links).map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="footer-title">Contact</h2>
            <address className="footer-contact">
              <span>
                <i className="bi bi-geo-alt" aria-hidden="true" />
                P.O. Box 123, Dar es Salaam, Tanzania
              </span>
              <a href="tel:+255745732935">
                <i className="bi bi-telephone" aria-hidden="true" />
                +255 745 732 935
              </a>
              <a href="mailto:info@traininghub.com">
                <i className="bi bi-envelope" aria-hidden="true" />
                info@traininghub.com
              </a>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TrainHub TZ. All rights reserved.</span>
          <div className="footer-bottom__links">
            {legalLinks.map((item) => (
              <a key={item.label} className="footer-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
