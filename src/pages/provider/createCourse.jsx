import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";
import api from "../../api/axio";

const emptyCourse = {
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
};

export default function CreateCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState(emptyCourse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  const previewRef = useRef("");

  useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    },
    []
  );

  /* =========================
        HANDLERS
  ========================== */

  const handleChange = (event) => {
    setCourse({ ...course, [event.target.name]: event.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...course[field]];
    updated[index] = value;
    setCourse({ ...course, [field]: updated });
  };

  const addArrayItem = (field) => {
    setCourse({ ...course, [field]: [...course[field], ""] });
  };

  const removeArrayItem = (field, index) => {
    setCourse({
      ...course,
      [field]: course[field].filter((_, itemIndex) => itemIndex !== index),
    });
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...course.contents];
    updated[index] = { ...updated[index], [field]: value };
    setCourse({ ...course, contents: updated });
  };

  const addContent = () => {
    setCourse({
      ...course,
      contents: [...course.contents, { title: "", description: "", link: "" }],
    });
  };

  const removeContent = (index) => {
    setCourse({
      ...course,
      contents: course.contents.filter((_, itemIndex) => itemIndex !== index),
    });
  };

  const handleBannerUpload = (event) => {
    const file = event.target.files?.[0] || null;
    setCourse({ ...course, banner: file });

    if (previewRef.current) URL.revokeObjectURL(previewRef.current);

    if (file) {
      const url = URL.createObjectURL(file);
      previewRef.current = url;
      setBannerPreview(url);
    } else {
      previewRef.current = "";
      setBannerPreview("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("title", course.title);
      formData.append("category", course.category);
      formData.append("mode", course.mode);
      formData.append("shortDescription", course.shortDescription);
      formData.append("longDescription", course.longDescription);
      formData.append("status", course.status);

      formData.append("learningOutcomes", JSON.stringify(course.learningOutcomes));
      formData.append("skills", JSON.stringify(course.skills));
      formData.append("requirements", JSON.stringify(course.requirements));
      formData.append("contents", JSON.stringify(course.contents));

      if (course.banner) {
        formData.append("banner", course.banner);
      }

      const response = await api.post("/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const createdCourseId = response.data.course.id;
      toast.success("Course created. Add a cohort to open enrolment.");

      navigate(`/provider/cohorts/${createdCourseId}`, {
        state: { message: "Course created! Please add at least one cohort." },
      });
    } catch (err) {
      console.error("Submission Error:", err);
      const message =
        err.response?.data?.message || "Failed to create course. Try again!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProviderDashboardLayout title="Create course">
      <div className="page-header">
        <div>
          <button
            type="button"
            className="btn btn-ghost btn-sm mb-2 px-2"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left" aria-hidden="true" /> Back
          </button>
          <h2 className="h4 mb-1">Create course</h2>
          <p className="page-header__lead">
            Describe the course, then add at least one cohort so learners can enrol.
          </p>
        </div>
      </div>

      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="pb-5">
        <section className="panel">
          <h3 className="h6 mb-4">Course information</h3>

          <div className="form-grid">
            <div>
              <label className="form-label" htmlFor="course-title">
                Course title <span className="required-mark">*</span>
              </label>
              <input
                id="course-title"
                type="text"
                className="form-control"
                name="title"
                value={course.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid form-grid--2">
              <div>
                <label className="form-label" htmlFor="course-category">
                  Category
                </label>
                <input
                  id="course-category"
                  type="text"
                  className="form-control"
                  name="category"
                  value={course.category}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="form-label" htmlFor="course-mode">
                  Mode
                </label>
                <select
                  id="course-mode"
                  className="form-select"
                  name="mode"
                  value={course.mode}
                  onChange={handleChange}
                >
                  <option value="Online">Online</option>
                  <option value="Physical">Physical</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="course-short">
                Short description
              </label>
              <textarea
                id="course-short"
                className="form-control"
                name="shortDescription"
                rows="2"
                value={course.shortDescription}
                onChange={handleChange}
              />
              <p className="form-hint">Shown in course cards and search results.</p>
            </div>

            <div>
              <label className="form-label" htmlFor="course-long">
                Long description
              </label>
              <textarea
                id="course-long"
                className="form-control"
                name="longDescription"
                rows="5"
                value={course.longDescription}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <section className="panel mt-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h3 className="h6 mb-0">What learners will learn</h3>
            <button
              type="button"
              className="add-link mt-0"
              onClick={() => addArrayItem("learningOutcomes")}
            >
              <i className="bi bi-plus-lg" aria-hidden="true" /> Add outcome
            </button>
          </div>

          {course.learningOutcomes.map((item, index) => (
            <div className="repeat-row" key={`outcome-${index}`}>
              <label className="visually-hidden" htmlFor={`outcome-${index}`}>
                Learning outcome {index + 1}
              </label>
              <input
                id={`outcome-${index}`}
                type="text"
                className="form-control"
                value={item}
                onChange={(event) =>
                  handleArrayChange("learningOutcomes", index, event.target.value)
                }
                placeholder="e.g. Master React Hooks"
              />
              <button
                type="button"
                className="btn btn-ghost btn-icon btn-sm"
                onClick={() => removeArrayItem("learningOutcomes", index)}
                aria-label={`Remove outcome ${index + 1}`}
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>
          ))}
        </section>

        <section className="panel mt-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h3 className="h6 mb-0">Skills gained</h3>
                <button
                  type="button"
                  className="add-link mt-0"
                  onClick={() => addArrayItem("skills")}
                >
                  <i className="bi bi-plus-lg" aria-hidden="true" /> Add skill
                </button>
              </div>

              {course.skills.map((skill, index) => (
                <div className="repeat-row" key={`skill-${index}`}>
                  <label className="visually-hidden" htmlFor={`skill-${index}`}>
                    Skill {index + 1}
                  </label>
                  <input
                    id={`skill-${index}`}
                    type="text"
                    className="form-control"
                    value={skill}
                    onChange={(event) =>
                      handleArrayChange("skills", index, event.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => removeArrayItem("skills", index)}
                    aria-label={`Remove skill ${index + 1}`}
                  >
                    <i className="bi bi-x-lg" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>

            <div className="col-md-6">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h3 className="h6 mb-0">Requirements</h3>
                <button
                  type="button"
                  className="add-link mt-0"
                  onClick={() => addArrayItem("requirements")}
                >
                  <i className="bi bi-plus-lg" aria-hidden="true" /> Add requirement
                </button>
              </div>

              {course.requirements.map((requirement, index) => (
                <div className="repeat-row" key={`requirement-${index}`}>
                  <label className="visually-hidden" htmlFor={`requirement-${index}`}>
                    Requirement {index + 1}
                  </label>
                  <input
                    id={`requirement-${index}`}
                    type="text"
                    className="form-control"
                    value={requirement}
                    onChange={(event) =>
                      handleArrayChange("requirements", index, event.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => removeArrayItem("requirements", index)}
                    aria-label={`Remove requirement ${index + 1}`}
                  >
                    <i className="bi bi-x-lg" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel mt-4">
          <h3 className="h6 mb-3">Course contents</h3>

          {course.contents.map((content, index) => (
            <div className="content-editor" key={`content-${index}`}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-xs fw-semibold text-muted-ink">
                  Section {index + 1}
                </span>
                {course.contents.length > 1 ? (
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon btn-sm"
                    onClick={() => removeContent(index)}
                    aria-label={`Remove section ${index + 1}`}
                  >
                    <i className="bi bi-x-lg" aria-hidden="true" />
                  </button>
                ) : null}
              </div>

              <label className="visually-hidden" htmlFor={`content-title-${index}`}>
                Section {index + 1} title
              </label>
              <input
                id={`content-title-${index}`}
                type="text"
                placeholder="Section title"
                className="form-control mb-2"
                value={content.title}
                onChange={(event) =>
                  handleContentChange(index, "title", event.target.value)
                }
              />

              <label className="visually-hidden" htmlFor={`content-desc-${index}`}>
                Section {index + 1} description
              </label>
              <textarea
                id={`content-desc-${index}`}
                placeholder="Description"
                className="form-control mb-2"
                rows="2"
                value={content.description}
                onChange={(event) =>
                  handleContentChange(index, "description", event.target.value)
                }
              />

              {course.mode === "Online" ? (
                <>
                  <label className="visually-hidden" htmlFor={`content-link-${index}`}>
                    Section {index + 1} video URL
                  </label>
                  <input
                    id={`content-link-${index}`}
                    type="url"
                    placeholder="Video URL"
                    className="form-control"
                    value={content.link}
                    onChange={(event) =>
                      handleContentChange(index, "link", event.target.value)
                    }
                  />
                </>
              ) : null}
            </div>
          ))}

          <button type="button" className="btn btn-secondary-ink btn-sm mt-3" onClick={addContent}>
            <i className="bi bi-plus-lg" aria-hidden="true" />
            Add content section
          </button>
        </section>

        <section className="panel mt-4">
          <div className="row g-4">
            <div className="col-md-6">
              <h3 className="h6 mb-2">Banner image</h3>
              <label className="form-label" htmlFor="course-banner">
                Upload a banner (JPG or PNG)
              </label>
              <input
                id="course-banner"
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleBannerUpload}
              />
              {bannerPreview ? (
                <div className="file-preview">
                  <img src={bannerPreview} alt="Selected banner preview" />
                  <span className="file-preview__name">{course.banner?.name}</span>
                </div>
              ) : null}
            </div>

            <div className="col-md-6">
              <h3 className="h6 mb-2">Publishing status</h3>
              <label className="form-label" htmlFor="course-status">
                Status
              </label>
              <select
                id="course-status"
                className="form-select"
                name="status"
                value={course.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Closed">Closed</option>
              </select>
              <p className="form-hint">
                Courses stay hidden from learners until published and attached to an open
                cohort.
              </p>
            </div>
          </div>
        </section>

        <div className="sticky-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" aria-hidden="true" />
                Saving course…
              </>
            ) : (
              <>
                <i className="bi bi-check2" aria-hidden="true" />
                Create course
              </>
            )}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </ProviderDashboardLayout>
  );
}
