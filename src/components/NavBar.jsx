import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Dropdown, { MenuDivider, MenuItem } from "./Dropdown";
import {
  clearSession,
  getDisplayName,
  getInitials,
  getStoredUser,
  getToken,
} from "../utils/auth";

const ANNOUNCE_KEY = "traininghub:announcement-dismissed";

export default function NavBar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [announceVisible, setAnnounceVisible] = useState(() => {
    try {
      return sessionStorage.getItem(ANNOUNCE_KEY) !== "1";
    } catch {
      return true;
    }
  });

  const [token] = useState(getToken);
  const [user] = useState(getStoredUser);

  /* "My learning" is a learner-only entry point: it only appears once the
     visitor has a session, and disappears again after logging out. */
  const primaryLinks = [
    { to: "/trainings", label: "Trainings" },
    ...(token ? [{ to: "/learning", label: "My learning" }] : []),
  ];

  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onPointer = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [menuOpen]);

  const dismissAnnouncement = () => {
    setAnnounceVisible(false);
    try {
      sessionStorage.setItem(ANNOUNCE_KEY, "1");
    } catch {
      /* storage unavailable — dismissal is session-only */
    }
  };

  const submitSearch = (term, event) => {
    event?.preventDefault();
    const value = term.trim();
    setMenuOpen(false);
    navigate(value ? `/trainings?q=${encodeURIComponent(value)}` : "/trainings");
  };

  const handleLogout = () => {
    clearSession();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMobileMenuOnNavigate = (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  };

  const displayName = getDisplayName(user);

  return (
    <div ref={navRef}>
      {announceVisible ? (
        <div className="announce" role="region" aria-label="Announcement">
          <div className="container announce__inner">
            <span className="announce__text">
              <strong>2026 intakes are open.</strong> Browse new trainings from accredited
              providers and reserve your seat.{" "}
              <Link to="/trainings">View trainings</Link>
            </span>
            <button
              type="button"
              className="announce__close"
              onClick={dismissAnnouncement}
              aria-label="Dismiss announcement"
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container site-header__inner">
          <Logo />

          <nav className="site-nav" aria-label="Primary">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `site-nav__link${isActive ? " is-active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/tenant-register"
              className={({ isActive }) =>
                `site-nav__link${isActive ? " is-active" : ""}`
              }
            >
              For providers
            </NavLink>
          </nav>

          <form
            className="header-search d-none d-xl-flex"
            role="search"
            onSubmit={(event) => submitSearch(query, event)}
          >
            <label className="visually-hidden" htmlFor="header-search-input">
              Search trainings
            </label>
            <i className="bi bi-search" aria-hidden="true" />
            <input
              id="header-search-input"
              type="search"
              className="form-control"
              placeholder="Search trainings, providers, skills"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>

          <div className="header-actions d-none d-lg-flex">
            {token ? (
              <Dropdown
                label="Account menu"
                trigger={({ open, toggle, id }) => (
                  <button
                    type="button"
                    className="user-button"
                    onClick={toggle}
                    data-menu-trigger
                    aria-expanded={open}
                    aria-controls={id}
                    aria-haspopup="menu"
                  >
                    <span className="avatar" aria-hidden="true">
                      {getInitials(user)}
                    </span>
                    <span className="d-none d-xl-inline">{displayName}</span>
                    <i className="bi bi-chevron-down" aria-hidden="true" />
                  </button>
                )}
              >
                {({ close }) => (
                  <>
                    <div className="menu__header">
                      <span className="menu__name">{displayName}</span>
                      {user?.email ? <span className="menu__meta">{user.email}</span> : null}
                    </div>
                    <MenuItem icon="bi-journal-check" to="/learning" onClick={close}>
                      My learning
                    </MenuItem>
                    <MenuItem icon="bi-speedometer2" to="/provider/dashboard" onClick={close}>
                      Provider dashboard
                    </MenuItem>
                    <MenuItem icon="bi-receipt" to="/checkout" onClick={close}>
                      Checkout
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem icon="bi-box-arrow-right" danger onClick={handleLogout}>
                      Log out
                    </MenuItem>
                  </>
                )}
              </Dropdown>
            ) : (
              <>
                <Link className="btn btn-secondary-ink btn-sm" to="/login">
                  Log in
                </Link>
                <Link className="btn btn-primary btn-sm" to="/register">
                  Create account
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="nav-toggle d-lg-none ms-auto"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
          </button>
        </div>

        {menuOpen ? (
          <div
            className="mobile-nav d-lg-none"
            id="mobile-navigation"
            onClick={closeMobileMenuOnNavigate}
          >
            <div className="container">
              <form
                className="mobile-nav__search"
                role="search"
                onSubmit={(event) => submitSearch(mobileQuery, event)}
              >
                <label className="visually-hidden" htmlFor="mobile-search-input">
                  Search trainings
                </label>
                <i className="bi bi-search" aria-hidden="true" />
                <input
                  id="mobile-search-input"
                  type="search"
                  className="form-control"
                  placeholder="Search trainings"
                  value={mobileQuery}
                  onChange={(event) => setMobileQuery(event.target.value)}
                />
              </form>

              <div className="mobile-nav__group">
                <p className="mobile-nav__label">Browse</p>
                <NavLink
                  to="/trainings"
                  className={({ isActive }) =>
                    `mobile-nav__link${isActive ? " is-active" : ""}`
                  }
                >
                  Trainings
                  <i className="bi bi-chevron-right" aria-hidden="true" />
                </NavLink>
                {token ? (
                  <NavLink
                    to="/learning"
                    className={({ isActive }) =>
                      `mobile-nav__link${isActive ? " is-active" : ""}`
                    }
                  >
                    My learning
                    <i className="bi bi-chevron-right" aria-hidden="true" />
                  </NavLink>
                ) : null}
                <NavLink
                  to="/tenant-register"
                  className={({ isActive }) =>
                    `mobile-nav__link${isActive ? " is-active" : ""}`
                  }
                >
                  Become a training provider
                  <i className="bi bi-chevron-right" aria-hidden="true" />
                </NavLink>
              </div>

              <div className="mobile-nav__group">
                <p className="mobile-nav__label">
                  {token ? "Your account" : "Account"}
                </p>
                {token ? (
                  <>
                    <div className="d-flex align-items-center gap-2 px-2 pb-2">
                      <span className="avatar" aria-hidden="true">
                        {getInitials(user)}
                      </span>
                      <span className="text-sm">
                        <strong className="d-block">{displayName}</strong>
                        {user?.email ? (
                          <span className="text-muted-ink text-xs">{user.email}</span>
                        ) : null}
                      </span>
                    </div>
                    <NavLink
                      to="/provider/dashboard"
                      className="mobile-nav__link"
                    >
                      Provider dashboard
                      <i className="bi bi-chevron-right" aria-hidden="true" />
                    </NavLink>
                    <button
                      type="button"
                      className="mobile-nav__link w-100 border-0 bg-transparent text-start"
                      onClick={handleLogout}
                    >
                      Log out
                      <i className="bi bi-box-arrow-right" aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  <div className="mobile-nav__actions">
                    <Link className="btn btn-primary" to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-secondary-ink" to="/register">
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
