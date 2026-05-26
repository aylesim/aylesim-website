export type ProjectCategory =
  | "devices"
  | "web-interactive"
  | "installations"
  | "community";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  devices: "Devices",
  "web-interactive": "Web & Interactive",
  installations: "Installations & Artworks",
  community: "Community",
};

export const CATEGORY_FILTERS: ProjectCategory[] = [
  "devices",
  "web-interactive",
  "installations",
  "community",
];

export const CATEGORY_INTRO_COPY: Record<
  ProjectCategory,
  { singular: string; plural: string }
> = {
  devices: {
    singular: "Max for Live device or audio tool",
    plural: "Max for Live devices and audio tools",
  },
  "web-interactive": {
    singular: "web or interactive project",
    plural: "web and interactive projects",
  },
  installations: {
    singular: "installation or artwork",
    plural: "installations and artworks",
  },
  community: {
    singular: "community project",
    plural: "community projects",
  },
};

export const FILTER_PILL_STYLES: Record<
  ProjectCategory,
  { active: string; idle: string }
> = {
  devices: {
    idle: "border-(--role-audio)/45 bg-transparent text-(--role-audio) hover:border-(--role-audio) hover:bg-(--role-audio)/10",
    active:
      "border-(--role-audio) bg-(--role-audio) text-black/85 hover:border-(--role-audio) hover:bg-(--role-audio)",
  },
  "web-interactive": {
    idle: "border-(--role-web)/45 bg-transparent text-(--role-web) hover:border-(--role-web) hover:bg-(--role-web)/10",
    active:
      "border-(--role-web) bg-(--role-web) text-black/85 hover:border-(--role-web) hover:bg-(--role-web)",
  },
  installations: {
    idle: "border-(--role-creative)/45 bg-transparent text-(--role-creative) hover:border-(--role-creative) hover:bg-(--role-creative)/10",
    active:
      "border-(--role-creative) bg-(--role-creative) text-black/85 hover:border-(--role-creative) hover:bg-(--role-creative)",
  },
  community: {
    idle: "border-(--accent)/45 bg-transparent text-(--accent) hover:border-(--accent) hover:bg-(--accent)/10",
    active:
      "border-(--accent) bg-(--accent) text-black/85 hover:border-(--accent) hover:bg-(--accent)",
  },
};

export const ROLE_STYLES: Record<
  ProjectCategory,
  {
    labelClass: string;
    borderClass: string;
    activeItemClass: string;
    hoverClass: string;
  }
> = {
  devices: {
    labelClass: "text-(--role-audio)",
    borderClass: "border-(--role-audio)",
    activeItemClass: "border-l-(--role-audio) pl-3.5 text-(--role-audio)",
    hoverClass: "hover:text-(--role-audio)",
  },
  "web-interactive": {
    labelClass: "text-(--role-web)",
    borderClass: "border-(--role-web)",
    activeItemClass: "border-l-(--role-web) pl-3.5 text-(--role-web)",
    hoverClass: "hover:text-(--role-web)",
  },
  installations: {
    labelClass: "text-(--role-creative)",
    borderClass: "border-(--role-creative)",
    activeItemClass: "border-l-(--role-creative) pl-3.5 text-(--role-creative)",
    hoverClass: "hover:text-(--role-creative)",
  },
  community: {
    labelClass: "text-(--accent)",
    borderClass: "border-(--accent)",
    activeItemClass: "border-l-(--accent) pl-3.5 text-(--accent)",
    hoverClass: "hover:text-(--accent)",
  },
};
