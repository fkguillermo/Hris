import React from "react";
import { ActionPanel } from "../../../../components/panels/ActionPanel";
import { Button } from "../../../../components/controls/Button";

interface OrganizationActionsProps {
  onRefresh: () => void;
  onSave: () => void;
  onCancel?: () => void;
  hasChanges?: boolean;
  isReadOnly?: boolean;
}

export const OrganizationPageActions: React.FC<OrganizationActionsProps> = ({
  onRefresh,
  onSave,
  onCancel,
  hasChanges,
  isReadOnly,
}) => {
  const hasPermission = !isReadOnly;
  const isActionDisabled = !hasChanges || !hasPermission;

  return (
    <ActionPanel>
      <Button variant="primary" onClick={onRefresh}>
        Refresh
      </Button>
      <Button variant="primary" onClick={onSave} disabled={isActionDisabled}>
        Save
      </Button>
      <Button variant="primary" onClick={onCancel} disabled={isActionDisabled}>
        Cancel
      </Button>
    </ActionPanel>
  );
};
