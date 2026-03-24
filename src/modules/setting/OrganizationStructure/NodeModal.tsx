import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  fetchOrgByNodeType,
  batchUpdateNodes,
} from "../../api/setting/orgStructure.api.ts";

import type {
  OrgHierarchyNode,
  OrgHierarchyReferenceItem,
  BulkSyncPayload,
  NodeType,
} from "../../types/organization/orgStructure.types.ts";
import { Button } from "../../../components/controls/Button.tsx";

const NODE_LABELS: Record<NodeType, string> = {
  R: "Root",
  C: "Company",
  B: "Branch",
  V: "Division",
  D: "Department",
  S: "Section",
};

interface Props {
  parentNode: OrgHierarchyNode;
  childNodeType: NodeType;
  currentUserId: number;
  existingReferenceIds?: number[];
  onSaved: () => void;
  onClose: () => void;
  showMessage: (success: boolean, message: string) => void;
}

export default function HierarchyModal({
  parentNode,
  childNodeType,
  currentUserId,
  existingReferenceIds = [],
  onSaved,
  onClose,
  showMessage,
}: Props) {
  const [items, setItems] = useState<OrgHierarchyReferenceItem[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>(
    existingReferenceIds ?? [],
  );

  useEffect(() => {
    fetchOrgByNodeType(childNodeType).then((data) => {
      setItems(data);
      const existing = new Set(
        parentNode.children
          .filter((c) => c.nodeType === childNodeType)
          .map((c) => c.referenceId),
      );
      setSelected(existing);
      setLoading(false);
    });
  }, [childNodeType, parentNode]);

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: BulkSyncPayload = {
        parentId: parentNode.id,
        companyId: parentNode.companyId,
        childNodeType,
        referenceIds: [...selected],
        modifiedBy: currentUserId,
      };
      await batchUpdateNodes(payload);
      onSaved();
    } catch (err: any) {
      showMessage(false, err?.response?.data?.error ?? "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h3 className="modal__title">
            Add {NODE_LABELS[childNodeType]}
            {parentNode.description && ` — ${parentNode.description}`}
          </h3>
        </div>

        <div className="modal__body">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : items.length === 0 ? (
            <p className="no-data">No active items found.</p>
          ) : (
            <ul className="modal__checklist">
              {items.map((item) => (
                <li key={item.id} className="modal__checklist-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={() => toggle(item.id)}
                    />
                    <span>
                      {item.code} — {item.description}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="modal__footer">
          <Button variant="default" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving || loading}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
