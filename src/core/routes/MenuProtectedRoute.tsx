import { Navigate, Outlet, useLocation } from "react-router-dom";
import { MenuStore } from "../../core/menu/menu.store";

export default function MenuProtectedRoute() {
  const location = useLocation();
  const menu = MenuStore.getByRoute(location.pathname);

  if (!menu || !menu.canView) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
