export const NODE_COLORS = {
  C: "#2563eb", // Company
  B: "#7c3aed", // Branch
  V: "#0891b2", // Division
  D: "#059669", // Department
  S: "#d97706", // Section
} as const;

export type NodeTypeColor = keyof typeof NODE_COLORS;
