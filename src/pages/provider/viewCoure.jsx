import React from "react";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";

// Example data structure
const exampleCourse = {
  title: "Advanced React",
  category: "Web Development",
  mode: "Online", // Online / Physical / Hybrid
  shortDescription:
    "Learn advanced concepts of React for building robust applications.",
  longDescription:
    "This course covers advanced React patterns, hooks, state management, performance optimization, and best practices.",
  learningOutcomes: [
    "Master advanced hooks like useReducer and useContext",
    "Implement performance optimizations",
    "Build scalable React applications",
  ],
  banner: "https://via.placeholder.com/800x200.png?text=Course+Banner",
  status: "Published", // Draft / Published / Closed
  skills: [
    "React",
    "JavaScript",
    "Frontend Architecture",
    "Performance Optimization",
  ],
  requirements: ["Basic React knowledge", "HTML, CSS, JS understanding"],
  contents: [
    {
      title: "Introduction to Advanced Hooks",
      description: "Deep dive into useReducer and useContext.",
      link: "https://example.com/video1",
    },
    {
      title: "State Management with Redux",
      description: "Learn how to integrate Redux with React apps.",
      link: "https://example.com/video2",
    },
    {
      title: "Performance Optimization",
      description: "Techniques to improve rendering and memory usage.",
    },
  ],
};

export default function ViewCourse({ course = exampleCourse }) {
  const isOnline = course.mode.toLowerCase() === "online";

  return (
    <ProviderDashboardLayout title="View Course">
      <div className="container mt-4">
        {/* Course Banner */}
        {course.banner && (
          <img
            src={course.banner}
            alt={`${course.title} Banner`}
            className="img-fluid rounded mb-3"
          />
        )}

        {/* Course Info */}
        <div className="mb-4">
          <h3 className="h4A">{course.title}</h3>
          <p>
            <strong>
              <i>Category:</i>
            </strong>{" "}
            {course.category} |{" "}
            <strong>
              <i>Mode:</i>
            </strong>{" "}
            {course.mode} |{" "}
            <strong>
              <i>Status:</i>
            </strong>{" "}
            <span className="text-success">{course.status}</span>
          </p>
          <p>
            <strong>
              <i>Short Description:</i>
            </strong>{" "}
            {course.shortDescription}
          </p>
          <p>
            <strong>
              <i>Long Description:</i>
            </strong>{" "}
            {course.longDescription}
          </p>
        </div>
        <hr />
        {/* Learning Outcomes */}
        {course.learningOutcomes?.length > 0 && (
          <div className="mb-4">
            <h3 className="h4A">What You'll Learn</h3>
            <ul>
              {course.learningOutcomes.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <hr />
        {/* Skills */}
        {course.skills?.length > 0 && (
          <div className="mb-4">
            <h3 className="h4A">Skills You'll Gain</h3>
            <ul>
              {course.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        <hr />

        {/* Requirements */}
        {course.requirements?.length > 0 && (
          <div className="mb-4">
            <h3 className="h4A">Requirements</h3>
            <ul>
              {course.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}
        <hr />

        {/* Contents */}
        {course.contents?.length > 0 && (
          <div className="mb-4">
            <h3 className="h4A">Course Contents</h3>
            {course.contents.map((content, idx) => (
              <div key={idx} className="mb-3 p-3 border rounded">
                <h5 className="h5A">{content.title}</h5>
                <p className="p5A">{content.description}</p>
                {isOnline && content.link && (
                  <p>
                    <a
                      href={content.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary viewVideoBtn"
                    >
                      Play Content
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProviderDashboardLayout>
  );
}
