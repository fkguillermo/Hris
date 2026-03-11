import React, { useState } from "react";
import { PageShell } from "../../../components/layout/PageShell";

import {
  PageActions,
  type PageAction,
} from "../../../components/layout/PageActions";
import { ContentCard } from "../../../components/layout/ContentCard";
import { CommonActions } from "../../../common/CommonActions";
import { PageFilters } from "../../../components/layout/PageFilters";
import { useEmployees } from "../../hooks/useEmployees";
import { useCategories } from "../../hooks/useCategories";
import { AuthService } from "../../../auth/auth.service";

export const ProfilePage: React.FC = () => {
  const [filters, setFilters] = useState({
    employee: "",
    category: "",
  });

  const setFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const user = AuthService.getUser();

  const employeeOptions = useEmployees();
  const categoryOptions = useCategories();

  const onSearch = () => {
    console.log("Search clicked!");
    console.log("Selected Employee:", filters.employee);
    console.log("Selected Category:", filters.category);

    alert(
      `You selected Employee: ${filters.employee || "None"} and Category: ${
        filters.category || "None"
      }`,
    );
  };

  const onReset = () => {
    setFilters({
      employee: "",
      category: "",
    });
  };

  return (
    <PageShell
      title="Profile"
      filters={
        <PageFilters
          filters={[
            {
              type: "dropdown",
              key: "employee",
              label: "Employee",
              options: employeeOptions,
            },
            {
              type: "dropdown",
              key: "category",
              label: "Category",
              options: categoryOptions,
            },
          ]}
          values={filters}
          onChange={setFilter}
        />
      }
      actions={
        <PageActions
          actions={
            [
              CommonActions.search(onSearch),
              CommonActions.reset(onReset),
              CommonActions.edit(() => alert("Edit action triggered!")),
              CommonActions.delete(() => alert("Delete action triggered!")),
              CommonActions.export(() => alert("Export action triggered!")),

              CommonActions.process(
                () => alert("Process action triggered!"),
                !user?.canProcess,
              ),
              CommonActions.approve(
                () => alert("Approve action triggered!"),
                !user?.canApprove,
              ),
              CommonActions.post(
                () => alert("Post action triggered!"),
                !user?.canPost,
              ),
            ].filter(Boolean) as PageAction[]
          }
        />
      }
    >
      <ContentCard title="Profile Page Content">
        <div>
          <p>Your profile content goes here...</p>

          {filters.employee && <p>Selected Employee: {filters.employee}</p>}

          {filters.category && <p>Selected Category: {filters.category}</p>}
        </div>
      </ContentCard>
    </PageShell>
  );
};

export default ProfilePage;
