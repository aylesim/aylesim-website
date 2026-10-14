import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CATEGORY_FILTERS, type ProjectCategory } from "./roles";

const contentDir = path.join(process.cwd(), "content");

const aboutSectionSplit = /\n(?=## )/;
const aboutHeadingPrefix = /^##\s+/;

const PROJECT_CATEGORIES = new Set<string>([
  ...CATEGORY_FILTERS.filter((category) => category !== "all"),
  "community",
]);

export type ProjectVideo = {
  title: string;
  url: string;
};

export type ProjectWorkScope =
  | "commercial"
  | "research"
  | "performance"
  | "installation";

export type ProjectListBadge = {
  prefix?: string;
  label: string;
  url?: string;
};

const PROJECT_WORK_SCOPES = new Set<string>([
  "commercial",
  "research",
  "performance",
  "installation",
]);

export type Project = {
  slug: string;
  title: string;
  summary?: string;
  status?: string;
  credits?: string;
  client?: string;
  imageAlt?: string;

  year?: string;
  primaryMeta: string[];
  secondaryMeta?: string;
  tags: string[];
  link?: string | null;
  linkLabel?: string;
  description: string;
  descriptionAfterVideos?: string;
  galleryAfterVideo?: string[];
  images: string[];
  canvasCover: string | null;
  highlights: string[];
  videos?: ProjectVideo[];
  sortYear: number;
  order: number;
  stackOrder: number;
  menuLabel?: string;
  featured?: boolean;
  listTagline?: string;
  isotonik?: boolean;
  listBadges: ProjectListBadge[];
  workScope?: ProjectWorkScope;
  showInMenu: boolean;
  category?: ProjectCategory;
};

export type About = {
  lede: string;
  subtitle?: string;
  portrait?: string;
  body: string;
};

export type AboutSection = {
  label: string;
  content: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

export type Award = {
  headline: string;
  title: string;
  subtitle: string;
  issuer: string;
  year: string;
  projectSlug: string;
  externalHref: string;
  externalLabel: string;
};

export type PressMention = {
  outlet: string;
  title: string;
  year?: string;
  projectSlug?: string;
  href: string;
};

export type SiteConfig = {
  origin: string;
  description: string;
  contactEmail: string;
  contactAvailability: string;
  webDeveloperStack: string;
  resumeHref: string;
  resumeLabel: string;
  aylesimDevicesSlug: string;
  aylesimDevicesCustomerCount: number;
  audioDeveloperProductLine: string;
  maxBerlinNetworkUrl: string;
  maxBerlinCommunitySlug: string;
  maxBerlinCommunityProof: string;
  nationalArtsAwardProjectSlug: string;
  contactLinks: ContactLink[];
  awards: Award[];
  pressMentions: PressMention[];
};

export type HomeContent = {
  name: string;
  brand: string;
  role: string;
  location: string;
};

export type SiteContent = {
  projects: Project[];
  about: About;
  home: HomeContent;
  site: SiteConfig;
};

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

function asOrder(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const order = Number.parseInt(value, 10);
    if (Number.isFinite(order)) {
      return order;
    }
  }
  return fallback;
}

function asString(v: unknown): string | undefined {
  if (typeof v === "string") {
    return v;
  }
  return;
}

function asYear(v: unknown): string | undefined {
  if (typeof v === "number" && Number.isFinite(v)) {
    return String(v);
  }
  return asString(v);
}

function asWorkScope(v: unknown): ProjectWorkScope | undefined {
  if (typeof v === "string" && PROJECT_WORK_SCOPES.has(v)) {
    return v as ProjectWorkScope;
  }
  return;
}

function asProjectCategory(v: unknown): ProjectCategory | undefined {
  if (typeof v === "string" && PROJECT_CATEGORIES.has(v)) {
    return v as ProjectCategory;
  }
  return;
}

function asListBadges(v: unknown): ProjectListBadge[] {
  if (!Array.isArray(v)) {
    return [];
  }
  const badges: ProjectListBadge[] = [];
  for (const item of v) {
    if (typeof item !== "object" || item === null) {
      continue;
    }
    const record = item as Record<string, unknown>;
    const label = asString(record.label);
    if (!label) {
      continue;
    }
    badges.push({
      prefix: asString(record.prefix),
      label,
      url: asString(record.url),
    });
  }
  return badges;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) {
    return [];
  }
  return v.filter((item): item is string => typeof item === "string");
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

function deviceLinkLabel(
  buyLink: string | undefined,
  price: string | undefined
) {
  if (buyLink?.includes("github.com")) {
    return "View code";
  }
  return price === "Free" ? "Download free" : "Buy on Gumroad";
}

function extractMarkdownImages(body: string): string[] {
  return [...body.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map((m) => m[1]);
}

const CANVAS_SINGLE_GALLERY_SLUG = "there-will-be-no-more-determination";

function collectImages(
  body: string,
  gallery: string[] | undefined,
  slug: string
): string[] {
  let gal = gallery ?? [];
  if (slug === CANVAS_SINGLE_GALLERY_SLUG && gal.length > 1) {
    gal = gal.slice(0, 1);
  }
  const merged = [...new Set([...extractMarkdownImages(body), ...gal])];
  if (slug === CANVAS_SINGLE_GALLERY_SLUG && merged.length > 1) {
    return merged.slice(0, 1);
  }
  return merged;
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

type ProjectMapSource = {
  slug: string;
  body: string;
  year: string | undefined;
  order: number;
  data: Record<string, unknown>;
};

function mapProject(source: ProjectMapSource): Project {
  const { slug, body, year, order, data } = source;
  const videos = asVideoList(data.videos);
  const gallery = asOptionalUrlList(data.galleryAfterVideo);
  const split = splitDescriptionForEarlyVideo(
    body,
    videos,
    asString(data.videosAfterHeading)
  );
  const isDevice = data.type === "device";
  const price = asString(data.price);
  const client = asString(data.client);
  const buyLink = asString(data.buyLink);
  const liveLink = asString(data.liveLink);
  const link = isDevice ? buyLink : (liveLink ?? null);
  const linkLabel = isDevice ? deviceLinkLabel(buyLink, price) : "Open site";

  return {
    slug,
    title: asString(data.title) ?? slug,
    summary: asString(data.summary),
    status: asString(data.status),
    credits: asString(data.credits),
    client: asString(data.client),
    imageAlt: asString(data.imageAlt),
    year,
    primaryMeta: [
      isDevice ? client || price : client,
      year,
      isDevice && data.featured === true ? "Featured" : undefined,
    ].filter((value): value is string => Boolean(value)),
    secondaryMeta: asString(data.role),
    tags: asStringArray(data.tech),
    link,
    linkLabel,
    description: split.description,
    descriptionAfterVideos: split.descriptionAfterVideos,
    galleryAfterVideo: gallery,
    images: collectImages(body, gallery, slug),
    canvasCover: asString(data.canvasImage) ?? null,
    highlights: asStringArray(data.highlights),
    videos: videos.length > 0 ? videos : undefined,
    sortYear: sortYear(year),
    order,
    stackOrder: asOrder(data.stackOrder, order),
    menuLabel: asString(data.menuLabel),
    featured: data.featured === true,
    listTagline: asString(data.listTagline),
    isotonik: data.isotonik === true,
    listBadges: asListBadges(data.listBadges),
    workScope: asWorkScope(data.workScope),
    showInMenu: data.showInMenu !== false,
    category: asProjectCategory(data.category),
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
    const year = asYear(data.year);
    const order = asOrder(data.order, Number.POSITIVE_INFINITY);

    const source: ProjectMapSource = { slug, body, year, order, data };
    if (data.type !== "work" && data.type !== "device") {
      throw new Error(
        `content/projects/${file}: frontmatter "type" must be "work" or "device"`
      );
    }
    projects.push(mapProject(source));
  }

  const sorted = projects.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    if (b.sortYear !== a.sortYear) {
      return b.sortYear - a.sortYear;
    }
    return a.title.localeCompare(b.title);
  });
  assertVisibleProjectsHaveCovers(sorted);
  return sorted;
}

function projectHasCover(project: Project): boolean {
  return Boolean(
    project.images.length > 0 ||
      (project.galleryAfterVideo?.length ?? 0) > 0 ||
      project.canvasCover ||
      (project.videos?.length ?? 0) > 0
  );
}

function assertVisibleProjectsHaveCovers(projects: Project[]) {
  const missing = projects
    .filter(
      (project) =>
        project.showInMenu &&
        !projectHasCover(project) &&
        !project.description.includes("[needs: project image]")
    )
    .map((project) => project.slug);
  if (missing.length > 0) {
    throw new Error(
      `Visible projects need an image, canvasImage, or video: ${missing.join(", ")}`
    );
  }
}

function parseAboutSections(body: string): AboutSection[] {
  const chunks = body.split(aboutSectionSplit).filter((chunk) => chunk.trim());
  return chunks.map((chunk) => {
    const newline = chunk.indexOf("\n");
    if (newline === -1) {
      return {
        label: chunk.replace(aboutHeadingPrefix, "").trim(),
        content: "",
      };
    }
    return {
      label: chunk.slice(0, newline).replace(aboutHeadingPrefix, "").trim(),
      content: chunk.slice(newline + 1).trim(),
    };
  });
}

function getAbout(): About {
  const filePath = path.join(contentDir, "about.md");
  const { data, content } = readMd(filePath);
  return {
    lede: asString(data.lede) ?? "",
    subtitle: asString(data.subtitle),
    portrait: asString(data.portrait),
    body: content.trim(),
  };
}

export function getAboutSections(about: About): AboutSection[] {
  return parseAboutSections(about.body);
}

function asRecord(v: unknown): Record<string, unknown> | undefined {
  if (typeof v === "object" && v !== null && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return;
}

function asNumber(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) {
    return v;
  }
  if (typeof v === "string") {
    const n = Number.parseFloat(v);
    if (Number.isFinite(n)) {
      return n;
    }
  }
  return;
}

function requireString(v: unknown, field: string): string {
  const s = asString(v);
  if (!s) {
    throw new Error(`Missing or invalid string for ${field}`);
  }
  return s;
}

function parseContactLinks(v: unknown): ContactLink[] {
  if (!Array.isArray(v)) {
    return [];
  }
  return v.flatMap((item) => {
    const record = asRecord(item);
    if (!record) {
      return [];
    }
    const label = asString(record.label);
    const href = asString(record.href);
    if (!(label && href)) {
      return [];
    }
    return [{ label, href }];
  });
}

function parseAward(record: Record<string, unknown>, fieldPath: string): Award {
  return {
    headline: requireString(record.headline, `${fieldPath}.headline`),
    title: requireString(record.title, `${fieldPath}.title`),
    subtitle: requireString(record.subtitle, `${fieldPath}.subtitle`),
    issuer: requireString(record.issuer, `${fieldPath}.issuer`),
    year: requireString(record.year, `${fieldPath}.year`),
    projectSlug: requireString(record.projectSlug, `${fieldPath}.projectSlug`),
    externalHref: requireString(
      record.externalHref,
      `${fieldPath}.externalHref`
    ),
    externalLabel: requireString(
      record.externalLabel,
      `${fieldPath}.externalLabel`
    ),
  };
}

function parseAwards(v: unknown): Award[] {
  if (!Array.isArray(v) || v.length === 0) {
    throw new Error("content/site.md: awards must be a non-empty array");
  }
  return v.map((item, index) => {
    const record = asRecord(item);
    if (!record) {
      throw new Error(`content/site.md: awards[${index}] invalid`);
    }
    return parseAward(record, `awards[${index}]`);
  });
}

function parsePressMentions(v: unknown): PressMention[] {
  if (!Array.isArray(v)) {
    return [];
  }
  return v.flatMap((item) => {
    const record = asRecord(item);
    if (!record) {
      return [];
    }
    const outlet = asString(record.outlet);
    const title = asString(record.title);
    const href = asString(record.href);
    if (!(outlet && title && href)) {
      return [];
    }
    return [
      {
        outlet,
        title,
        href,
        year: asString(record.year),
        projectSlug: asString(record.projectSlug),
      },
    ];
  });
}

function getSiteConfig(): SiteConfig {
  const filePath = path.join(contentDir, "site.md");
  const { data } = readMd(filePath);
  const customerCount = asNumber(data.aylesimDevicesCustomerCount) ?? 0;
  return {
    origin: requireString(data.origin, "origin"),
    description: requireString(data.description, "description"),
    contactEmail: requireString(data.contactEmail, "contactEmail"),
    contactAvailability: requireString(
      data.contactAvailability,
      "contactAvailability"
    ),
    webDeveloperStack: requireString(
      data.webDeveloperStack,
      "webDeveloperStack"
    ),
    resumeHref: requireString(data.resumeHref, "resumeHref"),
    resumeLabel: requireString(data.resumeLabel, "resumeLabel"),
    aylesimDevicesSlug: requireString(
      data.aylesimDevicesSlug,
      "aylesimDevicesSlug"
    ),
    aylesimDevicesCustomerCount: customerCount,
    audioDeveloperProductLine: requireString(
      data.audioDeveloperProductLine,
      "audioDeveloperProductLine"
    ),
    maxBerlinNetworkUrl: requireString(
      data.maxBerlinNetworkUrl,
      "maxBerlinNetworkUrl"
    ),
    maxBerlinCommunitySlug: requireString(
      data.maxBerlinCommunitySlug,
      "maxBerlinCommunitySlug"
    ),
    maxBerlinCommunityProof: requireString(
      data.maxBerlinCommunityProof,
      "maxBerlinCommunityProof"
    ),
    nationalArtsAwardProjectSlug: requireString(
      data.nationalArtsAwardProjectSlug,
      "nationalArtsAwardProjectSlug"
    ),
    contactLinks: parseContactLinks(data.contactLinks),
    awards: parseAwards(data.awards),
    pressMentions: parsePressMentions(data.pressMentions),
  };
}

function getHome(): HomeContent {
  const filePath = path.join(contentDir, "home.md");
  const { data } = readMd(filePath);
  return {
    name: requireString(data.name, "name"),
    brand: requireString(data.brand, "brand"),
    role: requireString(data.role, "role"),
    location: requireString(data.location, "location"),
  };
}

export function getAllContent(): SiteContent {
  return {
    projects: getProjects(),
    about: getAbout(),
    home: getHome(),
    site: getSiteConfig(),
  };
}
