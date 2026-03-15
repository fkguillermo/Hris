import api from "../../../core/service/api";
import type { OrganizationData } from "../../types/organization/organization.types";

export const fetchData = async (entity: string) => {
  const res = await api.get<OrganizationData[]>(
    `/settings/organization/${entity}`,
  );
  return res.data;
};

export const saveData = async (entity: string, data: OrganizationData[]) => {
  // Filter out deleted items - handle separately if needed
  return api.post(`/settings/organization/${entity}/addupdate`, data);
};
