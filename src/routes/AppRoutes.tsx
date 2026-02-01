import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";

import Dashboard from "../modules/dashboard";

import Profile from "../modules/hr/employee-profile";

import Organization from "../modules/setting/masterdata/organization";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            {/* HR Module Routes */}
            <Route path="/hr/employee-profile" element={<Profile />} />
            {/* Setting Module Routes */}
            <Route
              path="/setting/masterdata/organization"
              element={<Organization />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
