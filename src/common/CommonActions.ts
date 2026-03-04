import type { PageAction } from "./PageAction";

export const CommonActions = {
  refresh: (onClick: () => void, disabled?: boolean): PageAction => ({
    label: "Refresh",
    variant: "primary",
    onClick,
    disabled,
  }),

  add: (onClick: () => void, disabled?: boolean): PageAction => ({
    label: "+ Add New",
    variant: "success",
    onClick,
    disabled,
  }),

  save: (onClick: () => void, disabled?: boolean): PageAction => ({
    label: "Save",
    variant: "success",
    onClick,
    disabled,
  }),

  delete: (onClick: () => void, disabled?: boolean): PageAction => ({
    label: "Delete",
    variant: "danger",
    onClick,
    disabled,
  }),

  cancel: (onClick: () => void, disabled?: boolean): PageAction => ({
    label: "Cancel",
    variant: "default",
    onClick,
    disabled,
  }),

  search: (onClick: () => void, disabled?: boolean): PageAction => ({
    label: "Search",
    variant: "primary",
    onClick,
    disabled,
  }),

  reset: (onClick: () => void, disabled?: boolean): PageAction => ({
    label: "Reset",
    variant: "secondary",
    onClick,
    disabled,
  }),

  edit: (onClick: () => void, disabled?: boolean): PageAction => ({
    label: "Edit",
    variant: "primary",
    onClick,
    disabled,
  }),

  export: (onClick: () => void, disabled?: boolean): PageAction => ({
    label: "Export",
    variant: "utility",
    onClick,
    disabled,
  }),
};
