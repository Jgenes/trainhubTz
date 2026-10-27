import { useState } from "react";
import useTabKeys from "../hooks/useTabKeys";
import AboutTab from "./AboutTab";
import OutcomesTab from "./OutcomeTabs";
import CoursesTab from "./CoursesTab";

const tabs = [
  { id: "about", label: "About" },
  { id: "outcomes", label: "Outcomes" },
  { id: "courses", label: "Courses" },
];

export default function ProgramTabs() {
  const [activeTab, setActiveTab] = useState("about");
  const handleKeyDown = useTabKeys({
    ids: tabs.map((tab) => tab.id),
    activeId: activeTab,
    onChange: setActiveTab,
    idPrefix: "program-tab-",
  });

  return (
    <div>
      <div
        className="tabs"
        role="tablist"
        aria-label="Programme information"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            id={`program-tab-${tab.id}`}
            role="tab"
            className="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`program-panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className="tab-panel"
        role="tabpanel"
        id={`program-panel-${activeTab}`}
        aria-labelledby={`program-tab-${activeTab}`}
        tabIndex={0}
      >
        {activeTab === "about" ? <AboutTab /> : null}
        {activeTab === "outcomes" ? <OutcomesTab /> : null}
        {activeTab === "courses" ? <CoursesTab /> : null}
      </div>
    </div>
  );
}
