export default function OutcomesTab() {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        <i className="bi bi-bullseye" />
      </span>
      <h3 className="empty-state__title">Programme outcomes</h3>
      <p className="empty-state__text">
        Learning outcomes for this programme will appear here once published.
      </p>
    </div>
  );
}
