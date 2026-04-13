import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ProjectVideo {
  title: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  year?: string;
  primaryMeta: string[];
  secondaryMeta?: string;
  tags: string[];
  link?: string | null;
  linkLabel?: string;
  description: string;
  descriptionAfterVideos?: string;
  galleryAfterVideo?: string[];
  highlights: string[];
  videos?: ProjectVideo[];
  sortYear: number;
  order: number;
  menuLabel?: string;
  showInMenu: boolean;
}

export interface AboutData {
  bio: string[];
  award: string;
  exhibitions: string[];
  publication: string;
}

export interface SiteContent {
  projects: Project[];
  about: AboutData;
}

function readMd(filePath: string) {
  return matter(fs.readFileSync(filePath, "utf-8"));
}

function mdFiles(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();
}

function sortYear(y?: string): number {
  if (!y) {
    return 0;
  }
  const n = Number.parseInt(y, 10);
  return Number.isFinite(n) ? n : 0;
}

function menuOrderFromData(data: Record<string, unknown>): number {
  const v = data.order;
  if (typeof v === "number" && Number.isFinite(v)) {
    return v;
  }
  if (typeof v === "string") {
    const n = Number.parseInt(v, 10);
    if (Number.isFinite(n)) {
      return n;
    }
  }
  return Number.POSITIVE_INFINITY;
}

function asString(v: unknown): string | undefined {
  if (typeof v === "string") {
    return v;
  }
  return undefined;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) {
    return [];
  }
  return v.filter((item): item is string => typeof item === "string");
}

function showInMenuFromData(data: Record<string, unknown>): boolean {
  return data.showInMenu !== false;
}

function asVideoList(v: unknown): ProjectVideo[] {
  if (!Array.isArray(v)) {
    return [];
  }
  const out: ProjectVideo[] = [];
  for (const item of v) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const rec = item as Record<string, unknown>;
    const url = asString(rec.url);
    if (!url) {
      continue;
    }
    out.push({ title: asString(rec.title) ?? "Video", url });
  }
  return out;
}

function asOptionalUrlList(v: unknown): string[] | undefined {
  const arr = asStringArray(v);
  return arr.length > 0 ? arr : undefined;
}

function splitDescriptionForEarlyVideo(
  body: string,
  videos: ProjectVideo[],
  videosAfterHeading: string | undefined
): { description: string; descriptionAfterVideos?: string } {
  if (videos.length === 0 || !videosAfterHeading?.trim()) {
    return { description: body };
  }
  const title = videosAfterHeading.trim();
  const needle = `\n## ${title}\n`;
  const idx = body.indexOf(needle);
  if (idx === -1) {
    return { description: body };
  }
  return {
    description: body.slice(0, idx),
    descriptionAfterVideos: body.slice(idx + 1),
  };
}

function mapWorkProject(
  slug: string,
  body: string,
  year: string | undefined,
  order: number,
  data: Record<string, unknown>
): Project {
  const videos = asVideoList(data.videos);
  const split = splitDescriptionForEarlyVideo(
    body,
    videos,
    asString(data.videosAfterHeading)
  );
  return {
    slug,
    title: asString(data.title) ?? slug,
    year,
    primaryMeta: [asString(data.client), year].filter(
      (value): value is string => Boolean(value)
    ),
    secondaryMeta: asString(data.role),
    tags: asStringArray(data.tech),
    link: asString(data.liveLink) ?? null,
    linkLabel: "Visit live",
    description: split.description,
    descriptionAfterVideos: split.descriptionAfterVideos,
    galleryAfterVideo: asOptionalUrlList(data.galleryAfterVideo),
    highlights: asStringArray(data.highlights),
    videos: videos.length > 0 ? videos : undefined,
    sortYear: sortYear(year),
    order,
    menuLabel: asString(data.menuLabel),
    showInMenu: showInMenuFromData(data),
  };
}

function mapDeviceProject(
  slug: string,
  body: string,
  year: string | undefined,
  order: number,
  data: Record<string, unknown>
): Project {
  const price = asString(data.price);
  const client = asString(data.client);
  const category = asString(data.category);
  const techTags = asStringArray(data.tech);
  const videos = asVideoList(data.videos);
  let tags: string[];
  if (techTags.length > 0) {
    tags = techTags;
  } else if (category) {
    tags = [category];
  } else {
    tags = [];
  }
  const buyLink = asString(data.buyLink);
  let linkLabel = "Buy";
  if (buyLink?.includes("github.com")) {
    linkLabel = "Repository / download";
  } else if (price === "Free") {
    linkLabel = "Download";
  }
  const split = splitDescriptionForEarlyVideo(
    body,
    videos,
    asString(data.videosAfterHeading)
  );
  return {
    slug,
    title: asString(data.title) ?? slug,
    year,
    primaryMeta: [
      client || price,
      year,
      data.featured === true ? "Featured" : undefined,
    ].filter((value): value is string => Boolean(value)),
    secondaryMeta: asString(data.role),
    tags,
    link: buyLink,
    linkLabel,
    description: split.description,
    descriptionAfterVideos: split.descriptionAfterVideos,
    galleryAfterVideo: asOptionalUrlList(data.galleryAfterVideo),
    highlights: asStringArray(data.highlights),
    videos: videos.length > 0 ? videos : undefined,
    sortYear: sortYear(year),
    order,
    menuLabel: asString(data.menuLabel),
    showInMenu: showInMenuFromData(data),
  };
}

function getProjects(): Project[] {
  const dir = path.join(contentDir, "projects");
  const projects: Project[] = [];

  for (const file of mdFiles(dir)) {
    const filePath = path.join(dir, file);
    const { data, content } = readMd(filePath);
    const slug = file.replace(".md", "");
    const body = content.trim();
    const year = typeof data.year === "string" ? data.year : undefined;
    const order = menuOrderFromData(data);

    if (data.type === "work") {
      projects.push(mapWorkProject(slug, body, year, order, data));
    } else if (data.type === "device") {
      projects.push(mapDeviceProject(slug, body, year, order, data));
    } else {
      throw new Error(
        `content/projects/${file}: frontmatter "type" must be "work" or "device"`
      );
    }
  }

  return projects.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    if (b.sortYear !== a.sortYear) {
      return b.sortYear - a.sortYear;
    }
    return a.title.localeCompare(b.title);
  });
}

function getAbout(): AboutData {
  const { data, content } = readMd(path.join(contentDir, "about.md"));
  return {
    bio: content
      .trim()
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean),
    award: data.award,
    exhibitions: data.exhibitions ?? [],
    publication: data.publication,
  };
}

export function getAllContent(): SiteContent {
  const projects = getProjects();
  const about = getAbout();
  return { projects, about };
}
