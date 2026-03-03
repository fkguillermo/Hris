import type { MenuItem } from "./menu.types";

let menuCache: MenuItem[] = [];

export const MenuStore = {
  set(menus: MenuItem[]) {
    menuCache = menus;
  },

  getAll() {
    return menuCache;
  },

  getByRoute(pathname?: string) {
    if (!pathname) return undefined;

    return menuCache.find(
      (m) =>
        m.routeUrl &&
        (pathname === m.routeUrl || pathname.startsWith(m.routeUrl + "/")),
    );
  },
};
