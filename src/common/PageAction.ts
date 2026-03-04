import type { ButtonVariant } from "./ButtonVariants";

export type PageAction = {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  hidden?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
};
