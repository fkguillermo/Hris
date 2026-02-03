import React from "react";

export const Checkbox: React.FC<{ label: string }> = ({ label }) => {
  return (
    <label>
      <input type="checkbox" /> {label}
    </label>
  );
};
