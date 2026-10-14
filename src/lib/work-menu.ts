import type { Project } from "@/lib/content";
import {
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  type WorkFilter,
} from "@/lib/roles";

export type WorkMenuEntry =
  | { type: "heading"; label: string }
  | { type: "project"; slug: string; label: string };

type MenuProject = Pick<Project, "slug" | "title" | "category">;

function projectEntry(project: MenuProject): WorkMenuEntry {
  return { type: "project", slug: project.slug, label: project.title };
}

export function buildWorkMenu(
  projects: readonly MenuProject[],
  filter: WorkFilter
) {
  const entries: WorkMenuEntry[] = [];
  let projectCount = 0;

  for (const category of CATEGORY_FILTERS) {
    if (filter !== "all" && filter !== category) {
      continue;
    }
    const categoryProjects = projects.filter(
      (project) => project.category === category
    );
    if (categoryProjects.length === 0) {
      continue;
    }
    if (filter === "all") {
      entries.push({ type: "heading", label: CATEGORY_LABELS[category] });
    }
    entries.push(...categoryProjects.map(projectEntry));
    projectCount += categoryProjects.length;
  }

  return { entries, projectCount };
}
