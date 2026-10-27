import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import api from "../../api/axio";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";
import dataTableStyles from "../../styles/dataTableStyles";
import StatusBadge from "../../components/StatusBadge";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function ProviderDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filterText, setFilterText] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setLoadError("");
      const response = await api.get("/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoadError("We could not load your courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = courses.filter(
    (item) =>
      item.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleView = (course) => {
    navigate(`/provider/viewCourse/${course.id}`);
  };

  const handleManage = (course) => {
    navigate(`/provider/cohortlist/${course.id}`);
  };

  const handleEdit = () => {
    toast.info("Course editing is not available yet.");
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;

    try {
      setDeleting(true);
      await api.delete(`/courses/${pendingDelete.id}`);
      toast.success(`“${pendingDelete.title}” deleted.`);
      setPendingDelete(null);
      fetchCourses();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete course.");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "80px" },
    { name: "Course name", selector: (row) => row.title, sortable: true, wrap: true },
    { name: "Category", selector: (row) => row.category, sortable: true },
    { name: "Mode", selector: (row) => row.mode, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
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
            onClick={() => handleView(row)}
            aria-label={`View ${row.title}`}
            title="View course"
          >
            <i className="bi bi-eye" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm"
            onClick={() => handleManage(row)}
            aria-label={`Manage cohorts for ${row.title}`}
            title="Manage cohorts"
          >
            <i className="bi bi-calendar-event" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm"
            onClick={() => handleEdit(row)}
            aria-label={`Edit ${row.title}`}
            title="Edit course"
          >
            <i className="bi bi-pencil" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm text-danger"
            onClick={() => setPendingDelete(row)}
            aria-label={`Delete ${row.title}`}
            title="Delete course"
          >
            <i className="bi bi-trash3" aria-hidden="true" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ProviderDashboardLayout title="Courses">
      <div className="page-header">
        <div>
          <h2 className="h4 mb-1">My courses</h2>
          <p className="page-header__lead">
            Create courses, keep details up to date and manage their availability.
          </p>
        </div>
        <div className="page-header__actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/provider/createCourse")}
          >
            <i className="bi bi-plus-lg" aria-hidden="true" />
            Create course
          </button>
        </div>
      </div>

      {loadError ? (
        <div className="alert alert-danger d-flex align-items-center justify-content-between gap-3">
          <span>{loadError}</span>
          <button type="button" className="btn btn-sm btn-secondary-ink" onClick={fetchCourses}>
            Retry
          </button>
        </div>
      ) : null}

      <div className="table-panel">
        <div className="table-toolbar">
          <div className="table-toolbar__search">
            <i className="bi bi-search" aria-hidden="true" />
            <label className="visually-hidden" htmlFor="course-search">
              Search courses
            </label>
            <input
              id="course-search"
              type="search"
              className="form-control"
              placeholder="Search by title or category"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </div>
          <span className="text-xs text-muted-ink ms-auto">
            {filteredData.length} of {courses.length} courses
          </span>
        </div>

        {!loading && filteredData.length === 0 ? (
          <div className="empty-state border-0 bg-transparent">
            <span className="empty-state__icon" aria-hidden="true">
              <i className={`bi ${courses.length === 0 ? "bi-journal-plus" : "bi-search"}`} />
            </span>
            <h3 className="empty-state__title">
              {courses.length === 0 ? "No courses yet" : "No courses match your search"}
            </h3>
            <p className="empty-state__text">
              {courses.length === 0
                ? "Create your first course, then add a cohort to open enrolment."
                : `Nothing matches “${filterText}”. Try a different title or category.`}
            </p>
            {courses.length === 0 ? (
              <button
                type="button"
                className="btn btn-primary btn-sm empty-state__action"
                onClick={() => navigate("/provider/createCourse")}
              >
                Create course
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
              responsive
              customStyles={dataTableStyles}
              progressPending={loading}
            />
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete course?"
        description={
          pendingDelete
            ? `“${pendingDelete.title}” and its cohorts will be removed. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete course"
        destructive
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </ProviderDashboardLayout>
  );
}
