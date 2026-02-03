import React from "react";
import "../../styles/ActionPanel.css";
interface ActionPanelProps {
  children: React.ReactNode;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ children }) => {
  return <div className="action-panel">{children}</div>;
};