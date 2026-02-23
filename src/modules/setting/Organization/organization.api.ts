import api from "../../../core/service/api";
import type { OrganizationData } from "./organization.types";

export const fetchData = async (entity: string) => {
  const res = await api.get<OrganizationData[]>(
    `/setting/organization/${entity}`,
  );
  return res.data;
};

export const saveData = async (entity: string, data: OrganizationData[]) => {
  // Filter out deleted items - handle separately if needed
  return api.post(`/setting/organization/${entity}/addupdate`, data);
};
