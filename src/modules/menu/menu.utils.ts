import type { MenuItem } from "./menu.types";
export type MenuNode = MenuItem & { children: MenuNode[] };

export function buildMenuTree(items: MenuItem[]): MenuNode[] {
  const map = new Map<number, MenuNode>();
  const roots: MenuNode[] = [];

  items.forEach((item) => {
    map.set(item.menuItemId, { ...item, children: [] });
  });

  items.forEach((item) => {
    if (item.parentMenuItemId) {
      map.get(item.parentMenuItemId)?.children.push(map.get(item.menuItemId)!);
    } else {
      roots.push(map.get(item.menuItemId)!);
    }
  });

  const sortMenus = (menus: MenuNode[]) => {
    menus.sort((a, b) => a.displayOrder - b.displayOrder);
    menus.forEach((m) => sortMenus(m.children));
  };

  sortMenus(roots);

  return roots;
}
