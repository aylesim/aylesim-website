export type ProjectCategory =
  | "devices"
  | "web-interactive"
  | "installations"
  | "community";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  devices: "Instruments",
  "web-interactive": "Work",
  community: "Community",
  installations: "Art",
};

export type WorkFilter = "all" | ProjectCategory;

export const CATEGORY_FILTERS: WorkFilter[] = [
  "all",
  "web-interactive",
  "devices",
  "installations",
];
