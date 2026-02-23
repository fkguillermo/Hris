import { useState } from "react";
import type { OrganizationData } from "../organization.types";

interface Props {
  rows: OrganizationData[];
  onChange: (rows: OrganizationData[]) => void;
}

export const OrganizationGrid = ({ rows, onChange }: Props) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  // Add new row
  const handleAdd = () => {
    const newRow: OrganizationData = {
      code: "",
      description: "",
      isActive: true,
      isNew: true,
      isUpdate: false,
      isDeleted: false,
    };

    console.log("Adding new row:", newRow); // Debug log
    onChange([...rows, newRow]);
  };

  // Update existing row
  const handleUpdate = (
    id: number,
    field: keyof OrganizationData,
    value: any,
  ) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    onChange(updatedRows);
  };

  // Mark row for deletion
  const handleDelete = (id: number) => {
    const updatedRows = rows
      .map((row) => {
        if (row.id === id) {
          // If it's a new row, remove it completely
          if (row.isNew) {
            return null;
          }
          // Otherwise, mark for deletion
          return { ...row, isDeleted: true };
        }
        return row;
      })
      .filter(Boolean) as OrganizationData[];

    onChange(updatedRows);
  };

  // Restore deleted row
  const handleRestore = (id: number) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, isDeleted: false };
      }
      return row;
    });
    onChange(updatedRows);
  };

  return (
    <div className="organization-grid">
      <div className="grid-header">
        <button onClick={handleAdd} className="btn-add">
          + Add New
        </button>
      </div>

      <table>
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
                  disabled={row.isDeleted}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) =>
                    handleUpdate(row.id!, "description", e.target.value)
                  }
                  disabled={row.isDeleted}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={row.isActive}
                  onChange={(e) =>
                    handleUpdate(row.id!, "isActive", e.target.checked)
                  }
                  disabled={row.isDeleted}
                />
              </td>
              <td>
                {row.isDeleted ? (
                  <button onClick={() => handleRestore(row.id!)}>
                    Restore
                  </button>
                ) : (
                  <button onClick={() => handleDelete(row.id!)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
