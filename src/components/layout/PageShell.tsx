import React from "react";
import "../../styles/pageshell.css";

interface PageShellProps {
  title?: string;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({
  title,
  filters,
  actions,
  children,
}) => {
  return (
    <div className="page-shell">
      {title && <h2 className="page-shell__title">{title}</h2>}
      {filters && <div className="page-shell__filters">{filters}</div>}
      {actions && <div className="page-shell__actions">{actions}</div>}
      <main className="page-shell__main">{children}</main>
    </div>
  );
};
