import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";
import api from "../../api/axio";

const initialCohort = {
  intakeName: "",
  startDate: "",
  endDate: "",
  schedule: "",
  mode: "Online",
  venue: "",
  onlineLink: "",
  capacity: "",
  price: "",
  registrationDeadline: "",
  status: "Open",
  description: "",
};

export default function CreateCohort() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [cohort, setCohort] = useState(initialCohort);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCohort((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const payload = {
        intake_name: cohort.intakeName,
        start_date: cohort.startDate,
        end_date: cohort.endDate,
        schedule_text: cohort.schedule,
        mode: cohort.mode,
        venue: cohort.venue,
        online_link: cohort.onlineLink,
        capacity: parseInt(cohort.capacity, 10) || 0,
        price: parseFloat(cohort.price) || 0,
        registration_deadline: cohort.registrationDeadline,
        status: cohort.status.toUpperCase(),
        description: cohort.description,
      };

      await api.post(`/courses/${courseId}/cohorts`, payload);

      toast.success("Cohort created successfully.");
      navigate(`/provider/cohortlist/${courseId}`);
    } catch (err) {
      console.error("Submit Error:", err.response?.data || err);
      toast.error(
        err.response?.data?.message || "Failed to create cohort. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProviderDashboardLayout title="Create cohort">
      <div className="page-header">
        <div>
          <button
            type="button"
            className="btn btn-ghost btn-sm mb-2 px-2"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left" aria-hidden="true" /> Back
          </button>
          <h2 className="h4 mb-1">Add cohort</h2>
          <p className="page-header__lead">
            Cohorts define the intake dates, schedule, seats and price learners see.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="pb-5">
        <section className="panel">
          <h3 className="h6 mb-4">Intake details</h3>

          <div className="form-grid">
            <div>
              <label className="form-label" htmlFor="cohort-name">
                Intake name <span className="required-mark">*</span>
              </label>
              <input
                id="cohort-name"
                type="text"
                className="form-control"
                name="intakeName"
                value={cohort.intakeName}
                onChange={handleChange}
                placeholder="e.g. February 2026 intake"
                required
              />
            </div>

            <div className="form-grid form-grid--2">
              <div>
                <label className="form-label" htmlFor="cohort-start">
                  Start date <span className="required-mark">*</span>
                </label>
                <input
                  id="cohort-start"
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={cohort.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="cohort-end">
                  End date <span className="required-mark">*</span>
                </label>
                <input
                  id="cohort-end"
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={cohort.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="cohort-schedule">
                Schedule <span className="required-mark">*</span>
              </label>
              <input
                id="cohort-schedule"
                type="text"
                className="form-control"
                name="schedule"
                value={cohort.schedule}
                onChange={handleChange}
                placeholder="e.g. Mon – Fri | 6pm – 8pm"
                required
              />
            </div>

            <div className="form-grid form-grid--2">
              <div>
                <label className="form-label" htmlFor="cohort-mode">
                  Mode
                </label>
                <select
                  id="cohort-mode"
                  className="form-select"
                  name="mode"
                  value={cohort.mode}
                  onChange={handleChange}
                >
                  <option value="Online">Online</option>
                  <option value="Physical">Physical</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="cohort-status">
                  Status
                </label>
                <select
                  id="cohort-status"
                  className="form-select"
                  name="status"
                  value={cohort.status}
                  onChange={handleChange}
                >
                  <option value="Open">Open</option>
                  <option value="Full">Full</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {cohort.mode === "Physical" || cohort.mode === "Hybrid" ? (
              <div>
                <label className="form-label" htmlFor="cohort-venue">
                  Venue
                </label>
                <input
                  id="cohort-venue"
                  type="text"
                  className="form-control"
                  name="venue"
                  value={cohort.venue}
                  onChange={handleChange}
                  placeholder="Physical location"
                />
              </div>
            ) : null}

            {cohort.mode === "Online" || cohort.mode === "Hybrid" ? (
              <div>
                <label className="form-label" htmlFor="cohort-link">
                  Online link
                </label>
                <input
                  id="cohort-link"
                  type="url"
                  className="form-control"
                  name="onlineLink"
                  value={cohort.onlineLink}
                  onChange={handleChange}
                  placeholder="Zoom / Google Meet link"
                />
              </div>
            ) : null}

            <div className="form-grid form-grid--2">
              <div>
                <label className="form-label" htmlFor="cohort-capacity">
                  Capacity (seats) <span className="required-mark">*</span>
                </label>
                <input
                  id="cohort-capacity"
                  type="number"
                  min="1"
                  className="form-control"
                  name="capacity"
                  value={cohort.capacity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="cohort-price">
                  Price (TZS) <span className="required-mark">*</span>
                </label>
                <input
                  id="cohort-price"
                  type="number"
                  min="0"
                  step="1000"
                  className="form-control"
                  name="price"
                  value={cohort.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="cohort-deadline">
                Registration deadline <span className="required-mark">*</span>
              </label>
              <input
                id="cohort-deadline"
                type="date"
                className="form-control"
                name="registrationDeadline"
                value={cohort.registrationDeadline}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="form-label" htmlFor="cohort-description">
                Description
              </label>
              <textarea
                id="cohort-description"
                className="form-control"
                name="description"
                rows="4"
                value={cohort.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <div className="sticky-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" aria-hidden="true" />
                Creating cohort…
              </>
            ) : (
              <>
                <i className="bi bi-check2" aria-hidden="true" />
                Create cohort
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
