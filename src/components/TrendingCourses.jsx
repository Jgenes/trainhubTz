import { Link } from "react-router-dom";

const sections = [
  {
    title: "Most popular",
    items: [
      {
        provider: "Google",
        title: "Google Data Analytics",
        type: "Professional Certificate",
        rating: 4.8,
      },
      {
        provider: "DeepLearning.AI",
        title: "AI For Everyone",
        type: "Course",
        rating: 4.8,
      },
      {
        provider: "Google",
        title: "Crash Course on Python",
        type: "Course",
        rating: 4.8,
      },
    ],
  },
  {
    title: "Weekly spotlight",
    items: [
      {
        provider: "Duke University",
        title: "Financial Management",
        type: "Specialization",
        rating: 4.8,
      },
      {
        provider: "ADP",
        title: "ADP Entry-Level Payroll Specialist",
        type: "Professional Certificate",
        rating: 4.7,
      },
      {
        provider: "University of Illinois",
        title: "Financial Analysis - Skills for Success",
        type: "Specialization",
        rating: 4.7,
      },
    ],
  },
  {
    title: "In-demand AI skills",
    items: [
      {
        provider: "Multiple educators",
        title: "Generative AI for Growth Marketing",
        type: "Specialization",
        rating: 4.7,
      },
      {
        provider: "Vanderbilt University",
        title: "Generative AI Software Engineering",
        type: "Specialization",
        rating: 4.8,
      },
      {
        provider: "Google Cloud",
        title: "Generative AI Leader",
        type: "Professional Certificate",
        rating: 4.7,
      },
    ],
  },
];

function providerInitials(provider) {
  return provider
    .replace(/[^a-zA-Z ]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export default function TrendingCourses() {
  return (
    <div className="trending-grid">
      {sections.map((section, index) => (
        <section
          className="trend-column"
          key={section.title}
          aria-labelledby={`trend-column-${index}`}
        >
          <div className="trend-column__head">
            <span id={`trend-column-${index}`}>{section.title}</span>
            <Link to="/trainings" aria-label={`Browse ${section.title.toLowerCase()} trainings`}>
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          {section.items.map((item) => (
            <Link className="trend-item text-reset" to="/course" key={item.title}>
              <span className="provider-badge" aria-hidden="true">
                {providerInitials(item.provider)}
              </span>
              <div className="trend-item__body">
                <span className="trend-item__provider">{item.provider}</span>
                <p className="trend-item__title">{item.title}</p>
                <span className="trend-item__meta">
                  {item.type}
                  <span aria-hidden="true">•</span>
                  <span className="rating">
                    <i className="bi bi-star-fill" aria-hidden="true" />
                    {item.rating}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </section>
      ))}
    </div>
  );
}
