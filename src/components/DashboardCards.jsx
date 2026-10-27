import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const STATS = [
  { title: "Total courses", value: 45, icon: "bi-journal-text" },
  { title: "Total cohorts", value: 12, icon: "bi-calendar-event" },
  { title: "Enrolments", value: 350, icon: "bi-people" },
  { title: "Ongoing trainings", value: 120, icon: "bi-lightning-charge" },
];

const QUICK_ACTIONS = [
  {
    to: "/provider/createCourse",
    icon: "bi-plus-square",
    title: "Create a course",
    text: "Publish a new course and open its first intake.",
  },
  {
    to: "/provider/course",
    icon: "bi-journal-check",
    title: "Manage courses",
    text: "Review course details, statuses and cohorts.",
  },
  {
    to: "/provider/enrollments",
    icon: "bi-people",
    title: "View enrolments",
    text: "See learners enrolled across your cohorts.",
  },
];

const trainingData = {
  labels: ["Cybersecurity", "Cloud", "Python", "DevOps", "AI/ML"],
  datasets: [
    {
      label: "Enrolments",
      data: [120, 80, 90, 60, 110],
      borderColor: "#2859a6",
      backgroundColor: "rgba(40, 89, 166, 0.12)",
      pointBackgroundColor: "#0a2e67",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 4,
      tension: 0.35,
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 8,
        color: "#475569",
        font: { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: "#0d1626",
      padding: 10,
      cornerRadius: 8,
      titleFont: { size: 12 },
      bodyFont: { size: 12 },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { color: "#e4e9f0" },
      ticks: { color: "#64748b", font: { size: 11 } },
    },
    y: {
      beginAtZero: true,
      border: { display: false },
      grid: { color: "#eef2f7" },
      ticks: { color: "#64748b", font: { size: 11 } },
    },
  },
};

export default function Dashboard() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="h4 mb-1">Overview</h2>
          <p className="page-header__lead">
            A snapshot of your courses, cohorts and enrolments.
          </p>
        </div>
      </div>

      <div className="stat-grid mb-4">
        {STATS.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div>
              <p className="stat-card__label">{stat.title}</p>
              <p className="stat-card__value">{stat.value}</p>
            </div>
            <span className="stat-card__icon" aria-hidden="true">
              <i className={`bi ${stat.icon}`} />
            </span>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-xl-8">
          <div className="panel">
            <div className="panel__head">
              <h3 className="panel__title">Training enrolment overview</h3>
            </div>
            <div className="chart-wrap">
              <Line
                data={trainingData}
                options={chartOptions}
                aria-label="Line chart showing enrolments by subject area: Cybersecurity 120, Cloud 80, Python 90, DevOps 60 and AI/ML 110."
              />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="panel">
            <div className="panel__head">
              <h3 className="panel__title">Quick actions</h3>
            </div>

            <div className="stack">
              {QUICK_ACTIONS.map((action) => (
                <Link className="value-card" to={action.to} key={action.to}>
                  <span className="icon-tile" aria-hidden="true">
                    <i className={`bi ${action.icon}`} />
                  </span>
                  <span>
                    <span className="value-card__title d-block">{action.title}</span>
                    <span className="value-card__text d-block">{action.text}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
