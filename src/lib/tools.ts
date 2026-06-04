import type { Project, SiteConfig } from "@/lib/content";
import type { ProjectCategory } from "@/lib/roles";

export type ToolAction = {
  href: string;
  external: boolean;
  label: string;
};

export type ToolEntry = {
  project: Project;
  action: ToolAction;
  unavailable?: boolean;
};

export type ToolSection = {
  id: string;
  title: string;
  intro: string;
  category: ProjectCategory;
  entries: ToolEntry[];
};

const WEB_TOOL_SLUGS = new Set(["glossia"]);

export function getToolAction(
  project: Project,
  labels: SiteConfig["toolsPage"]["labels"]
): ToolAction {
  const gumroad = project.listBadges.find((badge) =>
    badge.url?.includes("gumroad.com")
  );
  if (gumroad?.url) {
    return {
      href: gumroad.url,
      external: true,
      label: labels.buy,
    };
  }

  const link = project.link?.trim();
  if (link) {
    return {
      href: link,
      external: !link.startsWith("/"),
      label: project.linkLabel ?? labels.open,
    };
  }

  const store = project.listBadges.find((badge) => badge.url);
  if (store?.url) {
    return { href: store.url, external: true, label: store.label };
  }

  return {
    href: `/?project=${project.slug}`,
    external: false,
    label: labels.readMore,
  };
}

function isUnavailable(project: Project): boolean {
  return project.description.includes("Currently not available");
}

export function getToolsSections(
  projects: Project[],
  site: SiteConfig
): ToolSection[] {
  const { toolsPage, aylesimDevicesSlug } = site;
  const { sections, labels } = toolsPage;

  const devices = projects
    .filter(
      (project) =>
        project.category === "devices" && project.slug !== aylesimDevicesSlug
    )
    .sort((a, b) => a.order - b.order);

  const web = projects
    .filter((project) => WEB_TOOL_SLUGS.has(project.slug))
    .sort((a, b) => a.order - b.order);

  return [
    {
      id: "devices",
      title: sections.devices.title,
      intro: sections.devices.intro,
      category: "devices",
      entries: devices.map((project) => {
        const unavailable = isUnavailable(project);
        return {
          project,
          action: unavailable
            ? {
                href: `/?project=${project.slug}`,
                external: false,
                label: labels.readMore,
              }
            : getToolAction(project, labels),
          unavailable,
        };
      }),
    },
    {
      id: "web",
      title: sections.web.title,
      intro: sections.web.intro,
      category: "web-interactive",
      entries: web.map((project) => ({
        project,
        action: getToolAction(project, labels),
      })),
    },
  ];
}
