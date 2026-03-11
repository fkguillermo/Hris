export const filterVariants = [
  "dropdown",
  "multiselect",
  "textbox",
  "checkbox",
  "radio",
  "date",
] as const;

// Type for TS safety
export type FilterVariant = (typeof filterVariants)[number];
