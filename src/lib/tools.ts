import type { Project } from "@/lib/content";
import type { ProjectCategory } from "@/lib/roles";
import { aylesimDevicesCustomerCount, aylesimDevicesSlug } from "@/lib/site";

export interface ToolAction {
  href: string;
  external: boolean;
  label: string;
}

export interface ToolEntry {
  project: Project;
  action: ToolAction;
  unavailable?: boolean;
}

export interface ToolSection {
  id: string;
  title: string;
  intro: string;
  category: ProjectCategory;
  entries: ToolEntry[];
}

export interface SiteUtility {
  title: string;
  tagline: string;
  href: string;
  external?: boolean;
  actionLabel: string;
}

const WEB_TOOL_SLUGS = new Set(["glossia"]);

export const SITE_UTILITIES: SiteUtility[] = [
  {
    title: "Too lazy to read",
    tagline:
      "Feed the whole site to your AI as JSON and ask whatever you need.",
    href: "/ask-ai",
    actionLabel: "Open",
  },
  {
    title: "content.json",
    tagline:
      "Machine-readable export of this portfolio for scripts and assistants.",
    href: "/content.json",
    external: true,
    actionLabel: "Open JSON",
  },
];

export function getToolAction(project: Project): ToolAction {
  const gumroad = project.listBadges.find((badge) =>
    badge.url?.includes("gumroad.com")
  );
  if (gumroad?.url) {
    return { href: gumroad.url, external: true, label: "Get it" };
  }

  const link = project.link?.trim();
  if (link) {
    return {
      href: link,
      external: !link.startsWith("/"),
      label: project.linkLabel ?? "Open",
    };
  }

  const store = project.listBadges.find((badge) => badge.url);
  if (store?.url) {
    return { href: store.url, external: true, label: store.label };
  }

  return {
    href: `/?project=${project.slug}`,
    external: false,
    label: "Details",
  };
}

function isUnavailable(project: Project): boolean {
  return project.description.includes("Currently not available");
}

export function getToolsSections(projects: Project[]): ToolSection[] {
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
      title: "Aylesim Devices",
      intro: `Max for Live tools for Ableton Live — used by ${aylesimDevicesCustomerCount.toLocaleString("en-US")}+ people via Gumroad and Isotonik Studios.`,
      category: "devices",
      entries: devices.map((project) => ({
        project,
        action: getToolAction(project),
        unavailable: isUnavailable(project),
      })),
    },
    {
      id: "web",
      title: "Web & Interactive",
      intro:
        "Open playgrounds and browser tools you can try without installing anything.",
      category: "web-interactive",
      entries: web.map((project) => ({
        project,
        action: getToolAction(project),
      })),
    },
  ];
}
