import type { Project } from "@/lib/content";
import { projectHref } from "@/lib/project-routes";
import { CATEGORY_LABELS } from "@/lib/roles";

export type WorkMenuEntry =
  | { type: "heading"; label: string }
  | { type: "project"; slug: string; label: string; href: string };

type MenuProject = Pick<Project, "slug" | "title" | "category">;

function projectEntry(project: MenuProject): WorkMenuEntry {
  return {
    type: "project",
    slug: project.slug,
    label: project.title,
    href: projectHref(project),
  };
}

export function buildWorkMenu(projects: readonly MenuProject[]) {
  const entries: WorkMenuEntry[] = [];
  let projectCount = 0;

  for (const category of [
    "devices",
    "web-interactive",
    "community",
    "installations",
  ] as const) {
    const categoryProjects = projects.filter(
      (project) => project.category === category
    );
    if (categoryProjects.length === 0) {
      continue;
    }
    entries.push({ type: "heading", label: CATEGORY_LABELS[category] });
    entries.push(...categoryProjects.map(projectEntry));
    projectCount += categoryProjects.length;
  }

  return { entries, projectCount };
}
