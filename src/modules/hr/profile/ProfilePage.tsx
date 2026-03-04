import React, { useState } from "react";
import { PageShell } from "../../../components/layout/PageShell";
import { ProfilePageFilters } from "./ProfilePageFilters";
import {
  PageActions,
  type PageAction,
} from "../../../components/layout/PageActions";
import { ContentCard } from "../../../components/layout/ContentCard";
import { CommonActions } from "../../../common/CommonActions";

export const ProfilePage: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const onSearch = () => {
    console.log("Search clicked!");
    console.log("Selected Employee:", selectedEmployee);
    console.log("Selected Category:", selectedCategory);

    const message = `You selected Employee: ${selectedEmployee || "None"} and Category: ${selectedCategory || "None"}`;
    alert(message);
    // Do your search logic here
    // e.g., fetch data, filter results, etc.
  };

  const onReset = () => {
    setSelectedEmployee("");
    setSelectedCategory("");
    console.log("Filters reset!");
  };

  const onEdit = () => {
    console.log("Edit clicked!");
    // Implement edit logic here
  };

  return (
    <PageShell
      title="Profile"
      filters={
        <ProfilePageFilters
          selectedEmployee={selectedEmployee}
          selectedCategory={selectedCategory}
          onEmployeeChange={setSelectedEmployee}
          onCategoryChange={setSelectedCategory}
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
            ].filter(Boolean) as PageAction[]
          }
        />
      }
    >
      <ContentCard title="Profile Page Content">
        <div>
          <p>Your profile content goes here...</p>
          {selectedEmployee && <p>Selected Employee: {selectedEmployee}</p>}
          {selectedCategory && <p>Selected Category: {selectedCategory}</p>}
        </div>
      </ContentCard>
    </PageShell>
  );
};

export default ProfilePage;
