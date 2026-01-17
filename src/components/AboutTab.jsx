import "../App.css";
import CourseDescription from "./CourseDescription";
export default function ProgramTabs() {
  return (
    <div className="container mt-5">
      {/* <nav className="nav mt-3">
        <a className="nav-link active" aria-current="page" href="#">
          About
        </a>
        <a className="nav-link" href="#">
          Outcomes
        </a>
        <a className="nav-link" href="#">
          Courses
        </a>
      </nav>
      <hr className="hr1" /> */}

      <div className="row row1">
        <h5 style={{ fontSize: "15px" }}>What you'll learn</h5>
        <div className="col-md-6 hell">
          <ul>
            <li style={{ paddingTop: "5px" }}>
              Build job-aligned GenAI skills and hands-on experience to create
              RAG, multimodal, and agentic AI applications
            </li>
            <li style={{ paddingTop: "5px" }}>
              Implement function calling, RAG, and vector stores to build
              intelligent, context-aware applications
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <ul>
            <li style={{ paddingTop: "5px" }}>
              Design and chain AI tools with LangChain for reusable gen AI
              workflows
            </li>
            <li style={{ paddingTop: "8px" }}>
              Create autonomous AI agents using LangGraph, CrewAI, and AG2
            </li>
          </ul>
        </div>
      </div>
      <div className="cate">
        <h5 className="mt-4 mb-3" style={{ fontSize: "15px" }}>
          Skills you'll gain
        </h5>
        <div className="d-flex flex-wrap gap-2">
          {[
            "LangChain",
            "OpenAI API",
            "LLM Applications",
            "Prompt Engineering",
            "Embeddings",
            "Model Context Protocol",
            "Agentic Workflows",
            "LangGraph",
            "Responsible AI",
            "Vector Databases",
            "AI Orchestration",
          ].map((skill) => (
            <span key={skill} className="badge bg-light text-dark border">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="accordion" id="accordionExample">
        <h5 className="mb-3" style={{ fontSize: "15px" }}>
          Contents
        </h5>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>This is the first item’s accordion body.</strong> It is
              shown by default, until the collapse plugin adds the appropriate
              classNamees that we use to style each element. These classNamees
              control the overall appearance, as well as the showing and hiding
              via CSS transitions. You can modify any of this with custom CSS or
              overriding our default variables. It’s also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Accordion Item #2
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>This is the second item’s accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classNamees that we use to style each element. These classNamees
              control the overall appearance, as well as the showing and hiding
              via CSS transitions. You can modify any of this with custom CSS or
              overriding our default variables. It’s also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>This is the third item’s accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classNamees that we use to style each element. These classes
              control the overall appearance, as well as the showing and hiding
              via CSS transitions. You can modify any of this with custom CSS or
              overriding our default variables. It’s also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h5 className="mt-4 mb-3" style={{ fontSize: "15px" }}>
          Requirements
        </h5>
        <ul>
          <li style={{ paddingTop: "5px", fontSize: "13px" }}>
            Build job-aligned GenAI skills
          </li>
          <li style={{ paddingTop: "5px", fontSize: "13px" }}>
            Implement function calling, RAG,
          </li>
          <li style={{ paddingTop: "5px", fontSize: "13px" }}>
            Implement vector stores
          </li>
          <li style={{ paddingTop: "5px", fontSize: "13px" }}>
            Implement vector stores
          </li>
        </ul>
      </div>

      <div className="mt-5">
        <h5 className="mt-4 mb-3" style={{ fontSize: "15px" }}>
          Descriptions
        </h5>
        <CourseDescription />
      </div>
    </div>
  );
}
