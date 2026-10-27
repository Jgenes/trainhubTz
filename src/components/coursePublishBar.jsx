/**
 * Publish checklist for a provider course.
 *
 * Encodes the publishing rules (provider approved, course details complete,
 * at least one cohort, at least one open+priced cohort) and lets the provider
 * toggle publish state. Unmounted today, kept because the rules live here.
 */
export default function CoursePublishBar({ course, cohorts, onPublish }) {
  const hasCohort = cohorts.length > 0;
  const openPricedCohort = cohorts.some(
    (c) => c.status === "Open" && Number(c.price) > 0
  );
  const detailsComplete = Boolean(course.title && course.category);
  const providerApproved = course.provider_status === "APPROVED";

  const canPublish = providerApproved && detailsComplete && hasCohort && openPricedCohort;

  const checks = [
    { label: "Provider approved", passed: providerApproved },
    { label: "Course details complete", passed: detailsComplete },
    { label: "At least one cohort", passed: hasCohort },
    { label: "An open, priced cohort", passed: openPricedCohort },
  ];

  const isPublished = course.status === "Published";

  return (
    <section className="panel" aria-labelledby="publish-status-title">
      <div className="panel__head">
        <h2 className="panel__title" id="publish-status-title">
          Publishing status
        </h2>
      </div>

      <ul className="checklist">
        {checks.map((check) => (
          <li className="checklist__item" key={check.label}>
            <i
              className={`bi ${check.passed ? "bi-check-circle-fill" : "bi-circle"} checklist__icon${
                check.passed ? " is-passed" : ""
              }`}
              aria-hidden="true"
            />
            <span>{check.label}</span>
            <span className="visually-hidden">
              {check.passed ? "— requirement met" : "— requirement not met"}
            </span>
          </li>
        ))}
      </ul>

      {isPublished ? (
        <button type="button" className="btn btn-secondary-ink" onClick={() => onPublish(false)}>
          Unpublish course
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canPublish}
          onClick={() => onPublish(true)}
        >
          Publish course
        </button>
      )}
    </section>
  );
}
