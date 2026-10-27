import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";

const sampleCourses = [
  {
    title: "React for Beginners",
    category: "Web Development",
    provider: "John Doe",
    providerLogo:
      "https://ui-avatars.com/api/?name=John+Doe&background=0D6EFD&color=fff",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-02-01",
    remainingSeats: 5,
    mode: "Online",
    enrollmentOpen: true,
  },
  {
    title: "Advanced Python",
    category: "Programming",
    provider: "Jane Smith",
    providerLogo:
      "https://ui-avatars.com/api/?name=Jane+Smith&background=198754&color=fff",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-02-05",
    remainingSeats: 0,
    mode: "Offline",
    enrollmentOpen: false,
  },
  {
    title: "Cybersecurity Basics",
    category: "Security",
    provider: "Alice Johnson",
    providerLogo:
      "https://ui-avatars.com/api/?name=Alice+Johnson&background=DC3545&color=fff",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-02-10",
    remainingSeats: 10,
    mode: "Online",
    enrollmentOpen: true,
  },
  {
    title: "Data Science 101",
    category: "Data Science",
    provider: "Bob Lee",
    providerLogo:
      "https://ui-avatars.com/api/?name=Bob+Lee&background=6F42C1&color=fff",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-02-15",
    remainingSeats: 3,
    mode: "Online",
    enrollmentOpen: true,
  },
  {
    title: "UI/UX Design Masterclass",
    category: "Design",
    provider: "Clara Evans",
    providerLogo:
      "https://ui-avatars.com/api/?name=Clara+Evans&background=FD7E14&color=fff",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-02-20",
    remainingSeats: 2,
    mode: "Offline",
    enrollmentOpen: true,
  },
  {
    title: "Node.js & Express API",
    category: "Backend Development",
    provider: "Michael Brown",
    providerLogo:
      "https://ui-avatars.com/api/?name=Michael+Brown&background=20C997&color=fff",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-03-01",
    remainingSeats: 8,
    mode: "Online",
    enrollmentOpen: true,
  },
  {
    title: "Fullstack Web Development",
    category: "Web Development",
    provider: "Sarah Wilson",
    providerLogo:
      "https://ui-avatars.com/api/?name=Sarah+Wilson&background=0B5ED7&color=fff",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-03-05",
    remainingSeats: 6,
    mode: "Online",
    enrollmentOpen: true,
  },
  {
    title: "Mobile App Development (React Native)",
    category: "Mobile Development",
    provider: "Daniel Kim",
    providerLogo:
      "https://ui-avatars.com/api/?name=Daniel+Kim&background=6610F2&color=fff",
    img: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-03-10",
    remainingSeats: 4,
    mode: "Online",
    enrollmentOpen: true,
  },
  {
    title: "DevOps Fundamentals",
    category: "DevOps",
    provider: "Peter Adams",
    providerLogo:
      "https://ui-avatars.com/api/?name=Peter+Adams&background=198754&color=fff",
    img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-03-15",
    remainingSeats: 7,
    mode: "Offline",
    enrollmentOpen: true,
  },
  {
    title: "Digital Marketing Bootcamp",
    category: "Marketing",
    provider: "Emily Carter",
    providerLogo:
      "https://ui-avatars.com/api/?name=Emily+Carter&background=DC3545&color=fff",
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-03-20",
    remainingSeats: 12,
    mode: "Online",
    enrollmentOpen: true,
  },
];

const categories = [...new Set(sampleCourses.map((course) => course.category))];
const trainers = [...new Set(sampleCourses.map((course) => course.provider))];

const emptyFilters = { category: "", trainer: "", date: "" };

