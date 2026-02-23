import React from "react";
import { ActionPanel } from "../../../../components/panels/ActionPanel";
import { Button } from "../../../../components/controls/Button";

interface OrganizationActionsProps {
  onRefresh: () => void;
  onSave: () => void;
  onCancel?: () => void;
  hasChanges?: boolean;
}

export const OrganizationPageActions: React.FC<OrganizationActionsProps> = ({
  onRefresh,
  onSave,
  onCancel,
  hasChanges,
}) => {
  return (
    <ActionPanel>
      <Button variant="primary" onClick={onRefresh}>
        Refresh
      </Button>
      <Button
        variant="primary"
        onClick={onSave}
        disabled={!hasChanges} // Optional: disable Save when no changes
      >
        Save
      </Button>
      <Button
        variant="primary"
        onClick={onCancel}
        disabled={!hasChanges} // Optional: disable Cancel when no changes
      >
        Cancel
      </Button>
    </ActionPanel>
  );
};
