import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { PageShell } from "../../../../components/layout/PageShell";
import { OrganizationTab } from "./OrganizationTab";
import { ContentCard } from "../../../../components/layout/ContentCard";
import "../../../../styles/setting/organization/organization.css";
import { userMenuPermission } from "../../../../core/menu/userMenuPermission";
import { OrganizationProvider, useOrganization } from "./OrganizationContext";
import { PageActions } from "../../../../components/layout/PageActions";
import { CommonActions } from "../../../../common/CommonActions";

const OrganizationPageContent: React.FC = () => {
  const { isReadOnly } = userMenuPermission();
  const { hasChanges, onSave, onCancel, onRefresh } = useOrganization();

  const hasPermission = !isReadOnly;
  const isActionDisabled = !hasChanges || !hasPermission;

  return (
    <PageShell
      actions={
        <PageActions
          actions={[
            CommonActions.refresh(onRefresh),
            CommonActions.save(onSave, isActionDisabled),
            CommonActions.cancel(onCancel, isActionDisabled),
          ]}
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
              element={
                <OrganizationTab entity="company" isReadOnly={isReadOnly} />
              }
            />
            <Route
              path="branch"
              element={
                <OrganizationTab entity="branch" isReadOnly={isReadOnly} />
              }
            />
            <Route
              path="division"
              element={
                <OrganizationTab entity="division" isReadOnly={isReadOnly} />
              }
            />
            <Route
              path="department"
              element={
                <OrganizationTab entity="department" isReadOnly={isReadOnly} />
              }
            />
            <Route
              path="section"
              element={
                <OrganizationTab entity="section" isReadOnly={isReadOnly} />
              }
            />
            <Route
              path="category"
              element={
                <OrganizationTab entity="category" isReadOnly={isReadOnly} />
              }
            />
            <Route
              path="grade"
              element={
                <OrganizationTab entity="grade" isReadOnly={isReadOnly} />
              }
            />
            <Route
              path="position"
              element={
                <OrganizationTab entity="position" isReadOnly={isReadOnly} />
              }
            />
            <Route
              path="jobclass"
              element={
                <OrganizationTab entity="jobclass" isReadOnly={isReadOnly} />
              }
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
