import { useLocation } from "react-router-dom";
import { MenuStore } from "../menu/menu.store";

export function userMenuPermission() {
  const location = useLocation();
  const menu = MenuStore.getByRoute(location.pathname);

  return {
    isReadOnly:
      (menu?.canView ?? false) &&
      !menu?.canEdit &&
      !menu?.canCreate &&
      !menu?.canDelete,
  };
}
