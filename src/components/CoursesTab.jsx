export default function CoursesTab() {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        <i className="bi bi-collection" />
      </span>
      <h3 className="empty-state__title">Course list</h3>
      <p className="empty-state__text">
        Courses bundled in this programme will be listed here once published.
      </p>
    </div>
  );
}
