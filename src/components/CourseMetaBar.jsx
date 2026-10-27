const metaItems = [
  {
    label: "Series",
    value: "8 course series",
    sub: "Earn a career credential that demonstrates your expertise",
    icon: "bi-collection-play",
  },
  {
    label: "Mode",
    value: "Online",
    sub: "Live sessions and self-paced content",
    icon: "bi-broadcast",
  },
  {
    label: "Location",
    value: "Dar es Salaam",
    sub: "Physical sessions also available",
    icon: "bi-geo-alt",
    info: "Some cohorts are delivered on site in Dar es Salaam.",
  },
  {
    label: "Duration",
    value: "5 weeks",
    sub: "Approximately 4–6 hours per week",
    icon: "bi-hourglass-split",
  },
  {
    label: "Schedule",
    value: "Flexible",
    sub: "Learn at your own pace",
    icon: "bi-calendar3",
  },
];

export default function CourseMetaBar() {
  return (
    <div className="container mt-4">
      <div className="meta-strip">
        {metaItems.map((item) => (
          <div className="meta-cell" key={item.label}>
            <p className="meta-cell__label">
              <i className={`bi ${item.icon}`} aria-hidden="true" />
              {item.label}
              {item.info ? (
                <i
                  className="bi bi-info-circle"
                  role="img"
                  aria-label={item.info}
                  title={item.info}
                />
              ) : null}
            </p>
            <p className="meta-cell__value">{item.value}</p>
            <p className="meta-cell__sub">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
