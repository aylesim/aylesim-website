export type ProjectCategory =
  | "devices"
  | "web-interactive"
  | "installations"
  | "community";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  devices: "Audio tools",
  "web-interactive": "Web",
  community: "Community",
  installations: "Artworks",
};

export const CATEGORY_FILTERS: ProjectCategory[] = [
  "devices",
  "web-interactive",
  "community",
  "installations",
];
