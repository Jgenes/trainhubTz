import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../components/Logo";
import Dropdown, { MenuDivider, MenuItem } from "../../../components/Dropdown";

const navItems = [
  { to: "/provider/dashboard", label: "Overview", icon: "bi-speedometer2", end: true },
  { to: "/provider/course", label: "Courses", icon: "bi-journal-text" },
  { to: "/provider/cohorts", label: "Cohorts / intakes", icon: "bi-calendar-event" },
  { to: "/provider/enrollments", label: "Enrolments", icon: "bi-people" },
];

const comingSoon = [
  { label: "Invoices & receipts", icon: "bi-receipt" },
  { label: "Profile", icon: "bi-person" },
  { label: "Settings", icon: "bi-gear" },
];

const reportItems = [
  { label: "Course reports", icon: "bi-file-earmark-text" },
  { label: "Engagement", icon: "bi-graph-up" },
];

function initials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "U"
  );
}

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export default function ProviderDashboardLayout({ title, children }) {
  const [user] = useState(readStoredUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !readStoredUser()) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const displayName = user?.name || user?.email || "Provider account";

  return (
    <div className="app">
      <aside
        className={`app-sidebar${sidebarOpen ? " is-open" : ""}`}
        id="provider-sidebar"
        aria-label="Provider navigation"
      >
        <Logo inverse subtitle="Provider workspace" to="/provider/dashboard" />

        <nav
          className="app-sidebar__section"
          aria-label="Workspace"
          onClick={(event) => {
            if (event.target.closest("a")) setSidebarOpen(false);
          }}
        >
          <p className="app-sidebar__label">Workspace</p>
          <ul className="side-nav">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `side-nav__link${isActive ? " is-active" : ""}`
                  }
                >
                  <i className={`bi ${item.icon}`} aria-hidden="true" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="app-sidebar__section" aria-label="Account">
          <p className="app-sidebar__label">Account</p>
          <ul className="side-nav">
            {comingSoon.map((item) => (
              <li key={item.label}>
                <span className="side-nav__link is-disabled" aria-disabled="true">
                  <i className={`bi ${item.icon}`} aria-hidden="true" />
                  {item.label}
                  <span className="side-nav__soon">Soon</span>
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="app-sidebar__section" aria-label="Reports">
          <p className="app-sidebar__label">Reports</p>
          <ul className="side-nav">
            {reportItems.map((item) => (
              <li key={item.label}>
                <span className="side-nav__link is-disabled" aria-disabled="true">
                  <i className={`bi ${item.icon}`} aria-hidden="true" />
                  {item.label}
                  <span className="side-nav__soon">Soon</span>
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="app-sidebar__foot">
          <Link to="/">
            <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
            View public site
          </Link>
          <button type="button" onClick={logout}>
            <i className="bi bi-box-arrow-right" aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>

      {sidebarOpen ? (
        <button
          type="button"
          className="app-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div className="app-shell">
        <header className="app-topbar">
          <button
            type="button"
            className="nav-toggle app-topbar__menu"
            onClick={() => setSidebarOpen(true)}
            aria-controls="provider-sidebar"
            aria-expanded={sidebarOpen}
            aria-label="Open navigation"
          >
            <i className="bi bi-list" aria-hidden="true" />
          </button>

          <h1 className="app-topbar__title">{title}</h1>
          <span className="app-topbar__meta d-none d-lg-block">
            TrainingHub provider workspace
          </span>

          <div className="app-topbar__actions">
            <Link className="btn btn-ghost btn-sm d-none d-md-inline-flex" to="/provider/createCourse">
              <i className="bi bi-plus-lg" aria-hidden="true" />
              New course
            </Link>

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
                    {initials(displayName)}
                  </span>
                  <span className="visually-hidden">Account menu for {displayName}</span>
                  <span
                    className="d-none d-xl-inline text-truncate app-topbar__user-name"
                    aria-hidden="true"
                  >
                    {displayName}
                  </span>
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
                  <MenuItem icon="bi-speedometer2" to="/provider/dashboard" onClick={close}>
                    Dashboard
                  </MenuItem>
                  <MenuItem icon="bi-house" to="/" onClick={close}>
                    Public site
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon="bi-box-arrow-right" danger onClick={logout}>
                    Log out
                  </MenuItem>
                </>
              )}
            </Dropdown>
          </div>
        </header>

        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
