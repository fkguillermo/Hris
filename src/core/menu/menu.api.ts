import api from "../service/api";
import type { MenuItem } from "./menu.types";

export async function getMenuItems(): Promise<MenuItem[]> {
  const res = await api.get(`/menu/items`);
  return res.data.menuData.menuItems;
}
