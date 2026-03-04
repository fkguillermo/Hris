import { useState } from "react";
import type { OrganizationData } from "../organization.types";
import { Button } from "../../../../components/controls/Button";
import { CommonActions } from "../../../../common/CommonActions";

interface Props {
  rows: OrganizationData[];
  onChange: (rows: OrganizationData[]) => void;
  isReadOnly?: boolean;
}

export const OrganizationGrid = ({ rows, onChange, isReadOnly }: Props) => {
  const handleAdd = () => {
    const newRow: OrganizationData = {
      id: Date.now(), // temporary unique id — replaced by server id after save
      code: "",
      description: "",
      isActive: true,
      isNew: true,
      isUpdate: false,
      isDeleted: false,
    };
    onChange([...rows, newRow]);
  };

  const handleUpdate = (
    id: number,
    field: keyof OrganizationData,
    value: any,
  ) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row,
    );
    onChange(updatedRows);
  };

  const handleDelete = (id: number) => {
    const updatedRows = rows
      .map((row) => {
        if (row.id !== id) return row;
        if (row.isNew) return null; // remove new rows entirely
        return { ...row, isDeleted: true };
      })
      .filter(Boolean) as OrganizationData[];
    onChange(updatedRows);
  };

  const handleRestore = (id: number) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, isDeleted: false } : row,
    );
    onChange(updatedRows);
  };

  const addAction = CommonActions.add(handleAdd, isReadOnly);

  return (
    <div className="organization-grid">
      <div className="grid-header">
        <Button
          variant={addAction.variant}
          onClick={addAction.onClick}
          disabled={addAction.disabled}
        >
          {addAction.label}
        </Button>
      </div>

      <table>
        <colgroup>
          <col style={{ width: "8%" }} />
          <col style={{ width: "82%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={`${row.isNew ? "row-new" : ""} ${row.isDeleted ? "row-deleted" : ""}`}
            >
              <td>
                <input
                  type="text"
                  value={row.code}
                  onChange={(e) =>
                    handleUpdate(row.id!, "code", e.target.value)
                  }
                  disabled={row.isDeleted || isReadOnly}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) =>
                    handleUpdate(row.id!, "description", e.target.value)
                  }
                  disabled={row.isDeleted || isReadOnly}
                />
              </td>
              <td style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={row.isActive}
                  onChange={(e) =>
                    handleUpdate(row.id!, "isActive", e.target.checked)
                  }
                  disabled={row.isDeleted || isReadOnly}
                />
              </td>
              <td>
                {row.isDeleted ? (
                  <button onClick={() => handleRestore(row.id!)}>
                    Restore
                  </button>
                ) : (
                  <button
                    onClick={() => handleDelete(row.id!)}
                    disabled={isReadOnly || isReadOnly}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
