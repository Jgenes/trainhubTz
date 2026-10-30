import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axio";
import { storageUrl } from "../../api/config";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";
import StatusBadge from "../../components/StatusBadge";

export default function ViewCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <ProviderDashboardLayout title="Loading course…">
        <div className="panel d-flex align-items-center gap-2" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading course details…
        </div>
      </ProviderDashboardLayout>
    );
  }

  if (!course) {
    return (
      <ProviderDashboardLayout title="Course not found">
        <div className="empty-state">
          <span className="empty-state__icon" aria-hidden="true">
            <i className="bi bi-journal-x" />
          </span>
          <h2 className="empty-state__title">Course not found</h2>
          <p className="empty-state__text">
            The course may have been removed, or you may not have access to it.
          </p>
          <Link className="btn btn-primary btn-sm empty-state__action" to="/provider/course">
            Back to courses
          </Link>
        </div>
      </ProviderDashboardLayout>
    );
  }

  const isOnline = course.mode?.toLowerCase() === "online";
  const bannerUrl = storageUrl(course.banner);

  return (
    <ProviderDashboardLayout title="Course details">
      <div className="page-header">
        <div>
          <Link className="btn btn-ghost btn-sm mb-2 px-2" to="/provider/course">
            <i className="bi bi-arrow-left" aria-hidden="true" /> All courses
          </Link>
          <h2 className="h4 mb-1">{course.title}</h2>
        </div>
        <div className="page-header__actions">
          <Link
            className="btn btn-secondary-ink"
            to={`/provider/cohortlist/${course.id}`}
          >
            <i className="bi bi-calendar-event" aria-hidden="true" />
            Manage cohorts
          </Link>
        </div>
      </div>

      <div className="detail-hero mb-4">
        {bannerUrl && !imageFailed ? (
          <div className="detail-hero__media">
            <img
              src={bannerUrl}
              alt={`${course.title} banner`}
              onError={() => setImageFailed(true)}
            />
          </div>
        ) : null}

        <div className="detail-hero__body">
          <p className="meta-inline mb-2">
            <span>
              <i className="bi bi-tag" aria-hidden="true" />
              {course.category}
            </span>
            <span>
              <i className="bi bi-broadcast" aria-hidden="true" />
              {course.mode}
            </span>
            <StatusBadge status={course.status} />
          </p>

          <p className="text-secondary-ink mb-0">
            {course.short_description || "No short description provided."}
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="panel">
            <h3 className="h6 mb-2">About this course</h3>
            <p className="text-secondary-ink mb-0 prose-block">
              {course.long_description || "No long description provided."}
            </p>
          </div>

          {course.learning_outcomes?.length > 0 ? (
            <div className="panel mt-4">
              <h3 className="h6 mb-3">What learners will learn</h3>
              <ul className="check-list">
                {course.learning_outcomes.map((item, index) => (
                  <li key={index}>
                    <i className="bi bi-check2-circle" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {course.contents?.length > 0 ? (
            <div className="panel mt-4">
              <h3 className="h6 mb-3">Course contents</h3>
              <div className="content-list">
                {course.contents.map((content, index) => (
                  <div className="content-item" key={index}>
                    <h4 className="content-item__title">{content.title}</h4>
                    <p className="content-item__text">{content.description}</p>
                    {isOnline && content.link ? (
                      <a
                        className="btn btn-secondary-ink btn-sm mt-2"
                        href={content.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-play-circle" aria-hidden="true" />
                        Play content
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="col-lg-4">
          {course.skills?.length > 0 ? (
            <div className="panel">
              <h3 className="h6 mb-3">Skills learners gain</h3>
              <div className="skill-list">
                {course.skills.map((skill, index) => (
                  <span className="skill-pill" key={index}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ProviderDashboardLayout>
  );
}
