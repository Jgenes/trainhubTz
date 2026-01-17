import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Training() {
  // Sample data
  const sampleCourses = [
    {
      title: "React for Beginners",
      category: "Web Development",
      provider: "John Doe",
      providerLogo: "https://via.placeholder.com/30",
      img: "https://via.placeholder.com/300x150",
      startDate: "2026-02-01",
      remainingSeats: 5,
      mode: "Online",
      enrollmentOpen: true,
    },
    {
      title: "Advanced Python",
      category: "Programming",
      provider: "Jane Smith",
      providerLogo: "https://via.placeholder.com/30",
      img: "https://via.placeholder.com/300x150",
      startDate: "2026-02-05",
      remainingSeats: 0,
      mode: "Offline",
      enrollmentOpen: false,
    },
    {
      title: "Cybersecurity Basics",
      category: "Security",
      provider: "Alice Johnson",
      providerLogo: "https://via.placeholder.com/30",
      img: "https://via.placeholder.com/300x150",
      startDate: "2026-02-10",
      remainingSeats: 10,
      mode: "Online",
      enrollmentOpen: true,
    },
    {
      title: "Data Science 101",
      category: "Data Science",
      provider: "Bob Lee",
      providerLogo: "https://via.placeholder.com/30",
      img: "https://via.placeholder.com/300x150",
      startDate: "2026-02-15",
      remainingSeats: 3,
      mode: "Online",
      enrollmentOpen: true,
    },
    {
      title: "UI/UX Design Masterclass",
      category: "Design",
      provider: "Clara Evans",
      providerLogo: "https://via.placeholder.com/30",
      img: "https://via.placeholder.com/300x150",
      startDate: "2026-02-20",
      remainingSeats: 2,
      mode: "Offline",
      enrollmentOpen: true,
    },
  ];

  const [courses, setCourses] = useState(sampleCourses);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    trainer: "",
    date: "",
  });

  // Filtered courses
  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.category ? course.category === filters.category : true) &&
      (filters.trainer ? course.provider === filters.trainer : true) &&
      (filters.date ? course.startDate === filters.date : true)
    );
  });

  // Unique options for select inputs
  const categories = [...new Set(courses.map((c) => c.category))];
  const trainers = [...new Set(courses.map((c) => c.provider))];

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <ToastContainer />
        <div className="row">
          {/* FILTER PANEL */}
          <div className="col-md-3 mb-4">
            <div
              className="card p-3 shadow-sm"
              style={{ position: "sticky", top: "80px" }}
            >
              <h5 className="mb-3 hFilter">Filter Courses</h5>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <select
                  className="form-select"
                  value={filters.name}
                  onChange={(e) =>
                    setFilters({ ...filters, name: e.target.value })
                  }
                >
                  <option value="">
                    <span style={{ fontSize: "fontSize:13px" }}>All Names</span>
                  </option>
                  {courses.map((c, i) => (
                    <option key={i} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option value="">All Categories</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Trainer</label>
                <select
                  className="form-select"
                  value={filters.trainer}
                  onChange={(e) =>
                    setFilters({ ...filters, trainer: e.target.value })
                  }
                >
                  <option value="">All Trainers</option>
                  {trainers.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.date}
                  onChange={(e) =>
                    setFilters({ ...filters, date: e.target.value })
                  }
                />
              </div>

              <button
                className="btn btn-secondary w-100"
                onClick={() =>
                  setFilters({ name: "", category: "", trainer: "", date: "" })
                }
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* COURSES LIST */}
          <div className="col-md-9">
            <div className="row g-4">
              {filteredCourses.map((course, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={course.img}
                      className="card-img-top"
                      alt={course.title}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{course.title}</h5>

                      <div className="d-flex align-items-center mb-2">
                        <img
                          src={course.providerLogo}
                          alt={course.provider}
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "contain",
                            marginRight: "8px",
                            borderRadius: "50%",
                          }}
                        />
                        <small className="text-muted">{course.provider}</small>
                      </div>

                      <p
                        style={{ fontSize: "13px" }}
                        className="mb-2 text-muted"
                      >
                        Start Date: {course.startDate}
                      </p>
                      <p
                        style={{ fontSize: "13px" }}
                        className="mb-2 text-muted"
                      >
                        Remaining Seats: {course.remainingSeats}
                      </p>
                      <p style={{ fontSize: "13px" }} className="mb-3">
                        Mode: <strong>{course.mode}</strong>
                      </p>

                      {course.enrollmentOpen ? (
                        <button
                          style={{
                            backgroundColor: "#0a2e67",
                            borderColor: "#0a2e67",
                            fontSize: "12px",
                          }}
                          className="btn btn-primary mt-auto"
                        >
                          Enroll Now
                        </button>
                      ) : (
                        <span className="badge bg-danger mt-auto">
                          End of Enrollment
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredCourses.length === 0 && (
                <div className="col-12">
                  <p className="text-center text-muted">
                    No courses found with these filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
