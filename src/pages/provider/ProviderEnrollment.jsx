import { useState } from "react";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";
import StatusBadge from "../../components/StatusBadge";

const enrollmentsSeed = [
  {
    id: 1,
    student: "John Doe",
    course: "Fullstack Web Development",
    cohort: "Jan 2026",
    date: "2026-01-05",
    status: "Active",
  },
  {
    id: 2,
    student: "Anna Smith",
    course: "UI/UX Design Fundamentals",
    cohort: "Jan 2026",
    date: "2026-01-06",
    status: "Completed",
  },
  {
    id: 3,
    student: "Michael Brown",
    course: "Fullstack Web Development",
    cohort: "Oct 2025",
    date: "2025-10-20",
    status: "Pending",
  },
];

export default function ProviderEnrollments() {
  const [enrollments] = useState(enrollmentsSeed);
  const [filterText, setFilterText] = useState("");

  const filtered = enrollments.filter(
    (enrollment) =>
      enrollment.student.toLowerCase().includes(filterText.toLowerCase()) ||
      enrollment.course.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <ProviderDashboardLayout title="Enrolments">
      <div className="page-header">
        <div>
          <h2 className="h4 mb-1">Enrolments</h2>
          <p className="page-header__lead">
            Track learners enrolled in your courses and cohorts.
          </p>
        </div>
      </div>

      <div className="table-panel">
        <div className="table-toolbar">
          <div className="table-toolbar__search">
            <i className="bi bi-search" aria-hidden="true" />
            <label className="visually-hidden" htmlFor="enrollment-search">
              Search enrolments
            </label>
            <input
              id="enrollment-search"
              type="search"
              className="form-control"
              placeholder="Search by student or course"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </div>
          <span className="text-xs text-muted-ink ms-auto">
            {filtered.length} of {enrollments.length} enrolments
          </span>
        </div>

        <div className="table-scroll" tabIndex={0}>
          <table className="table table-hover align-middle">
            <caption className="visually-hidden">
              Learners enrolled in provider courses
            </caption>
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Course</th>
                <th scope="col">Cohort</th>
                <th scope="col">Enrolled on</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    <div className="empty-state border-0 bg-transparent">
                      <span className="empty-state__icon" aria-hidden="true">
                        <i className="bi bi-people" />
                      </span>
                      <h3 className="empty-state__title">No enrolments found</h3>
                      <p className="empty-state__text">
                        Enrolments will appear here once learners sign up for your
                        cohorts.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td className="fw-semibold">{enrollment.student}</td>
                    <td>{enrollment.course}</td>
                    <td>{enrollment.cohort}</td>
                    <td className="text-secondary-ink">{enrollment.date}</td>
                    <td>
                      <StatusBadge status={enrollment.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ProviderDashboardLayout>
  );
}
