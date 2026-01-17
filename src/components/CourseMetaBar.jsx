import React from "react";
import { FaStar, FaInfoCircle } from "react-icons/fa";
import "../app.css";

const CourseMetaBar = () => {
  return (
    <div className="course-meta-wrapper">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Course Series */}
          <div className="col-md-3 meta-item">
            <h6 className="meta-title">8 course series</h6>
            <p className="meta-text">
              Earn a career credential that demonstrates your expertise
            </p>
          </div>

          {/* Rating */}
          <div className="col-md-2 meta-item">
            <h6 className="meta-title">Mode</h6>
            <p className="meta-text">Online</p>
          </div>

          {/* Level */}
          <div className="col-md-2 meta-item">
            <h6 className="meta-title">
              Location
              <FaInfoCircle className="info" />
            </h6>
            <p className="meta-text">Dar-es-salaam</p>
          </div>

          {/* Duration */}
          <div className="col-md-2 meta-item" style={{ fontSize: "13px" }}>
            <h6 className="meta-title">Duration</h6>
            <p className="meta-text">5 Weeks</p>
          </div>

          {/* Schedule */}
          <div className="col-md-3 meta-item">
            <h6 className="meta-title">Flexible schedule</h6>
            <p className="meta-text">Learn at your own pace</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMetaBar;
