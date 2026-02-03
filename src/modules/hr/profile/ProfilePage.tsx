import React, { useState } from "react";
import { PageShell } from "../../../components/layout/PageShell";
import { ProfilePageFilters } from "./ProfilePageFilters";
import { ProfilePageActions } from "./ProfilePageActions";
import { ContentCard } from "../../../components/layout/ContentCard";

export const ProfilePage: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = () => {
    console.log("Search clicked!");
    console.log("Selected Employee:", selectedEmployee);
    console.log("Selected Category:", selectedCategory);

    const message = `You selected Employee: ${selectedEmployee || "None"} and Category: ${selectedCategory || "None"}`;
    alert(message);
    // Do your search logic here
    // e.g., fetch data, filter results, etc.
  };

  const handleReset = () => {
    setSelectedEmployee("");
    setSelectedCategory("");
    console.log("Filters reset!");
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
        <ProfilePageActions onSearch={handleSearch} onReset={handleReset} />
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
