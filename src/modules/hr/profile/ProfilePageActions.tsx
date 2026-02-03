import React from "react";
import { ActionPanel } from "../../../components/panels/ActionPanel";
import { Button } from "../../../components/controls/Button";

interface ProfilePageActionsProps {
  onSearch: () => void;
  onReset?: () => void;
}

export const ProfilePageActions: React.FC<ProfilePageActionsProps> = ({
  onSearch,
  onReset,
}) => {
  return (
    <ActionPanel>
      <Button variant="primary" onClick={onSearch}>
        Search
      </Button>
      {onReset && <Button onClick={onReset}>Reset</Button>}
      <Button>Edit</Button>
      <Button variant="danger">Delete</Button>
      <Button>Export</Button>
    </ActionPanel>
  );
};
