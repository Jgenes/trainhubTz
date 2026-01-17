import React from "react";
import IBMLogo from "../assets/pdpc.png"; // replace with your logo
import "../app.css";
const CourseHero = () => {
  return (
    <section className="course-hero">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT CONTENT */}
          <div className="col-md-7">
            <img src={IBMLogo} alt="Provider Logo" className="provider-logo" />

            <h1 className="course-title">
              IBM RAG and Agentic AI Professional Certificate
            </h1>

            <p className="course-description" style={{ fontSize: "15px" }}>
              Build real-world AI with RAG and agentic AI. Use AI tools to
              streamline automation, drive innovation, and take your career
              further—faster.
            </p>

            <div className="instructors">
              <span className="fw-semibold">Instructors:</span>{" "}
              <a href="#">Personal Data Protection Commission</a>
            </div>

            <div className="mt-4">
              <button
                style={{ fontSize: "13px" }}
                className="btn btn-primary enroll-btn"
              >
                Enroll for free
                <small className="d-block">Starts Jan 13</small>
              </button>
            </div>

            <div className="stats mt-3">
              <strong>42,272</strong> already enrolled
            </div>

            <div className="included mt-2">
              {/* Included with <span>Coursera Plus</span> ·{" "} */}
              {/* <a href="#">Learn more</a> */}
            </div>
          </div>

          {/* RIGHT DECORATION */}
          <div className="col-md-5 d-none d-md-block">
            <div className="hero-art"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
