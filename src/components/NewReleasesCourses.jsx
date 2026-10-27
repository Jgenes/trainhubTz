import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const courses = [
  {
    title: "Web Development",
    remainingSeats: 5,
    mode: "Online",
    enrollmentOpen: true,
    img: "https://images.unsplash.com/photo-1581092580496-3e78f4f3f1ee?auto=format&fit=crop&w=400&q=80",
    provider: "Tech Academy",
    providerLogo:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=100&q=80",
    startDate: "2026-02-01",
  },
  {
    title: "Networking Basics",
    remainingSeats: 0,
    mode: "Offline",
    enrollmentOpen: false,
    img: "https://images.unsplash.com/photo-1581091870621-48d3d05c47fa?auto=format&fit=crop&w=400&q=80",
    provider: "NetPro Institute",
    providerLogo:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb0f12?auto=format&fit=crop&w=100&q=80",
    startDate: "2026-02-10",
  },
  {
    title: "Cyber Security",
    remainingSeats: 10,
    mode: "Online",
    enrollmentOpen: true,
    img: "https://images.unsplash.com/photo-1581092334679-1d7f59df5ffb?auto=format&fit=crop&w=400&q=80",
    provider: "SecureLearn",
    providerLogo:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=100&q=80",
    startDate: "2026-03-01",
  },
  {
    title: "Data Analysis",
    remainingSeats: 2,
    mode: "Offline",
    enrollmentOpen: true,
    img: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=400&q=80",
    provider: "DataHub Academy",
    providerLogo:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=100&q=80",
    startDate: "2026-03-15",
  },
];

export default function NewReleaseCourses() {
  return (
    <section className="section section--muted" aria-labelledby="new-trainings-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-head__title" id="new-trainings-title">
              New trainings
            </h2>
            <p className="section-head__sub">
              Recently published intakes with open enrolment.
            </p>
          </div>
          <Link className="section-head__link" to="/trainings">
            View all trainings <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
