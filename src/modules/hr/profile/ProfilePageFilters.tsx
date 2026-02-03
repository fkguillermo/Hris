import React from "react";
import { FilterPanel } from "../../../components/panels/FilterPanel";

import { useEmployees } from "../../hooks/useEmployees";
import { useCategories } from "../../hooks/useCategories";

import { DropDown } from "../../../components/controls/DropDown";

interface ProfilePageFiltersProps {
  selectedEmployee: string;
  selectedCategory: string;
  onEmployeeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const ProfilePageFilters: React.FC<ProfilePageFiltersProps> = ({
  selectedEmployee,
  selectedCategory,
  onEmployeeChange,
  onCategoryChange,
}) => {
  const employeeOptions = useEmployees();
  const categoryOptions = useCategories();

  return (
    <FilterPanel>
      <DropDown
        label="Employee"
        options={employeeOptions}
        value={selectedEmployee}
        onChange={onEmployeeChange}
        placeholder="Select Employee"
      />
      <DropDown
        label="Category"
        options={categoryOptions}
        value={selectedCategory}
        onChange={onCategoryChange}
        placeholder="Select Category"
      />
    </FilterPanel>
  );
};
