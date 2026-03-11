import { useEffect, useState } from "react";
import { fetchCategories } from "../api/hr/category.api";

export function useCategories() {
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    [],
  );
  useEffect(() => {
    fetchCategories().then((data) =>
      setOptions(data.map((e) => ({ value: e.id, label: e.name }))),
    );
  }, []);
  return options;
}
