export type ProjectCategory =
  | "devices"
  | "web-interactive"
  | "installations"
  | "community";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  devices: "Devices",
  "web-interactive": "Web",
  installations: "Installations",
  community: "Community",
};

export const CATEGORY_FILTERS: ProjectCategory[] = [
  "devices",
  "web-interactive",
  "installations",
  "community",
];
