import React from "react";
import { ActionPanel } from "../panels/ActionPanel";
import { Button } from "../controls/Button";
import type { ButtonVariant } from "../../common/ButtonVariants.ts";

export type PageAction = {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  hidden?: boolean;
};

interface PageActionsProps {
  actions: PageAction[];
}

export const PageActions: React.FC<PageActionsProps> = ({ actions }) => {
  return (
    <ActionPanel>
      {actions
        .filter((action) => !action.hidden)
        .map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.label}
          </Button>
        ))}
    </ActionPanel>
  );
};
