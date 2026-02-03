import React from "react";
import "../../styles/contentcard.css";

interface ContentCardProps {
  title?: string;
  children: React.ReactNode;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  children,
}) => {
  return (
    <div className="content-card">
      {title && <h3 className="content-card__title">{title}</h3>}
      <div className="content-card__body">{children}</div>
    </div>
  );
};
