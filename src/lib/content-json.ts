import fs from "node:fs";
import path from "node:path";
import { getAboutSections, getAllContent, type Project } from "@/lib/content";
import { CATEGORY_LABELS } from "@/lib/roles";
import { contentJsonPath } from "@/lib/site";
import { getToolsSections } from "@/lib/tools";

export const contentJsonPublicPath = path.join(
  process.cwd(),
  "public/content.json"
);

function projectToJson(project: Project) {
  return {
    slug: project.slug,
    title: project.title,
    year: project.year,
    category: project.category,
    categoryLabel: project.category
      ? CATEGORY_LABELS[project.category]
      : undefined,
    tags: project.tags,
    description: project.description,
    descriptionAfterVideos: project.descriptionAfterVideos,
    highlights: project.highlights,
    link: project.link,
    linkLabel: project.linkLabel,
    primaryMeta: project.primaryMeta,
    secondaryMeta: project.secondaryMeta,
    workScope: project.workScope,
    featured: project.featured,
    listTagline: project.listTagline,
    listBadges: project.listBadges,
    videos: project.videos,
    images: project.images,
    showInMenu: project.showInMenu,
    menuLabel: project.menuLabel,
  };
}

function toContentPayload() {
  const { projects, about, home, site } = getAllContent();

  return {
    projects: projects.map(projectToJson),
    about: {
      lede: about.lede,
      subtitle: about.subtitle,
      portrait: about.portrait,
      body: about.body,
      sections: getAboutSections(about),
    },
    home,
    tools: {
      page: {
        lede: site.toolsPage.lede,
        footer: site.toolsPage.footer,
        footerLink: site.toolsPage.footerLink,
      },
      sections: getToolsSections(projects, site).map((section) => ({
        id: section.id,
        title: section.title,
        intro: section.intro,
        category: section.category,
        entries: section.entries.map((entry) => ({
          slug: entry.project.slug,
          title: entry.project.title,
          listTagline: entry.project.listTagline,
          unavailable: entry.unavailable,
          action: entry.action,
        })),
      })),
      utilities: site.siteUtilities,
    },
  };
}

export function getSiteContentPayload() {
  const { site } = getAllContent();
  return {
    content: toContentPayload(),
    site: {
      origin: site.origin,
      description: site.description,
      contactEmail: site.contactEmail,
      contactLinks: site.contactLinks,
      contactAvailability: site.contactAvailability,
      webDeveloperStack: site.webDeveloperStack,
      resumeHref: site.resumeHref,
      resumeLabel: site.resumeLabel,
      awards: site.awards,
      pressMentions: site.pressMentions,
      maxBerlinNetworkUrl: site.maxBerlinNetworkUrl,
      maxBerlinCommunitySlug: site.maxBerlinCommunitySlug,
      maxBerlinCommunityProof: site.maxBerlinCommunityProof,
      aylesimDevicesSlug: site.aylesimDevicesSlug,
      aylesimDevicesCustomerCount: site.aylesimDevicesCustomerCount,
      audioDeveloperProductLine: site.audioDeveloperProductLine,
      contentJsonUrl: `${site.origin}${contentJsonPath}`,
    },
  };
}

export function serializeSiteContentJson() {
  return JSON.stringify(getSiteContentPayload(), null, 2);
}

export function writeSiteContentJsonFile() {
  fs.writeFileSync(
    contentJsonPublicPath,
    `${serializeSiteContentJson()}\n`,
    "utf-8"
  );
}

export function readSiteContentJsonFile(): string | null {
  if (!fs.existsSync(contentJsonPublicPath)) {
    return null;
  }
  return fs.readFileSync(contentJsonPublicPath, "utf-8");
}

export function siteContentJsonFileIsCurrent(): boolean {
  const onDisk = readSiteContentJsonFile();
  if (onDisk === null) {
    return false;
  }
  return onDisk === `${serializeSiteContentJson()}\n`;
}
