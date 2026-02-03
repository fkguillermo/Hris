import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../auth/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../../components/layout/AppLayout";

import Dashboard from "../../modules/dashboard/dashboard";

import ProfilePage from "../../modules/hr/profile/ProfilePage";
import MovementPAge from "../../modules/hr/movement/MovementPage";
import LeavePage from "../../modules/hr/leave/LeavePage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hr/profile" element={<ProfilePage />} />
            <Route path="/hr/movement" element={<MovementPAge />} />
            <Route path="/hr/leave" element={<LeavePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
