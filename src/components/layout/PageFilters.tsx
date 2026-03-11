import React from "react";
import { FilterPanel } from "../panels/FilterPanel";
import { DropDown } from "../controls/DropDown";
import type { FilterVariant } from "../../common/FilterVariants";

export interface PageFilterConfig {
  type: FilterVariant;
  key: string;
  label: string;
  options?: any[];
  placeholder?: string;
}

interface PageFiltersProps {
  filters: PageFilterConfig[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

export const PageFilters: React.FC<PageFiltersProps> = ({
  filters,
  values,
  onChange,
}) => {
  const renderFilter = (filter: PageFilterConfig): React.ReactNode => {
    switch (filter.type) {
      case "dropdown":
        return (
          <DropDown
            key={filter.key}
            label={filter.label}
            options={filter.options ?? []}
            value={values[filter.key] ?? ""}
            onChange={(v) => onChange(filter.key, v)}
            placeholder={filter.placeholder}
          />
        );

      default:
        return null;
    }
  };

  return <FilterPanel>{filters.map((f) => renderFilter(f))}</FilterPanel>;
};
