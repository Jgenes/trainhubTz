import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import api from "../../api/axio";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";
import Modal from "../../components/Modal";
import dataTableStyles from "../../styles/dataTableStyles";
import StatusBadge from "../../components/StatusBadge";

export default function ProviderCohorts() {
  const { courseId } = useParams();

  const [filterText, setFilterText] = useState("");
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(Boolean(courseId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!courseId) return undefined;

    let cancelled = false;

    api
      .get(`/courses/${courseId}/cohorts`)
      .then((res) => {
        if (!cancelled) setData(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load cohorts:", err);
        if (!cancelled) setError("Unable to load cohorts for this course.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  const filteredData = data.filter(
    (item) =>
      item.intakeName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.courseName?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleUnavailable = () => {
    toast.info("Cohort editing is managed from the course cohort list.");
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, width: "70px" },
    { name: "Intake name", selector: (row) => row.intakeName, sortable: true, wrap: true },
    { name: "Course", selector: (row) => row.courseName, wrap: true },
    { name: "Mode", selector: (row) => row.mode },
    { name: "Seats", selector: (row) => row.capacity },
    {
      name: "Remaining",
      selector: (row) => row.capacity - row.enrolled,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      name: "Actions",
      right: true,
      cell: (row) => (
        <div className="d-flex gap-1">
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm"
            onClick={() => setSelectedCohort(row)}
            aria-label={`View cohort ${row.intakeName}`}
          >
            <i className="bi bi-eye" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm"
            onClick={handleUnavailable}
            aria-label={`Edit cohort ${row.intakeName}`}
          >
            <i className="bi bi-pencil" aria-hidden="true" />
          </button>
        </div>
      ),
    },
  ];

  if (!courseId) {
    return (
      <ProviderDashboardLayout title="Cohorts">
        <div className="page-header">
          <div>
            <h2 className="h4 mb-1">Cohorts / intakes</h2>
            <p className="page-header__lead">
              Select a course to open its cohorts and intakes.
            </p>
          </div>
        </div>

        <div className="empty-state">
          <span className="empty-state__icon" aria-hidden="true">
            <i className="bi bi-calendar-event" />
          </span>
          <h3 className="empty-state__title">Choose a course first</h3>
          <p className="empty-state__text">
            Cohorts are managed per course. Open one of your courses to view its intakes.
          </p>
          <Link className="btn btn-primary btn-sm empty-state__action" to="/provider/course">
            Go to my courses
          </Link>
        </div>
      </ProviderDashboardLayout>
    );
  }

  return (
    <ProviderDashboardLayout title="Course cohorts">
      <div className="page-header">
        <div>
          <h2 className="h4 mb-1">Cohorts</h2>
          <p className="page-header__lead">
            Intakes for course #{courseId}.
          </p>
        </div>
        <div className="page-header__actions">
          <Link className="btn btn-secondary-ink" to={`/provider/cohortlist/${courseId}`}>
            Manage intakes
          </Link>
          <Link className="btn btn-primary" to={`/provider/cohorts/create/${courseId}`}>
            <i className="bi bi-plus-lg" aria-hidden="true" />
            Add cohort
          </Link>
        </div>
      </div>

      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}

      <div className="table-panel">
        <div className="table-toolbar">
          <div className="table-toolbar__search">
            <i className="bi bi-search" aria-hidden="true" />
            <label className="visually-hidden" htmlFor="cohort-list-search">
              Search cohorts
            </label>
            <input
              id="cohort-list-search"
              type="search"
              className="form-control"
              placeholder="Search intake or course"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </div>
        </div>

        {!loading && filteredData.length === 0 ? (
          <div className="empty-state border-0 bg-transparent">
            <span className="empty-state__icon" aria-hidden="true">
              <i className={`bi ${data.length === 0 ? "bi-calendar-plus" : "bi-search"}`} />
            </span>
            <h3 className="empty-state__title">
              {data.length === 0 ? "No cohorts yet" : "No cohorts match your search"}
            </h3>
            <p className="empty-state__text">
              {data.length === 0
                ? "Add an intake so learners can enrol in this course."
                : `Nothing matches “${filterText}”. Try a different intake name.`}
            </p>
            {data.length === 0 ? (
              <Link
                className="btn btn-primary btn-sm empty-state__action"
                to={`/provider/cohorts/create/${courseId}`}
              >
                Add cohort
              </Link>
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
          labelledBy="cohort-details-title"
          size="md"
        >
          <div className="modal-header">
            <h2 className="modal-title" id="cohort-details-title">
              {selectedCohort.intakeName}
            </h2>
            <button
              type="button"
              className="btn-close"
              aria-label="Close cohort details"
              onClick={() => setSelectedCohort(null)}
            />
          </div>

          <div className="modal-body">
            <p className="mb-2">
              <strong>Course:</strong> {selectedCohort.courseName}
            </p>
            <p className="mb-2">
              <strong>Mode:</strong> {selectedCohort.mode}
            </p>
            {selectedCohort.mode === "Physical" && selectedCohort.venue ? (
              <p className="mb-2">
                <strong>Venue:</strong> {selectedCohort.venue}
              </p>
            ) : null}
            <p className="mb-2">
              <strong>Seats:</strong> {selectedCohort.capacity}
            </p>
            <p className="mb-0 d-flex align-items-center gap-2">
              <strong>Status:</strong> <StatusBadge status={selectedCohort.status} />
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