export default function Training() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState("date-asc");

  const urlQuery = searchParams.get("q") ?? "";

  /* The text input keeps local state so typing is never blocked by a URL
     round-trip; the query is written back to the URL (debounced) so the
     current view stays shareable and deep-linkable. */
  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [lastPushedQuery, setLastPushedQuery] = useState(urlQuery);
  const [seenUrlQuery, setSeenUrlQuery] = useState(urlQuery);

  if (urlQuery !== seenUrlQuery) {
    setSeenUrlQuery(urlQuery);
    if (urlQuery !== lastPushedQuery) {
      setSearchTerm(urlQuery);
    }
  }

  useEffect(() => {
    if (searchTerm === urlQuery) return undefined;

    const timer = setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (searchTerm) next.set("q", searchTerm);
      else next.delete("q");
      setLastPushedQuery(searchTerm);
      setSearchParams(next, { replace: true });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, urlQuery, searchParams, setSearchParams]);

  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const matches = sampleCourses.filter((course) => {
      const matchesTerm =
        !term ||
        course.title.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term) ||
        course.provider.toLowerCase().includes(term);

      const matchesCategory = !filters.category || course.category === filters.category;
      const matchesTrainer = !filters.trainer || course.provider === filters.trainer;
      const matchesDate = !filters.date || course.startDate === filters.date;

      return matchesTerm && matchesCategory && matchesTrainer && matchesDate;
    });

    return [...matches].sort((a, b) => {
      if (sort === "date-desc") return b.startDate.localeCompare(a.startDate);
      if (sort === "seats") return b.remainingSeats - a.remainingSeats;
      return a.startDate.localeCompare(b.startDate);
    });
  }, [searchTerm, filters, sort]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(filters.category) ||
    Boolean(filters.trainer) ||
    Boolean(filters.date);

  const resetFilters = () => {
    setFilters(emptyFilters);
    setSearchTerm("");
    setLastPushedQuery("");
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />

      <main id="main" className="page__main">
        <div className="container section--tight">
          <header className="page-header">
            <div>
              <p className="eyebrow">Catalogue</p>
              <h1 className="page-header__title">Trainings</h1>
              <p className="page-header__lead">
                Compare intakes from accredited providers and filter by category, trainer
                or start date.
              </p>
            </div>
          </header>

          <div className="catalogue">
            <aside aria-label="Filters">
              <form
                className="panel filters"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="filters__head">
                  <h2 className="filters__title">Filter trainings</h2>
                  {hasActiveFilters ? (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={resetFilters}
                    >
                      Reset
                    </button>
                  ) : null}
                </div>

                <div className="filters__group">
                  <label className="form-label" htmlFor="filter-search">
                    Search
                  </label>
                  <div className="field-search">
                    <i className="bi bi-search" aria-hidden="true" />
                    <input
                      id="filter-search"
                      type="search"
                      className="form-control"
                      placeholder="Title, provider or category"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                  </div>
                </div>

                <div className="filters__group">
                  <label className="form-label" htmlFor="filter-category">
                    Category
                  </label>
                  <select
                    id="filter-category"
                    className="form-select"
                    value={filters.category}
                    onChange={(event) =>
                      setFilters({ ...filters, category: event.target.value })
                    }
                  >
                    <option value="">All categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filters__group">
                  <label className="form-label" htmlFor="filter-trainer">
                    Trainer
                  </label>
                  <select
                    id="filter-trainer"
                    className="form-select"
                    value={filters.trainer}
                    onChange={(event) =>
                      setFilters({ ...filters, trainer: event.target.value })
                    }
                  >
                    <option value="">All trainers</option>
                    {trainers.map((trainer) => (
                      <option key={trainer} value={trainer}>
                        {trainer}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filters__group">
                  <label className="form-label" htmlFor="filter-date">
                    Start date
                  </label>
                  <input
                    id="filter-date"
                    type="date"
                    className="form-control"
                    value={filters.date}
                    onChange={(event) =>
                      setFilters({ ...filters, date: event.target.value })
                    }
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-secondary-ink w-100 mt-4"
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                >
                  Clear all filters
                </button>
              </form>
            </aside>

            <div>
              <div className="catalogue__head">
                <p className="catalogue__count" role="status">
                  Showing <strong>{filteredCourses.length}</strong> of{" "}
                  {sampleCourses.length} trainings
                  {searchTerm ? (
                    <>
                      {" "}
                      for “<strong>{searchTerm}</strong>”
                    </>
                  ) : null}
                </p>

                <div className="sort-control">
                  <label className="form-label mb-0" htmlFor="sort-by">
                    Sort by
                  </label>
                  <select
                    id="sort-by"
                    className="form-select form-select-sm"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="date-asc">Start date (soonest)</option>
                    <option value="date-desc">Start date (latest)</option>
                    <option value="seats">Seats available</option>
                  </select>
                </div>
              </div>

              {filteredCourses.length > 0 ? (
                <div className="course-grid">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.title} course={course} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-state__icon" aria-hidden="true">
                    <i className="bi bi-search" />
                  </span>
                  <h2 className="empty-state__title">No trainings found</h2>
                  <p className="empty-state__text">
                    Try a different search term or clear the filters to see all available
                    trainings.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm empty-state__action"
                    onClick={resetFilters}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
