import type { MenuItem } from "./menu.types";
export type MenuNode = MenuItem & { children: MenuNode[] };

export function buildMenuTree(items: MenuItem[]): MenuNode[] {
  const visible = items.filter((m) => m.canView);

  const map = new Map<number, MenuNode>();
  const roots: MenuNode[] = [];

  visible.forEach((m) => map.set(m.menuItemId, { ...m, children: [] }));

  visible.forEach((m) => {
    if (m.parentMenuItemId && map.has(m.parentMenuItemId)) {
      map.get(m.parentMenuItemId)!.children.push(map.get(m.menuItemId)!);
    } else if (!m.parentMenuItemId) {
      roots.push(map.get(m.menuItemId)!);
    }
  });

  roots.sort((a, b) => a.displayOrder - b.displayOrder);
  roots.forEach((r) =>
    r.children.sort((a, b) => a.displayOrder - b.displayOrder),
  );

  return roots;
}
