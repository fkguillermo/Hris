import { useState } from "react";
import { deleteHierarchyNode } from "../../api/setting/orgStructure.api.ts";
import type {
  OrgHierarchyNode,
  NodeType,
} from "../../types/organization/orgStructure.types.ts";
import HierarchyModal from "./NodeModal.tsx";
import { useMessageBox } from "../../../common/hooks/useMessageBox";
import { MessageBox } from "../../../components/common/MessageBox";
import { Button } from "../../../components/controls/Button.tsx";

// R = virtual root, not a real NodeType from DB
const CHILD_TYPE: Partial<Record<string, NodeType>> = {
  R: "C",
  C: "B",
  B: "V",
  V: "D",
  D: "S",
};

const CHILD_LABEL: Partial<Record<string, string>> = {
  R: "Company",
  C: "Branch",
  B: "Division",
  V: "Department",
  D: "Section",
};

const NODE_ACCENT: Partial<Record<string, string>> = {
  C: "#2563eb",
  B: "#7c3aed",
  V: "#0891b2",
  D: "#059669",
  S: "#d97706",
};

interface Props {
  node: OrgHierarchyNode;
  currentUserId: number;
  onRefresh: () => void;
  showMessage: (success: boolean, message: string) => void;
  isRoot?: boolean;
}

export default function TreeNode({
  node,
  currentUserId,
  onRefresh,
  showMessage,
  isRoot = false,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const { showMessageBox, messageBoxProps } = useMessageBox();

  const nodeType = node.nodeType?.toString().trim();
  const childType = CHILD_TYPE[nodeType] as NodeType | undefined;
  const hasChildren = node.children.length > 0;
  const accent = NODE_ACCENT[nodeType] ?? "#6b7280";

  const handleDelete = () => {
    showMessageBox({
      title: "Confirm Delete",
      message: `Delete ${node.code} — ${node.description}?`,
      type: "confirm",
      onOk: async () => {
        try {
          const result = await deleteHierarchyNode(node.id);
          if (result.error) {
            showMessage(false, result.error);
          } else {
            showMessage(true, `${node.code} deleted successfully.`);
            onRefresh();
          }
        } catch (err: any) {
          showMessage(false, err?.response?.data?.error ?? "Delete failed.");
        }
      },
    });
  };

  return (
    <div className={isRoot ? "tree-root" : "tree-node"}>
      {!isRoot && (
        <div className="tree-node__row">
          <div className="tree-node__left">
            <button
              className="tree-node__toggle"
              onClick={() => setExpanded((v) => !v)}
              style={{ visibility: hasChildren ? "visible" : "hidden" }}
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? "▾" : "▸"}
            </button>
            <span
              className="tree-node__accent"
              style={{ background: accent }}
            />
            <span className="tree-node__label">
              <strong>{node.code}</strong> — {node.description}
            </span>
          </div>

          <div className="tree-node__actions">
            {childType && (
              <Button variant="success" onClick={() => setShowModal(true)}>
                + Add {CHILD_LABEL[nodeType]}
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Children — no extra Add button row here */}
      {(isRoot || expanded) && hasChildren && (
        <div className={isRoot ? undefined : "tree-node__children"}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              currentUserId={currentUserId}
              onRefresh={onRefresh}
              showMessage={showMessage}
            />
          ))}
        </div>
      )}

      {/* Add Company row — only on root level */}
      {isRoot && (
        <div className="tree-node__row">
          <div className="tree-node__left" />
          <div className="tree-node__actions">
            <Button variant="success" onClick={() => setShowModal(true)}>
              + Add Company
            </Button>
          </div>
        </div>
      )}

      <MessageBox {...messageBoxProps} />

      {showModal && childType && (
        <HierarchyModal
          parentNode={node}
          childNodeType={childType}
          currentUserId={currentUserId}
          onSaved={() => {
            setShowModal(false);
            onRefresh();
            showMessage(true, `${CHILD_LABEL[nodeType]} saved successfully.`);
          }}
          onClose={() => setShowModal(false)}
          showMessage={showMessage}
        />
      )}
    </div>
  );
}
