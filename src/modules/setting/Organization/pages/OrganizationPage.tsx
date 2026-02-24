import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { PageShell } from "../../../../components/layout/PageShell";
import { OrganizationTab } from "./OrganizationTab";
import { OrganizationPageActions } from "./OrganizationPageActions";
import { ContentCard } from "../../../../components/layout/ContentCard";
import "../../../../styles/setting/organization/organization.css";

import { OrganizationProvider, useOrganization } from "./OrganizationContext";

const OrganizationPageContent: React.FC = () => {
  const { hasChanges, triggerSave, triggerCancel, triggerRefresh } =
    useOrganization();

  return (
    <PageShell
      actions={
        <OrganizationPageActions
          onRefresh={triggerRefresh}
          onSave={triggerSave}
          onCancel={triggerCancel}
          hasChanges={hasChanges}
        />
      }
    >
      <ContentCard>
        <div className="org-page">
          <div className="org-tabs">
            <NavLink to="/setting/organization/company">Company</NavLink>
            <NavLink to="/setting/organization/branch">Branch</NavLink>
            <NavLink to="/setting/organization/division">Division</NavLink>
            <NavLink to="/setting/organization/department">Department</NavLink>
            <NavLink to="/setting/organization/section">Section</NavLink>
            <NavLink to="/setting/organization/category">Category</NavLink>
            <NavLink to="/setting/organization/grade">Grade</NavLink>
            <NavLink to="/setting/organization/position">Position</NavLink>
            <NavLink to="/setting/organization/jobclass">Job Class</NavLink>
          </div>

          <Routes>
            <Route path="/" element={<Navigate to="company" replace />} />
            <Route
              path="company"
              element={<OrganizationTab entity="company" />}
            />
            <Route
              path="branch"
              element={<OrganizationTab entity="branch" />}
            />
            <Route
              path="division"
              element={<OrganizationTab entity="division" />}
            />
            <Route
              path="department"
              element={<OrganizationTab entity="department" />}
            />
            <Route
              path="section"
              element={<OrganizationTab entity="section" />}
            />
            <Route
              path="category"
              element={<OrganizationTab entity="category" />}
            />
            <Route path="grade" element={<OrganizationTab entity="grade" />} />
            <Route
              path="position"
              element={<OrganizationTab entity="position" />}
            />
            <Route
              path="jobclass"
              element={<OrganizationTab entity="jobclass" />}
            />
          </Routes>
        </div>
      </ContentCard>
    </PageShell>
  );
};

export const OrganizationPage: React.FC = () => {
  return (
    <OrganizationProvider>
      <OrganizationPageContent />
    </OrganizationProvider>
  );
};

export default OrganizationPage;
