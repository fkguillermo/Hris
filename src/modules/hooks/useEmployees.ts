import { useEffect, useState } from "react";
import { getEmployees } from "../api/employee.service";

export const useEmployees = () => {
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    [],
  );
  useEffect(() => {
    getEmployees().then((data) =>
      setOptions(data.map((e) => ({ value: e.id, label: e.name }))),
    );
  }, []);
  return options;
};