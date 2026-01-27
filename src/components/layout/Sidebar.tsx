import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMenuItems } from "../../modules/menu/menu.api";
import { buildMenuTree } from "../../modules/menu/menu.utils";
import type { MenuNode } from "../../modules/menu/menu.utils";

export default function Sidebar() {
  const [menus, setMenus] = useState<MenuNode[]>([]);

  useEffect(() => {
    getMenuItems()
      .then((items) => setMenus(buildMenuTree(items)))
      .catch((err) => console.error("Failed to load menus:", err));
  }, []);

  return (
    <div
      style={{
        width: 220,
        background: "#1e293b",
        color: "#fff",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <h3 style={{ padding: 10 }}>HRIS</h3>
      <MenuList menus={menus} />
    </div>
  );
}

// Recursive menu rendering - all expanded by default
function MenuList({ menus }: { menus: MenuNode[] }) {
  return (
    <>
      {menus.map((menu) => (
        <div key={menu.menuItemId} style={{ paddingLeft: 10 }}>
          {menu.routeUrl ? (
            // Leaf node with route
            <Link
              to={menu.routeUrl}
              style={{
                display: "block",
                padding: "8px 12px",
                color: "#fff",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {menu.menuName}
            </Link>
          ) : (
            // Parent node (without route) - show as plain text
            <div
              style={{
                padding: "8px 12px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {menu.menuName}
            </div>
          )}

          {/* Render children recursively */}
          {menu.children && menu.children.length > 0 && (
            <div>
              <MenuList menus={menu.children} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
