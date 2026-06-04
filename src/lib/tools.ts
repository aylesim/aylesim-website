import type { Project } from "@/lib/content";
import type { ProjectCategory } from "@/lib/roles";
import { aylesimDevicesSlug } from "@/lib/site";

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

export const TOOLS_PAGE_COPY = {
  lede: "Stuff you can run, buy, or open in a tab. The rest of this site is case studies and context. This is what you can actually use.",
  footer: "Installations, performances, and client work are under",
  footerLink: "Projects",
  sections: {
    devices: {
      title: "Aylesim Devices",
      intro:
        "Max for Live patches for Ableton Live: sequencers, modulation, sample tools. I build them for my own sets first; most ship through Gumroad and Isotonik, a couple are free.",
    },
    web: {
      title: "In the browser",
      intro: "No installer, no Live required. Open the link and try it.",
    },
    shortcuts: {
      title: "In a hurry?",
      intro:
        "Rather skim with an assistant than read every page, same idea as Too lazy to read.",
    },
  },
  labels: {
    portfolioLink: "Case study",
    unavailable: "Not distributed",
    buy: "Buy / download",
    open: "Open",
    readMore: "Read more",
  },
} as const;

export const SITE_UTILITIES: SiteUtility[] = [
  {
    title: "Too lazy to read",
    tagline:
      "The whole site as one JSON file. Paste the URL into a chat, or copy the dump from the page.",
    href: "/ask-ai",
    actionLabel: "How to use it",
  },
  {
    title: "content.json",
    tagline:
      "The raw file, same data, no walkthrough. Handy for scripts or plugins.",
    href: "/content.json",
    external: true,
    actionLabel: "Get the JSON",
  },
];

export function getToolAction(project: Project): ToolAction {
  const gumroad = project.listBadges.find((badge) =>
    badge.url?.includes("gumroad.com")
  );
  if (gumroad?.url) {
    return {
      href: gumroad.url,
      external: true,
      label: TOOLS_PAGE_COPY.labels.buy,
    };
  }

  const link = project.link?.trim();
  if (link) {
    return {
      href: link,
      external: !link.startsWith("/"),
      label: project.linkLabel ?? TOOLS_PAGE_COPY.labels.open,
    };
  }

  const store = project.listBadges.find((badge) => badge.url);
  if (store?.url) {
    return { href: store.url, external: true, label: store.label };
  }

  return {
    href: `/?project=${project.slug}`,
    external: false,
    label: TOOLS_PAGE_COPY.labels.readMore,
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

  const { sections } = TOOLS_PAGE_COPY;

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
                label: TOOLS_PAGE_COPY.labels.readMore,
              }
            : getToolAction(project),
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
        action: getToolAction(project),
      })),
    },
  ];
}
