import React, { useState } from "react";
import "../../styles/filterpanel.css";

interface FilterPanelProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  children,
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="filter-panel">
      <div className="filter-panel__header" onClick={toggleCollapse}>
        <h3 className="filter-panel__title">Filter Panel</h3>
        <button
          className={`filter-panel__toggle ${isCollapsed ? "filter-panel__toggle--collapsed" : ""}`}
          aria-label={isCollapsed ? "Expand filters" : "Collapse filters"}
        >
          ▼
        </button>
      </div>
      <div
        className={`filter-panel__content ${
          isCollapsed
            ? "filter-panel__content--collapsed"
            : "filter-panel__content--expanded"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
