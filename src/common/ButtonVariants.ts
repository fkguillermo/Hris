export const buttonVariants = [
  "primary",
  "success",
  "danger",
  "secondary",
  "default",
  "utility",
] as const;

// Type for TS safety
export type ButtonVariant = (typeof buttonVariants)[number];
