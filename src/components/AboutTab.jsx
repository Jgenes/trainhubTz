import { useState } from "react";
import CourseDescription from "./CourseDescription";
import Modal from "./Modal";

const curriculum = [
  {
    sectionTitle: "Course Introduction",
    lectures: 5,
    duration: "17min",
    unlocked: true,
    lessons: [
      {
        title: "Introduction",
        time: "2:03",
        video: "/videos/intro.mp4",
        preview: true,
      },
      {
        title: "Course Overview Don't Skip this Lecture!",
        time: "8:00",
        preview: true,
      },
      {
        title: "FAQ - Frequently Asked Questions",
        time: "0:26",
        preview: true,
      },
      {
        title: "Course Set-Up and Installation",
        time: "5:42",
        preview: true,
      },
      {
        title: "Notes on Updates Versions of Django",
        time: "1:17",
        preview: true,
      },
    ],
  },
  {
    sectionTitle: "Front-End Introduction",
    lectures: 1,
    duration: "7min",
    unlocked: true,
    lessons: [
      {
        title: "What is the Web?",
        time: "6:43",
        preview: true,
        video: "/videos/web.mp4",
      },
    ],
  },
  {
    sectionTitle: "HTML Level One - Basics",
    lectures: 8,
    duration: "50min",
    unlocked: false,
    lessons: [
      { title: "HTML Introduction", time: "6:10" },
      { title: "HTML Tags", time: "7:20" },
    ],
  },
  {
    sectionTitle: "HTML Level Two - Advanced",
    lectures: 9,
    duration: "1hr 9min",
    unlocked: false,
    lessons: [
      { title: "Forms & Inputs", time: "9:15" },
      { title: "Semantic HTML", time: "8:30" },
    ],
  },
  {
    sectionTitle: "CSS Level One - Basics",
    lectures: 9,
    duration: "1hr 3min",
    unlocked: false,
    lessons: [
      { title: "CSS Syntax", time: "7:00" },
      { title: "Selectors & Colors", time: "8:40" },
    ],
  },
];

const requirements = [
  "Basic programming knowledge",
  "Familiarity with JavaScript",
  "Willingness to learn AI concepts",
];

function VideoPreviewModal({ src, onClose }) {
  return (
    <Modal onClose={onClose} labelledBy="preview-modal-title" size="lg">
      <div className="modal-header">
        <h2 className="modal-title" id="preview-modal-title">
          Preview lesson
        </h2>
        <button type="button" className="btn-close" aria-label="Close preview" onClick={onClose} />
      </div>
      <div className="modal-body p-0 bg-dark">
        <video width="100%" controls autoPlay onEnded={onClose}>
          <source src={src} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
    </Modal>
  );
}

export default function AboutTab() {
  const [previewVideo, setPreviewVideo] = useState(null);

  const totalLectures = curriculum.reduce((total, section) => total + section.lectures, 0);

  return (
    <div>
      <section className="detail-section" aria-labelledby="curriculum-title">
        <div className="section-head mb-4">
          <div>
            <h2 className="detail-section__title mb-1" id="curriculum-title">
              Course content
            </h2>
            <p className="text-sm text-muted-ink mb-0">
              {curriculum.length} sections · {totalLectures} lectures · preview lessons
              available
            </p>
          </div>
        </div>

        <div>
          {curriculum.map((section, index) =>
            section.unlocked ? (
              <details className="disclosure" key={section.sectionTitle}>
                <summary className="disclosure__summary">
                  <span>{section.sectionTitle}</span>
                  <span className="disclosure__meta">
                    {section.lectures} lectures · {section.duration}
                    <i className="bi bi-chevron-down chevron" aria-hidden="true" />
                  </span>
                </summary>

                <div className="disclosure__body">
                  {section.lessons.map((lesson) =>
                    lesson.preview && lesson.video ? (
                      <button
                        type="button"
                        className="lesson"
                        key={lesson.title}
                        onClick={() => setPreviewVideo(lesson.video)}
                      >
                        <span className="lesson__label">
                          <i className="bi bi-play-circle" aria-hidden="true" />
                          <span className="lesson__title">{lesson.title}</span>
                          <span className="tag">Preview</span>
                        </span>
                        <span className="lesson__time">{lesson.time}</span>
                      </button>
                    ) : (
                      <div className="lesson" key={lesson.title}>
                        <span className="lesson__label">
                          <i className="bi bi-play-circle" aria-hidden="true" />
                          <span className="lesson__title">{lesson.title}</span>
                        </span>
                        <span className="lesson__time">{lesson.time}</span>
                      </div>
                    )
                  )}
                </div>
              </details>
            ) : (
              <div className="disclosure" key={`${section.sectionTitle}-${index}`}>
                <div className="disclosure__summary disclosure__summary--static">
                  <span>
                    <i className="bi bi-lock me-2" aria-hidden="true" />
                    {section.sectionTitle}
                  </span>
                  <span className="disclosure__meta">
                    {section.lectures} lectures · {section.duration}
                  </span>
                </div>
                <div className="locked-note">
                  <i className="bi bi-info-circle" aria-hidden="true" />
                  Complete enrolment to unlock this section.
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="detail-section" aria-labelledby="requirements-title">
        <h2 className="detail-section__title" id="requirements-title">
          Requirements
        </h2>
        <ul className="requirement-list">
          {requirements.map((requirement) => (
            <li key={requirement}>
              <i className="bi bi-check2" aria-hidden="true" />
              {requirement}
            </li>
          ))}
        </ul>
      </section>

      <section className="detail-section" aria-labelledby="description-title">
        <h2 className="detail-section__title" id="description-title">
          Description
        </h2>
        <CourseDescription />
      </section>

      {previewVideo ? (
        <VideoPreviewModal src={previewVideo} onClose={() => setPreviewVideo(null)} />
      ) : null}
    </div>
  );
}
