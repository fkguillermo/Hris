import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getMenuItems } from "../../modules/menu/menu.api";
import { buildMenuTree } from "../../modules/menu/menu.utils";
import type { MenuNode } from "../../modules/menu/menu.utils";
import "../../styles/sidebar.css";

export default function Sidebar() {
  const [menus, setMenus] = useState<MenuNode[]>([]);

  useEffect(() => {
    getMenuItems()
      .then((items) => setMenus(buildMenuTree(items)))
      .catch((err) => console.error("Failed to load menus:", err));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>HRIS</h3>
      </div>
      <div className="sidebar-menu">
        <MenuList menus={menus} />
      </div>
    </div>
  );
}

function MenuList({ menus }: { menus: MenuNode[] }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleMenu = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {menus.map((menu) => {
        const isActive = menu.routeUrl === location.pathname;
        const isExpanded = expanded[menu.menuItemId];

        return (
          <div key={menu.menuItemId} className="menu-item">
            {menu.routeUrl ? (
              <Link
                to={menu.routeUrl}
                className={`menu-link ${isActive ? "active" : ""}`}
              >
                {menu.menuName}
              </Link>
            ) : (
              <div
                onClick={() => menu.expandable && toggleMenu(menu.menuItemId)}
                className={`menu-parent ${!menu.expandable ? "not-expandable" : ""}`}
              >
                <span>{menu.menuName}</span>
                {menu.expandable && (
                  <span className={`menu-icon ${isExpanded ? "expanded" : ""}`}>
                    ▶
                  </span>
                )}
              </div>
            )}

            {menu.children && menu.children.length > 0 && (
              <div
                className="menu-children"
                style={{
                  display: !menu.expandable || isExpanded ? "block" : "none",
                }}
              >
                <MenuList menus={menu.children} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
