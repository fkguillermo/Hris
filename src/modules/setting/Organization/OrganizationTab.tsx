import { useEffect, useState, useCallback } from "react";
import { OrganizationGrid } from "../Organization/OrganizationGrid";
import { fetchData, saveData } from "../../api/setting/organization.api";
import type { OrganizationData } from "../../types/organization/organization.types";
import { useOrganization } from "./OrganizationContext";

interface Props {
  entity: string;
  isReadOnly?: boolean;
}

export const OrganizationTab = ({ entity, isReadOnly }: Props) => {
  const { setHasChanges, registerHandlers } = useOrganization();
  const [rows, setRows] = useState<OrganizationData[]>([]);
  const [originalRows, setOriginalRows] = useState<OrganizationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const hasRowChanged = useCallback(
    (row: OrganizationData) => {
      if (row.isNew) return false;
      const original = originalRows.find((r) => r.id === row.id);
      return original
        ? JSON.stringify(original) !== JSON.stringify(row)
        : false;
    },
    [originalRows],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const data = await fetchData(entity);
      setRows(data);
      setOriginalRows(data);
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to load data:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [entity, setHasChanges]);

  const handleRowsChange = useCallback(
    (newRows: OrganizationData[]) => {
      setRows(newRows);
      setHasChanges(JSON.stringify(newRows) !== JSON.stringify(originalRows));
    },
    [originalRows, setHasChanges],
  );

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      const changedRows = rows
        .filter((row) => row.isNew || row.isDeleted || hasRowChanged(row))
        .map((row) => {
          const data: OrganizationData = {
            code: row.code,
            description: row.description,
            isActive: row.isActive,
            isNew: Boolean(row.isNew),
            isUpdate: false,
            isDeleted: Boolean(row.isDeleted),
          };

          if (row.isNew) {
            data.isNew = true;
          } else if (row.isDeleted) {
            data.id = row.id;
            data.isDeleted = true;
          } else if (hasRowChanged(row)) {
            data.id = row.id;
            data.isUpdate = true;
            data.isNew = false;
          }

          return data;
        });

      if (changedRows.length === 0) return;

      await saveData(entity, changedRows);
      await load();
    } catch (error: any) {
      console.error("Failed to save:", error);
      alert(
        `Failed to save changes: ${error.response?.data?.message ?? error.message}`,
      );
    } finally {
      setLoading(false);
    }
  }, [rows, entity, hasRowChanged, load]);

  const handleCancel = useCallback(() => {
    setRows([...originalRows]);
    setHasChanges(false);
  }, [originalRows, setHasChanges]);

  useEffect(() => {
    registerHandlers({ save: handleSave, cancel: handleCancel, refresh: load });
  }, [handleSave, handleCancel, load, registerHandlers]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <div className="loading">Loading…</div>;
  if (loadError) return <div className="no-data">No Data</div>;

  return (
    <OrganizationGrid
      rows={rows}
      onChange={handleRowsChange}
      isReadOnly={isReadOnly}
    />
  );
};
