import api from "../../../core/service/api";
import type {
  OrgHierarchyNode,
  OrgHierarchyReferenceItem,
  BulkSyncPayload,
} from "../../types/organization/orgStructure.types";

// Maps NodeType to its reference table endpoint
// matches your existing pattern: /settings/organization/{entity}
const entityMap: Record<string, string> = {
  C: "company",
  B: "branch",
  V: "division",
  D: "department",
  S: "section",
};

export const fetchOrgStructure = async (companyId: number) => {
  const res = await api.get<OrgHierarchyNode[]>(
    `/settings/orgstructure/${companyId}`,
  );
  return res.data;
};

export const fetchOrgByNodeType = async (nodeType: string) => {
  const entity = entityMap[nodeType];
  const res = await api.get<OrgHierarchyReferenceItem[]>(
    `/settings/organization/${entity}`,
  );
  return res.data;
};

export const batchUpdateNodes = async (data: BulkSyncPayload) => {
  return api.post(`/settings/orgstructure/batchupdate`, data);
};

export const deleteHierarchyNode = async (id: number) => {
  const res = await api.delete<{ message?: string; error?: string }>(
    `/settings/orgstructure/${id}`,
  );
  return res.data;
};
