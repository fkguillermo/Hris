import { useEffect, useState } from "react";
import { fetchEmployees } from "../api/employee.api";

export const useEmployees = () => {
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    [],
  );
  useEffect(() => {
    fetchEmployees().then((data) =>
      setOptions(data.map((e) => ({ value: e.id, label: e.name }))),
    );
  }, []);
  return options;
};
