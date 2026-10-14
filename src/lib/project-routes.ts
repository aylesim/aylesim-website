import type { Project } from "@/lib/content";

export const PROJECT_SECTIONS = {
  "web-interactive": "work",
  devices: "instruments",
  installations: "art",
} as const;

export type ProjectSection = "work" | "instruments" | "art";

export function projectSection(
  project: Pick<Project, "category">
): ProjectSection | null {
  const category = project.category;
  return category && category !== "community"
    ? PROJECT_SECTIONS[category]
    : null;
}

export function projectHref(
  project: Pick<Project, "slug" | "category">
): string {
  const section = projectSection(project);
  return section ? `/${section}/${project.slug}` : "/about";
}

export function sortProjects<
  T extends Pick<Project, "featured" | "sortYear" | "title">,
>(projects: T[]): T[] {
  return [...projects].sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      b.sortYear - a.sortYear ||
      a.title.localeCompare(b.title)
  );
}
