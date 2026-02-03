import api from "../../services/api";
import type { MenuItem } from "./menu.types";

export async function getMenuItems(): Promise<MenuItem[]> {
  const res = await api.get(`/menu/items`);
  return res.data.menuData.menuItems;
}
