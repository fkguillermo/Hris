import { useEffect, useState, useCallback } from "react";
import { OrganizationGrid } from "../../../setting/Organization/components/OrganizationGrid";
import {
  fetchData,
  saveData,
} from "../../../setting/Organization/organization.api";
import type { OrganizationData } from "../../../setting/Organization/organization.types";
import { useOrganization } from "./OrganizationContext";

interface Props {
  entity: string;
}

export const OrganizationTab = ({ entity }: Props) => {
  const { setHasChanges, registerHandlers } = useOrganization();
  const [rows, setRows] = useState<OrganizationData[]>([]);
  const [originalRows, setOriginalRows] = useState<OrganizationData[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchData(entity);
      setRows(data);
      setOriginalRows(data);
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to load data:", error);
      // Handle error (show notification, etc.)
    } finally {
      setLoading(false);
    }
  }, [entity, setHasChanges]);

  const hasRowChanged = useCallback(
    (row: OrganizationData) => {
      // New rows are always "changed" but should be handled by isNew flag
      if (row.isNew) {
        return false; // Don't mark new rows as "changed"
      }

      const original = originalRows.find((r) => r.id === row.id);
      if (!original) return false;

      const changed = JSON.stringify(original) !== JSON.stringify(row);
      console.log(`hasRowChanged for ${row.code}:`, changed);
      return changed;
    },
    [originalRows],
  );

  const handleRowsChange = useCallback(
    (newRows: OrganizationData[]) => {
      console.log("=== handleRowsChange CALLED ===");
      console.log("Received newRows:", newRows);
      newRows.forEach((row, index) => {
        console.log(`Row ${index}:`, {
          code: row.code,
          isNew: row.isNew,
          isUpdate: row.isUpdate,
          isDeleted: row.isDeleted,
          allKeys: Object.keys(row),
        });
      });

      setRows(newRows);
      const hasChanges =
        JSON.stringify(newRows) !== JSON.stringify(originalRows);
      setHasChanges(hasChanges);
    },
    [originalRows, setHasChanges],
  );

  const handleSave = useCallback(async () => {
    console.log("=== SAVE STARTED ===");
    console.log("Current rows:", JSON.stringify(rows, null, 2));

    setLoading(true);
    try {
      // Filter changed rows first
      const filteredRows = rows.filter((row) => {
        const isChanged = row.isNew || row.isDeleted || hasRowChanged(row);
        console.log(
          `Row ${row.code}: isNew=${row.isNew}, isDeleted=${row.isDeleted}, hasChanged=${hasRowChanged(row)}, willInclude=${isChanged}`,
        );
        return isChanged;
      });

      console.log("Filtered rows count:", filteredRows.length);

      // Prepare data with operation flags
      const changedRows = filteredRows.map((row) => {
        console.log("Processing row:", row);

        // Create a clean copy
        const data: OrganizationData = {
          code: row.code,
          description: row.description,
          isActive: row.isActive,
          isNew: Boolean(row.isNew),
          isUpdate: false,
          isDeleted: Boolean(row.isDeleted),
        };

        // Set the correct flags
        if (row.isNew) {
          console.log("  -> Marking as NEW");
          data.isNew = true;
          data.isUpdate = false;
        } else if (row.isDeleted) {
          console.log("  -> Marking as DELETED");
          data.id = row.id;
          data.isDeleted = true;
          data.isUpdate = false;
        } else if (hasRowChanged(row)) {
          console.log("  -> Marking as UPDATE");
          data.id = row.id;
          data.isUpdate = true;
          data.isNew = false;
        }

        console.log("Prepared row:", JSON.stringify(data, null, 2));
        return data;
      });

      console.log("=== FINAL DATA TO SEND ===");
      console.log(JSON.stringify(changedRows, null, 2));

      if (changedRows.length === 0) {
        console.log("No changes to save");
        setLoading(false);
        return;
      }

      console.log("Calling API for entity:", entity);
      const response = await saveData(entity, changedRows);
      console.log("API response:", response);

      console.log("Reloading data...");
      await load();
      console.log("=== SAVE COMPLETED ===");
    } catch (error: any) {
      console.error("=== SAVE FAILED ===");
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      alert(
        `Failed to save changes: ${error.response?.data?.message || error.message}`,
      );
    } finally {
      setLoading(false);
    }
  }, [rows, entity, hasRowChanged, load]);

  const handleCancel = useCallback(() => {
    setRows([...originalRows]);
    setHasChanges(false);
  }, [originalRows, setHasChanges]);

  // Register handlers with context
  useEffect(() => {
    registerHandlers({
      save: handleSave,
      cancel: handleCancel,
      refresh: load,
    });
  }, [handleSave, handleCancel, load, registerHandlers]);

  // Load data when entity changes
  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      {loading ? (
        <div className="loading">Loading…</div>
      ) : (
        <OrganizationGrid rows={rows} onChange={handleRowsChange} />
      )}
    </>
  );
};
