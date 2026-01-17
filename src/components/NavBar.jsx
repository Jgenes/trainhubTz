export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container-fluid px-4">
        {/* Brand */}
        <a
          className="navbar-brand fw-semibold me-4"
          href="/"
          style={{ backgroundColor: "white", border: "none" }}
        >
          TrainingHub
        </a>

        {/* Explore */}
        <button className="btn btn-link text-dark text-decoration-none me-3">
          Explore
        </button>

        {/* Search */}
        <form className="d-none d-lg-flex flex-grow-1 me-4">
          <div className="input-group" style={{ border: "none" }}>
            <span
              style={{ border: "none" }}
              className="input-group-text bg-light border-end-0"
            >
              <i style={{ border: "none" }} className="bi bi-search"></i>
            </span>
            <input
              type="search"
              className="form-control border-start-0 bg-light"
              placeholder="Search for Training"
            />
          </div>
        </form>

        {/* Right Navigation */}
        <ul className="navbar-nav align-items-center ms-auto">
          <li className="nav-item d-none d-lg-block">
            <a className="nav-link text-dark" href="/trainings">
              Trainings
            </a>
          </li>

          <li className="nav-item d-none d-lg-block">
            <a className="nav-link text-dark" href="#">
              About us
            </a>
          </li>

          <li className="nav-item d-none d-lg-block">
            <a className="nav-link text-dark" href="#">
              Contact us
            </a>
          </li>

          {/* Cart */}
          {/* <li className="nav-item mx-3 position-relative">
            <i className="bi bi-cart fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              1
            </span>
          </li> */}

          {/* Auth */}
          <li className="nav-item me-2">
            <a href="/login">
              <button className="btn btn-outline-dark px-3 loginBtn">
                Log in
              </button>
            </a>
          </li>

          <li className="nav-item">
            <a href="/tenant-register">
              <button className="btn btn-dark px-3 trainBtn">
                For Training Provider
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
