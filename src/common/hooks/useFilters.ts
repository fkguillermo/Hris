import { useState } from "react";

export function useFilters<T extends Record<string, any>>(initial: T) {
  const [filters, setFilters] = useState(initial);

  const setFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters(initial);
  };

  return {
    filters,
    setFilter,
    resetFilters,
  };
}
