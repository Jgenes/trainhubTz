import React from "react";
import CourseImg from "../assets/data.jfif"; // course image
import OrgLogo from "../assets/skills.png"; // organization logo
import "../app.css";
const courses = [
  {
    title: "Web Development",
    remainingSeats: 5,
    mode: "Online",
    enrollmentOpen: true,
    img: CourseImg,
    provider: "Tech Academy",
    providerLogo: OrgLogo,
    startDate: "2026-02-01",
  },
  {
    title: "Networking Basics",
    remainingSeats: 0,
    mode: "Offline",
    enrollmentOpen: false,
    img: CourseImg,
    provider: "NetPro Institute",
    providerLogo: OrgLogo,
    startDate: "2026-02-10",
  },
  {
    title: "Cyber Security",
    remainingSeats: 10,
    mode: "Online",
    enrollmentOpen: true,
    img: CourseImg,
    provider: "SecureLearn",
    providerLogo: OrgLogo,
    startDate: "2026-03-01",
  },
  {
    title: "Data Analysis",
    remainingSeats: 2,
    mode: "Offline",
    enrollmentOpen: true,
    img: CourseImg,
    provider: "DataHub Academy",
    providerLogo: OrgLogo,
    startDate: "2026-03-15",
  },
];

function NewReleaseCourses() {
  return (
    <div className="container my-5 newrelease">
      {/* Section Title */}
      <h3 className="mb-4">New Training</h3>

      {/* Cards Row */}
      <div className="row g-4">
        {courses.map((course, index) => (
          <div className="col-12 col-md-6 col-lg-3" key={index}>
            <div className="card h-100 shadow-sm">
              {/* Course Image */}
              <img
                src={course.img}
                className="card-img-top"
                alt={course.title}
                style={{ height: "150px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                {/* Course Title */}
                <h5 className="card-title">{course.title}</h5>

                {/* Provider Info */}
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

                {/* Start Date */}
                <p
                  style={{ fontSize: "13px" }}
                  className="mb-2 text-muted date1"
                >
                  Start Date: {course.startDate}
                </p>

                {/* Remaining Seats */}
                <p style={{ fontSize: "13px" }} className="mb-2 text-muted">
                  Remaining Seats: {course.remainingSeats}
                </p>

                {/* Mode */}
                <p style={{ fontSize: "13px" }} className="mb-3">
                  Mode: <strong>{course.mode}</strong>
                </p>

                {/* Enrollment Button / End Badge */}
                {course.enrollmentOpen ? (
                  <button
                    style={{
                      backgroundColor: "#0a2e67",
                      borderColor: "#0a2e67",
                      fontSize: "12px",
                    }}
                    className="btn btn-primary mt-auto enrollmentButton"
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
      </div>
    </div>
  );
}

export default NewReleaseCourses;
