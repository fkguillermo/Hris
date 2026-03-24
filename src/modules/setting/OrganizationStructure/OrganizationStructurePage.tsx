import { useState, useEffect, useCallback } from "react";
import { fetchOrgStructure } from "../../api/setting/orgStructure.api.ts";
import type { OrgHierarchyNode } from "../../types/organization/orgStructure.types.ts";
import TreeNode from "./TreeNode.tsx";

import { PageShell } from "../../../components/layout/PageShell";
import { ContentCard } from "../../../components/layout/ContentCard";
import { Toast } from "../../../components/common/Toast";
import { useToast } from "../../../common/hooks/useToast";

import "../../../styles/setting/organization/orgStructure.css";

const COMPANY_ID = 1;
const CURRENT_USER = 1;

export default function OrganizationStructurePage() {
  const [tree, setTree] = useState<OrgHierarchyNode[]>([]);
  const { toast, showMessage, closeToast } = useToast();
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});

  const loadTree = useCallback(() => {
    fetchOrgStructure(COMPANY_ID).then(setTree);
  }, []);

  useEffect(() => {
    loadTree();
  }, [loadTree]);

  // Virtual root — never renders a row, just owns the companies as children
  const virtualRoot: OrgHierarchyNode = {
    id: 0,
    companyId: COMPANY_ID,
    nodeType: "R",
    referenceId: 0,
    parentId: null,
    code: "",
    description: "",
    isActive: true,
    children: tree,
  };

  return (
    <PageShell>
      <ContentCard title="Organization Structure">
        <div className="org-structure">
          <div className="org-structure__tree">
            <TreeNode
              node={virtualRoot}
              currentUserId={CURRENT_USER}
              onRefresh={loadTree}
              showMessage={showMessage}
              isRoot
              depth={-1}
              expandedMap={expandedMap}
              setExpandedMap={setExpandedMap}
            />
          </div>
        </div>
      </ContentCard>
      <Toast toast={toast} onClose={closeToast} />
    </PageShell>
  );
}
