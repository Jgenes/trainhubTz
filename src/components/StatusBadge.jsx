const statusTones = {
  published: "success",
  open: "success",
  active: "success",
  approved: "success",
  completed: "info",
  pending: "warning",
  full: "warning",
  draft: "neutral",
  closed: "danger",
  rejected: "danger",
  cancelled: "danger",
  ended: "neutral",
};

function formatLabel(status = "") {
  const value = String(status);
  if (value === value.toUpperCase()) {
    return value.charAt(0) + value.slice(1).toLowerCase();
  }
  return value;
}

/**
 * Consistent status chip used across provider tables, cards and modals.
 */
export default function StatusBadge({ status }) {
  const key = String(status || "").toLowerCase();
  const tone = statusTones[key] || "neutral";

  return (
    <span className={`status-badge status-badge--${tone}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {formatLabel(status) || "Unknown"}
    </span>
  );
}
