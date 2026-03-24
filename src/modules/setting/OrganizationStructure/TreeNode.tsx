import { useState } from "react";
import { NODE_COLORS, type NodeTypeColor } from "../../../common/NodeColors.ts";
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

interface Props {
  node: OrgHierarchyNode;
  currentUserId: number;
  onRefresh: () => void;
  showMessage: (success: boolean, message: string) => void;
  isRoot?: boolean;
  depth?: number;
  expandedMap: Record<number, boolean>;
  setExpandedMap: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}

export default function TreeNode({
  node,
  currentUserId,
  onRefresh,
  showMessage,
  isRoot = false,
  depth = 0,
  expandedMap,
  setExpandedMap,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  // const [expanded, setExpanded] = useState(false);
  const { showMessageBox, messageBoxProps } = useMessageBox();
  const existingChildRefIds = node.children.map((c) => c.referenceId);

  const nodeType = node.nodeType?.toString().trim();
  const childType = CHILD_TYPE[nodeType] as NodeType | undefined;
  const hasChildren = node.children.length > 0;

  const nodeTypeKey = nodeType as NodeTypeColor;
  const accent = NODE_COLORS[nodeTypeKey] ?? "#6b7280"; // fallback gray

  const expanded = expandedMap[node.id] ?? false; // default collapsed

  const toggle = () => {
    setExpandedMap((prev) => ({
      ...prev,
      [node.id]: !expanded,
    }));
  };

  return (
    <div className={isRoot ? "tree-root" : "tree-node"}>
      {!isRoot && (
        <div
          className="tree-node__row"
          style={{ paddingLeft: `${Math.max(depth, 0) * 20}px` }}
        >
          <div className="tree-node__left">
            <button
              className="tree-node__toggle"
              onClick={toggle}
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
              <Button
                style={{
                  backgroundColor: NODE_COLORS[childType as NodeTypeColor],
                  borderColor: NODE_COLORS[childType as NodeTypeColor],
                  color: "#fff", // ensures contrast
                }}
                onClick={() => setShowModal(true)}
              >
                + Add {CHILD_LABEL[nodeType]}
              </Button>
            )}
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
              // depth={(depth ?? 0) + 1}
              expandedMap={expandedMap}
              setExpandedMap={setExpandedMap}
            />
          ))}
        </div>
      )}

      {/* Add Company row — only on root level */}
      {isRoot && (
        <div className="tree-node__row">
          <div className="tree-node__left" />
          <div className="tree-node__actions">
            <Button
              style={{
                backgroundColor: NODE_COLORS["C" as NodeTypeColor],
                borderColor: NODE_COLORS["C" as NodeTypeColor],
                color: "#fff",
              }}
              onClick={() => setShowModal(true)}
            >
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
          existingReferenceIds={existingChildRefIds}
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
