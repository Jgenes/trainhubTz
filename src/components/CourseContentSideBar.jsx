const lessons = [
  { title: "CHALLENGE #2: Video Solution", time: "7min", done: true },
  { title: "Introduction to Objects", time: "6min", done: true },
  { title: "Dot vs Bracket Notation", time: "19min", done: true },
  { title: "Object Methods", time: "23min", done: false },
  { title: "CHALLENGE #3: Coding Exercise", time: "", done: false },
  { title: "Iteration: The for Loop", time: "11min", done: true },
  { title: "Looping Arrays", time: "22min", done: true },
  { title: "The while Loop", time: "10min", done: false },
];

export default function CourseContentSidebar() {
  const completed = lessons.filter((lesson) => lesson.done).length;
  const percent = Math.round((completed / lessons.length) * 100);

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel__head">
        <h2 className="sidebar-panel__title">Course content</h2>
        <span className="tag tag--accent">
          <i className="bi bi-stars" aria-hidden="true" /> AI assistant
        </span>
      </div>

      <div className="px-3 py-3 border-bottom">
        <div className="d-flex justify-content-between align-items-center text-xs text-muted-ink mb-2">
          <span>Your progress</span>
          <span>
            {completed} / {lessons.length} lessons
          </span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Lesson progress"
        >
          <div className="progress-bar" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <ul className="lesson-list list-unstyled mb-0">
        {lessons.map((lesson) => (
          <li
            className={`lesson-list__item${lesson.done ? " is-done" : ""}`}
            key={lesson.title}
          >
            <input
              type="checkbox"
              className="lesson-check"
              checked={lesson.done}
              readOnly
              aria-label={`${lesson.title} ${lesson.done ? "completed" : "not completed"}`}
            />
            <span>
              <span className="lesson-list__title d-block">{lesson.title}</span>
              {lesson.time ? (
                <span className="lesson-list__time">{lesson.time}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
