export default function CapacityBadge({ capacity = 0, enrolled = 0 }) {
  const total = Number(capacity) || 0;
  const taken = Number(enrolled) || 0;
  const percent = total > 0 ? Math.min(100, Math.round((taken / total) * 100)) : 0;

  let tone = "success";
  if (percent >= 100) tone = "danger";
  else if (percent >= 70) tone = "warning";

  return (
    <span className={`status-badge status-badge--${tone}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {taken}/{total} seats
    </span>
  );
}
