export type ProjectCategory = "audio" | "web" | "creative";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  audio: "Audio Developer",
  web: "Web Developer",
  creative: "Creative Technologist",
};

export const CATEGORY_FILTERS: ProjectCategory[] = ["audio", "web", "creative"];

export const CATEGORY_INTRO_COPY: Record<
  ProjectCategory,
  { singular: string; plural: string }
> = {
  audio: {
    singular: "Max for Live device and audio tool built",
    plural: "Max for Live devices and audio tools built",
  },
  web: {
    singular: "site or platform shipped",
    plural: "sites and platforms shipped",
  },
  creative: {
    singular: "installation or live work with custom software",
    plural: "installations and live works with custom software",
  },
};

export const FILTER_PILL_STYLES: Record<
  ProjectCategory,
  { active: string; idle: string }
> = {
  audio: {
    idle: "border-(--role-audio)/45 bg-transparent text-(--role-audio) hover:border-(--role-audio) hover:bg-(--role-audio)/10",
    active:
      "border-(--role-audio) bg-(--role-audio) text-black/85 hover:border-(--role-audio) hover:bg-(--role-audio)",
  },
  web: {
    idle: "border-(--role-web)/45 bg-transparent text-(--role-web) hover:border-(--role-web) hover:bg-(--role-web)/10",
    active:
      "border-(--role-web) bg-(--role-web) text-black/85 hover:border-(--role-web) hover:bg-(--role-web)",
  },
  creative: {
    idle: "border-(--role-creative)/45 bg-transparent text-(--role-creative) hover:border-(--role-creative) hover:bg-(--role-creative)/10",
    active:
      "border-(--role-creative) bg-(--role-creative) text-black/85 hover:border-(--role-creative) hover:bg-(--role-creative)",
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
  audio: {
    labelClass: "text-(--role-audio)",
    borderClass: "border-(--role-audio)",
    activeItemClass: "border-l-(--role-audio) pl-3.5 text-(--role-audio)",
    hoverClass: "hover:text-(--role-audio)",
  },
  web: {
    labelClass: "text-(--role-web)",
    borderClass: "border-(--role-web)",
    activeItemClass: "border-l-(--role-web) pl-3.5 text-(--role-web)",
    hoverClass: "hover:text-(--role-web)",
  },
  creative: {
    labelClass: "text-(--role-creative)",
    borderClass: "border-(--role-creative)",
    activeItemClass: "border-l-(--role-creative) pl-3.5 text-(--role-creative)",
    hoverClass: "hover:text-(--role-creative)",
  },
};
