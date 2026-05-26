export type ProjectCategory = "audio" | "web" | "creative";

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
