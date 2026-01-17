import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";
import api from "../../api/axio"; // Double-check this path and filename (axios.js vs axio.js)
import axios from "axios";
export default function CreateCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    category: "",
    mode: "Online",
    shortDescription: "",
    longDescription: "",
    learningOutcomes: [""],
    skills: [""],
    requirements: [""],
    contents: [{ title: "", description: "", link: "" }],
    status: "Draft",
    banner: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
        HANDLERS
  ========================== */

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...course[field]];
    updated[index] = value;
    setCourse({ ...course, [field]: updated });
  };

  const addArrayItem = (field) => {
    setCourse({ ...course, [field]: [...course[field], ""] });
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...course.contents];
    updated[index][field] = value;
    setCourse({ ...course, contents: updated });
  };

  const addContent = () => {
    setCourse({
      ...course,
      contents: [...course.contents, { title: "", description: "", link: "" }],
    });
  };

  const handleBannerUpload = (e) => {
    setCourse({ ...course, banner: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Prepare Multipart Form Data
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("category", course.category);
      formData.append("mode", course.mode);
      formData.append("shortDescription", course.shortDescription);
      formData.append("longDescription", course.longDescription);
      formData.append("status", course.status);

      // JSON strings for arrays/objects
      formData.append(
        "learningOutcomes",
        JSON.stringify(course.learningOutcomes)
      );
      formData.append("skills", JSON.stringify(course.skills));
      formData.append("requirements", JSON.stringify(course.requirements));
      formData.append("contents", JSON.stringify(course.contents));

      if (course.banner) {
        formData.append("banner", course.banner);
      }

      // 2. Fetch the CSRF Cookie
      // NOTE: We go up one level '../' because api instance baseURL usually ends in /api
      // Sanctum's route is at the root: http://127.0.0.1:8000/sanctum/csrf-cookie
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      // 3. Send the POST request
      // We REMOVED the "Authorization" header. Sanctum uses the cookie set in step 2.
      const response = await api.post("/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const createdCourse = response.data.course;

      navigate(`/provider/cohorts/${createdCourse.id}`, {
        state: { message: "Course created! Please add at least one cohort." },
      });
    } catch (err) {
      console.error("Submission Error:", err);
      setError(
        err.response?.data?.message || "Failed to create course. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProviderDashboardLayout title="Create Course">
      <div className="container mt-4">
        <button
          className="btn btn-sm btn-outline-secondary mb-3 btnB"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <h3 className="h4A mb-3">Course Information</h3>

          <div className="mb-3">
            <label className="form-label">Course Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={course.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={course.category}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mode</label>
            <select
              className="form-select"
              name="mode"
              value={course.mode}
              onChange={handleChange}
            >
              <option>Online</option>
              <option>Physical</option>
              <option>Hybrid</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Short Description</label>
            <textarea
              className="form-control"
              name="shortDescription"
              value={course.shortDescription}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Long Description</label>
            <textarea
              className="form-control"
              rows="4"
              name="longDescription"
              value={course.longDescription}
              onChange={handleChange}
            />
          </div>

          <hr />
          <h3 className="h4A">What You'll Learn</h3>
          {course.learningOutcomes.map((item, idx) => (
            <input
              key={idx}
              type="text"
              className="form-control mb-2"
              value={item}
              onChange={(e) =>
                handleArrayChange("learningOutcomes", idx, e.target.value)
              }
            />
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary mb-3 btnB"
            onClick={() => addArrayItem("learningOutcomes")}
          >
            + Add Outcome
          </button>

          <hr />
          <h3 className="h4A">Skills You'll Gain</h3>
          {course.skills.map((skill, idx) => (
            <input
              key={idx}
              type="text"
              className="form-control mb-2"
              value={skill}
              onChange={(e) => handleArrayChange("skills", idx, e.target.value)}
            />
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary mb-3 btnB"
            onClick={() => addArrayItem("skills")}
          >
            + Add Skill
          </button>

          <hr />
          <h3 className="h4A">Requirements</h3>
          {course.requirements.map((req, idx) => (
            <input
              key={idx}
              type="text"
              className="form-control mb-2"
              value={req}
              onChange={(e) =>
                handleArrayChange("requirements", idx, e.target.value)
              }
            />
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary mb-3 btnB"
            onClick={() => addArrayItem("requirements")}
          >
            + Add Requirement
          </button>

          <hr />
          <h3 className="h4A">Course Contents</h3>
          {course.contents.map((content, idx) => (
            <div key={idx} className="border rounded p-3 mb-3">
              <input
                type="text"
                placeholder="Content Title"
                className="form-control mb-2"
                value={content.title}
                onChange={(e) =>
                  handleContentChange(idx, "title", e.target.value)
                }
              />
              <textarea
                placeholder="Description"
                className="form-control mb-2"
                value={content.description}
                onChange={(e) =>
                  handleContentChange(idx, "description", e.target.value)
                }
              />
              {course.mode === "Online" && (
                <input
                  type="text"
                  placeholder="Video Link (optional)"
                  className="form-control"
                  value={content.link}
                  onChange={(e) =>
                    handleContentChange(idx, "link", e.target.value)
                  }
                />
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary mb-4 btnB"
            onClick={addContent}
          >
            + Add Content Section
          </button>

          <hr />
          <h3 className="h4A">Banner Image</h3>
          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleBannerUpload}
            />
            {course.banner && (
              <small className="text-muted mt-1 d-block">
                Selected: {course.banner.name}
              </small>
            )}
          </div>

          <hr />
          <div className="mb-4">
            <label className="form-label">Course Status</label>
            <select
              className="form-select"
              name="status"
              value={course.status}
              onChange={handleChange}
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Closed</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary btnB"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Course"}
          </button>
        </form>
      </div>
    </ProviderDashboardLayout>
  );
}
