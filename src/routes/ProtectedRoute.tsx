import { Navigate, Outlet } from "react-router-dom";
import { AuthService } from "../auth/auth.service";

export default function ProtectedRoute() {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
