import React from "react";

export const DateInput: React.FC<{ label: string }> = ({ label }) => {
  return (
    <label>
      {label}
      <input type="date" />
    </label>
  );
};
