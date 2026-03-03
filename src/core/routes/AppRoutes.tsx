import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import MenuProtectedRoute from "./MenuProtectedRoute";

import AppLayout from "../../components/layout/AppLayout";

import LoginPage from "../../auth/pages/LoginPage";

import DashboardPage from "../../modules/dashboard/DashboardPage";
// HR Pages
import ProfilePage from "../../modules/hr/profile/ProfilePage";
import MovementPage from "../../modules/hr/movement/MovementPage";
import LeavePage from "../../modules/hr/leave/LeavePage";
// Setting Pages
import OrganizationPage from "../../modules/setting/Organization/pages/OrganizationPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route element={<MenuProtectedRoute />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/hr/profile" element={<ProfilePage />} />
              <Route path="/hr/movement" element={<MovementPage />} />
              <Route path="/hr/leave" element={<LeavePage />} />

              <Route
                path="/setting/organization/*"
                element={<OrganizationPage />}
              />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
