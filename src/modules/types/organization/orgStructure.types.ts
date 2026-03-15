export type NodeType = "C" | "B" | "V" | "D" | "S" | "R";

// What the tree endpoint returns (nested)
export interface OrgHierarchyNode {
  id: number;
  companyId: number;
  nodeType: NodeType;
  referenceId: number;
  parentId: number | null;
  code: string;
  description: string;
  isActive: boolean;
  children: OrgHierarchyNode[];
}

// What the modal list endpoint returns (flat reference items)
export interface OrgHierarchyReferenceItem {
  id: number;
  code: string;
  description: string;
  isActive: boolean;
}

// POST /bulk-sync payload
export interface BulkSyncPayload {
  parentId: number | null;
  companyId: number;
  childNodeType: NodeType;
  referenceIds: number[];
  modifiedBy: number;
}
