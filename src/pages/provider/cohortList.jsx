import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";
import Modal from "../../components/Modal";
import dataTableStyles from "../../styles/dataTableStyles";
import StatusBadge from "../../components/StatusBadge";
import {
  getCohorts,
  refreshCohortStatuses,
} from "../../api/courseServices";

export default function CohortList() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [cohorts, setCohorts] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedCohort, setSelectedCohort] = useState(null);

  useEffect(() => {
    fetchCohorts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchCohorts = async () => {
    try {
      setLoading(true);

      const response = await getCohorts(courseId);

      let cohortsData = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          cohortsData = response.data;
        } else if (Array.isArray(response.data.data)) {
          cohortsData = response.data.data;
        } else if (Array.isArray(response.data.cohorts)) {
          cohortsData = response.data.cohorts;
        }
      }

      setCohorts(cohortsData);

      if (cohortsData.length > 0) {
        setCourseName(
          cohortsData[0].course?.title ||
            cohortsData[0].course_name ||
            `Course #${courseId}`
        );
      } else {
        setCourseName(`Course #${courseId}`);
      }
    } catch (error) {
      console.error("Error fetching cohorts:", error);
      setCohorts([]);
      toast.error("Unable to load cohorts for this course.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = cohorts.filter((item) =>
    (item.intake_name || item.intakeName || "")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const handleRefreshStatuses = async () => {
    try {
      setRefreshing(true);
      await refreshCohortStatuses(courseId);
      await fetchCohorts();
      toast.success("Cohort statuses updated.");
    } catch (error) {
      console.error("Error refreshing cohort statuses:", error);
      toast.error("Failed to refresh cohort statuses. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  const calculateRemainingSeats = (cohort) => {
    const enrolled = cohort.enrolled_students || cohort.enrolledStudents || 0;
    const capacity = cohort.capacity || 0;
    return Math.max(0, capacity - enrolled);
  };

  const getCohortStatus = (cohort) => {
    const now = new Date();
    const deadline = new Date(
      cohort.registration_deadline || cohort.registrationDeadline
    );
    const endDate = new Date(cohort.end_date || cohort.endDate);
    const enrolled = cohort.enrolled_students || cohort.enrolledStudents || 0;
    const capacity = cohort.capacity || 0;

    if (now > endDate) return "ENDED";
    if (now > deadline) return "CLOSED";
    if (enrolled >= capacity) return "FULL";
    return cohort.status || "OPEN";
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, width: "70px", sortable: true },
    {
      name: "Intake name",
      selector: (row) => row.intake_name || row.intakeName,
      sortable: true,
      wrap: true,
    },
    {
      name: "Start date",
      selector: (row) => row.start_date || row.startDate,
      sortable: true,
    },
    {
      name: "End date",
      selector: (row) => row.end_date || row.endDate,
      sortable: true,
    },
    { name: "Capacity", selector: (row) => row.capacity, sortable: true },
    {
      name: "Enrolled",
      selector: (row) => row.enrolled_students || row.enrolledStudents || 0,
      sortable: true,
    },
    {
      name: "Remaining seats",
      selector: (row) => calculateRemainingSeats(row),
      sortable: true,
      cell: (row) => {
        const remaining = calculateRemainingSeats(row);
        const capacity = row.capacity || 0;
        const percentage =
          capacity > 0 ? ((capacity - remaining) / capacity) * 100 : 0;

        return (
          <div className="d-flex flex-column gap-1">
            <span className={remaining === 0 ? "text-danger fw-semibold" : ""}>
              {remaining}
            </span>
            <div
              className="progress"
              style={{ height: "4px", width: "66px" }}
              role="progressbar"
              aria-valuenow={Math.round(percentage)}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`${Math.round(percentage)}% of seats filled`}
            >
              <div
                className={`progress-bar ${
                  percentage >= 100
                    ? "bg-danger"
                    : percentage >= 80
                      ? "bg-warning"
                      : "bg-success"
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      name: "Price",
      selector: (row) => `TZS ${(row.price || 0).toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => getCohortStatus(row),
      sortable: true,
      cell: (row) => <StatusBadge status={getCohortStatus(row)} />,
    },
    {
      name: "Actions",
      right: true,
      cell: (row) => (
        <button
          type="button"
          className="btn btn-ghost btn-icon btn-sm"
          onClick={() => setSelectedCohort(row)}
          aria-label={`View cohort ${
            row.intake_name || row.intakeName || row.id
          }`}
        >
          <i className="bi bi-eye" aria-hidden="true" />
        </button>
      ),
    },
  ];

  return (
    <ProviderDashboardLayout title="Course cohorts">
      <div className="page-header">
        <div>
          <button
            type="button"
            className="btn btn-ghost btn-sm mb-2 px-2"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left" aria-hidden="true" /> Back
          </button>
          <h2 className="h4 mb-1">
            Cohorts for{" "}
            <span className="text-primary">
              {courseName || `Course #${courseId}`}
            </span>
          </h2>
          <p className="page-header__lead">
            Open intakes, monitor remaining seats and refresh statuses.
          </p>
        </div>

        <div className="page-header__actions">
          <button
            type="button"
            className="btn btn-secondary-ink"
            onClick={handleRefreshStatuses}
            disabled={refreshing}
          >
            <i
              className={`bi bi-arrow-clockwise${refreshing ? " spinning" : ""}`}
              aria-hidden="true"
            />
            Refresh status
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/provider/cohorts/create/${courseId}`)}
          >
            <i className="bi bi-plus-lg" aria-hidden="true" />
            Add cohort
          </button>
        </div>
      </div>

      <div className="table-panel">
        <div className="table-toolbar">
          <div className="table-toolbar__search">
            <i className="bi bi-search" aria-hidden="true" />
            <label className="visually-hidden" htmlFor="cohort-search">
              Search intakes
            </label>
            <input
              id="cohort-search"
              type="search"
              className="form-control"
              placeholder="Search intake name"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </div>
          <span className="text-xs text-muted-ink ms-auto">
            {filteredData.length} of {cohorts.length} intakes
          </span>
        </div>

        {!loading && filteredData.length === 0 ? (
          <div className="empty-state border-0 bg-transparent">
            <span className="empty-state__icon" aria-hidden="true">
              <i className={`bi ${cohorts.length === 0 ? "bi-calendar-plus" : "bi-search"}`} />
            </span>
            <h3 className="empty-state__title">
              {cohorts.length === 0 ? "No cohorts yet" : "No intakes match your search"}
            </h3>
            <p className="empty-state__text">
              {cohorts.length === 0
                ? "Add an intake so learners can enrol in this course."
                : `Nothing matches “${filterText}”. Try a different intake name.`}
            </p>
            {cohorts.length === 0 ? (
              <button
                type="button"
                className="btn btn-primary btn-sm empty-state__action"
                onClick={() => navigate(`/provider/cohorts/create/${courseId}`)}
              >
                Add cohort
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary-ink btn-sm empty-state__action"
                onClick={() => setFilterText("")}
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="table-scroll" tabIndex={0}>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover
              customStyles={dataTableStyles}
              progressPending={loading}
            />
          </div>
        )}
      </div>

      {selectedCohort ? (
        <Modal
          onClose={() => setSelectedCohort(null)}
          labelledBy="cohort-modal-title"
          size="md"
        >
          <div className="modal-header">
            <h2 className="modal-title" id="cohort-modal-title">
              {selectedCohort.intake_name || selectedCohort.intakeName}
            </h2>
            <button
              type="button"
              className="btn-close"
              aria-label="Close cohort details"
              onClick={() => setSelectedCohort(null)}
            />
          </div>

          <div className="modal-body">
            <div className="row g-4">
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Start date:</strong>{" "}
                  {selectedCohort.start_date || selectedCohort.startDate}
                </p>
                <p className="mb-2">
                  <strong>End date:</strong>{" "}
                  {selectedCohort.end_date || selectedCohort.endDate}
                </p>
                <p className="mb-2">
                  <strong>Registration deadline:</strong>{" "}
                  {selectedCohort.registration_deadline ||
                    selectedCohort.registrationDeadline}
                </p>
                <p className="mb-2">
                  <strong>Price:</strong> TZS{" "}
                  {(selectedCohort.price || 0).toLocaleString()}
                </p>
                <p className="mb-0 d-flex align-items-center gap-2">
                  <strong>Status:</strong>
                  <StatusBadge status={getCohortStatus(selectedCohort)} />
                </p>
              </div>

              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Capacity:</strong> {selectedCohort.capacity} students
                </p>
                <p className="mb-2">
                  <strong>Enrolled students:</strong>{" "}
                  {selectedCohort.enrolled_students ||
                    selectedCohort.enrolledStudents ||
                    0}
                </p>
                <p className="mb-2">
                  <strong>Remaining seats:</strong>{" "}
                  <span
                    className={
                      calculateRemainingSeats(selectedCohort) === 0
                        ? "text-danger fw-semibold"
                        : "text-success fw-semibold"
                    }
                  >
                    {calculateRemainingSeats(selectedCohort)}
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Schedule:</strong>{" "}
                  {selectedCohort.schedule_text || selectedCohort.schedule}
                </p>
                <p className="mb-0">
                  <strong>Venue / link:</strong>{" "}
                  {selectedCohort.venue ||
                    selectedCohort.online_link ||
                    selectedCohort.onlineLink ||
                    "N/A"}
                </p>
              </div>
            </div>

            <hr />

            <h3 className="h6">Description</h3>
            <p className="text-secondary-ink mb-0">
              {selectedCohort.description || "No description provided."}
            </p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary-ink"
              onClick={() => setSelectedCohort(null)}
            >
              Close
            </button>
          </div>
        </Modal>
      ) : null}
    </ProviderDashboardLayout>
  );
}
