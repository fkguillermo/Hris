import React from "react";
import "../../styles/dropdown.css";

interface DropDownOption {
  value: string;
  label: string;
}

interface DropDownProps {
  label: string;
  options: DropDownOption[] | string[] | any[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  valueKey?: string;
  labelKey?: string;
}

export const DropDown: React.FC<DropDownProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Select an option",
  valueKey = "value",
  labelKey = "label",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  // Normalize options to standard format
  const normalizedOptions = options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    return {
      value: option[valueKey] || option.value || option.id || "",
      label:
        option[labelKey] || option.label || option.name || option.value || "",
    };
  });

  return (
    <div className="dropdown">
      <label className="dropdown__label">{label}</label>
      <select
        className="dropdown__select"
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {normalizedOptions.map((option, index) => (
          <option key={option.value || index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
