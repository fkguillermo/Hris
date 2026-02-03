import { useEffect, useState } from "react";
import { getCategories } from "../api/category.service";

export function useCategories() {
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    [],
  );
  useEffect(() => {
    getCategories().then((data) =>
      setOptions(data.map((e) => ({ value: e.id, label: e.name }))),
    );
  }, []);
  return options;
};