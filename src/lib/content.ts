import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ProjectCategory } from "@/lib/roles";

const contentDir = path.join(process.cwd(), "content");

const aboutSectionSplit = /\n(?=## )/;
const aboutHeadingPrefix = /^##\s+/;

const PROJECT_CATEGORIES = new Set<string>([
  "devices",
  "web-interactive",
  "installations",
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

export type PrimaryAward = {
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

export type ToolsPageCopy = {
  lede: string;
  footer: string;
  footerLink: string;
  sections: {
    devices: { title: string; intro: string };
    web: { title: string; intro: string };
    shortcuts: { title: string; intro: string };
  };
  labels: {
    portfolioLink: string;
    unavailable: string;
    buy: string;
    open: string;
    readMore: string;
  };
};

export type SiteUtility = {
  title: string;
  tagline: string;
  href: string;
  external?: boolean;
  actionLabel: string;
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
  primaryAward: PrimaryAward;
  pressMentions: PressMention[];
  toolsPage: ToolsPageCopy;
  siteUtilities: SiteUtility[];
};

export type FeaturedBadgeVariant = "award" | "collaboration" | "publisher";

export type HowIWorkTheme = "accent" | "web" | "audio";

export type HomeHero = {
  namePrefix: string;
  brand: string;
  location: string;
  headline: {
    lead: string;
    accent: string;
    bridge: string;
    emphasis: string;
    junction: string;
    highlight: string;
    close: string;
  };
  profile: {
    label: string;
    paragraphs: string[];
  };
};

export type HomeFeaturedWork = {
  slug: string;
  badgeLabel: string;
  badgeVariant: FeaturedBadgeVariant;
  title: string;
  tags: string[];
  description: string;
  cover: string;
  rotation: number;
};

export type HomeHowIWorkCard = {
  eyebrow: string;
  theme: HowIWorkTheme;
  title: string;
  tags: string[];
  description: string;
  rotation: number;
};

export type HomePracticeColumn = {
  id: ProjectCategory;
  eyebrow: string;
  description: string;
  useWebStack?: boolean;
};

export type HomeContent = {
  hero: HomeHero;
  sections: {
    selectedWorks: string;
    howIWork: string;
    recognition: { title: string; intro: string };
    contact: string;
  };
  featuredWorks: HomeFeaturedWork[];
  howIWork: HomeHowIWorkCard[];
  practiceColumns: HomePracticeColumn[];
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

function stackOrderFromData(
  data: Record<string, unknown>,
  orderFallback: number
): number {
  const v = data.stackOrder;
  if (typeof v === "number" && Number.isFinite(v)) {
    return v;
  }
  if (typeof v === "string") {
    const n = Number.parseInt(v, 10);
    if (Number.isFinite(n)) {
      return n;
    }
  }
  return orderFallback;
}

function asString(v: unknown): string | undefined {
  if (typeof v === "string") {
    return v;
  }
  return;
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

function mapWorkProject(source: ProjectMapSource): Project {
  const { slug, body, year, order, data } = source;
  const videos = asVideoList(data.videos);
  const gallery = asOptionalUrlList(data.galleryAfterVideo);
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
    galleryAfterVideo: gallery,
    images: collectImages(body, gallery, slug),
    canvasCover: asString(data.canvasImage) ?? null,
    highlights: asStringArray(data.highlights),
    videos: videos.length > 0 ? videos : undefined,
    sortYear: sortYear(year),
    order,
    stackOrder: stackOrderFromData(data, order),
    menuLabel: asString(data.menuLabel),
    featured: data.featured === true,
    listTagline: asString(data.listTagline),
    isotonik: data.isotonik === true,
    listBadges: asListBadges(data.listBadges),
    workScope: asWorkScope(data.workScope),
    showInMenu: showInMenuFromData(data),
    category: asProjectCategory(data.category),
  };
}

function mapDeviceProject(source: ProjectMapSource): Project {
  const { slug, body, year, order, data } = source;
  const price = asString(data.price);
  const client = asString(data.client);
  const categoryField = asProjectCategory(data.category);
  const techTags = asStringArray(data.tech);
  const videos = asVideoList(data.videos);
  let tags: string[];
  if (techTags.length > 0) {
    tags = techTags;
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
  const gallery = asOptionalUrlList(data.galleryAfterVideo);
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
    galleryAfterVideo: gallery,
    images: collectImages(body, gallery, slug),
    canvasCover: asString(data.canvasImage) ?? null,
    highlights: asStringArray(data.highlights),
    videos: videos.length > 0 ? videos : undefined,
    sortYear: sortYear(year),
    order,
    stackOrder: stackOrderFromData(data, order),
    menuLabel: asString(data.menuLabel),
    featured: data.featured === true,
    listTagline: asString(data.listTagline),
    isotonik: data.isotonik === true,
    listBadges: asListBadges(data.listBadges),
    workScope: asWorkScope(data.workScope),
    showInMenu: showInMenuFromData(data),
    category: categoryField,
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

    const source: ProjectMapSource = { slug, body, year, order, data };
    if (data.type === "work") {
      projects.push(mapWorkProject(source));
    } else if (data.type === "device") {
      projects.push(mapDeviceProject(source));
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

function parsePrimaryAward(v: unknown): PrimaryAward {
  const record = asRecord(v);
  if (!record) {
    throw new Error("content/site.md: primaryAward is required");
  }
  return {
    headline: requireString(record.headline, "primaryAward.headline"),
    title: requireString(record.title, "primaryAward.title"),
    subtitle: requireString(record.subtitle, "primaryAward.subtitle"),
    issuer: requireString(record.issuer, "primaryAward.issuer"),
    year: requireString(record.year, "primaryAward.year"),
    projectSlug: requireString(record.projectSlug, "primaryAward.projectSlug"),
    externalHref: requireString(
      record.externalHref,
      "primaryAward.externalHref"
    ),
    externalLabel: requireString(
      record.externalLabel,
      "primaryAward.externalLabel"
    ),
  };
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

function parseToolsPageCopy(v: unknown): ToolsPageCopy {
  const record = asRecord(v);
  if (!record) {
    throw new Error("content/site.md: toolsPage is required");
  }
  const sections = asRecord(record.sections);
  const labels = asRecord(record.labels);
  if (!(sections && labels)) {
    throw new Error("content/site.md: toolsPage.sections and labels required");
  }
  const devices = asRecord(sections.devices);
  const web = asRecord(sections.web);
  const shortcuts = asRecord(sections.shortcuts);
  if (!(devices && web && shortcuts)) {
    throw new Error("content/site.md: toolsPage.sections incomplete");
  }
  return {
    lede: requireString(record.lede, "toolsPage.lede"),
    footer: requireString(record.footer, "toolsPage.footer"),
    footerLink: requireString(record.footerLink, "toolsPage.footerLink"),
    sections: {
      devices: {
        title: requireString(devices.title, "toolsPage.sections.devices.title"),
        intro: requireString(devices.intro, "toolsPage.sections.devices.intro"),
      },
      web: {
        title: requireString(web.title, "toolsPage.sections.web.title"),
        intro: requireString(web.intro, "toolsPage.sections.web.intro"),
      },
      shortcuts: {
        title: requireString(
          shortcuts.title,
          "toolsPage.sections.shortcuts.title"
        ),
        intro: requireString(
          shortcuts.intro,
          "toolsPage.sections.shortcuts.intro"
        ),
      },
    },
    labels: {
      portfolioLink: requireString(
        labels.portfolioLink,
        "toolsPage.labels.portfolioLink"
      ),
      unavailable: requireString(
        labels.unavailable,
        "toolsPage.labels.unavailable"
      ),
      buy: requireString(labels.buy, "toolsPage.labels.buy"),
      open: requireString(labels.open, "toolsPage.labels.open"),
      readMore: requireString(labels.readMore, "toolsPage.labels.readMore"),
    },
  };
}

function parseSiteUtilities(v: unknown): SiteUtility[] {
  if (!Array.isArray(v)) {
    return [];
  }
  return v.flatMap((item) => {
    const record = asRecord(item);
    if (!record) {
      return [];
    }
    const title = asString(record.title);
    const tagline = asString(record.tagline);
    const href = asString(record.href);
    const actionLabel = asString(record.actionLabel);
    if (!(title && tagline && href && actionLabel)) {
      return [];
    }
    return [
      {
        title,
        tagline,
        href,
        actionLabel,
        external: record.external === true,
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
    primaryAward: parsePrimaryAward(data.primaryAward),
    pressMentions: parsePressMentions(data.pressMentions),
    toolsPage: parseToolsPageCopy(data.toolsPage),
    siteUtilities: parseSiteUtilities(data.siteUtilities),
  };
}

function parseFeaturedBadgeVariant(
  v: unknown
): FeaturedBadgeVariant | undefined {
  if (v === "award" || v === "collaboration" || v === "publisher") {
    return v;
  }
  return;
}

function parseHowIWorkTheme(v: unknown): HowIWorkTheme | undefined {
  if (v === "accent" || v === "web" || v === "audio") {
    return v;
  }
  return;
}

function parseHomeHero(v: unknown): HomeHero {
  const record = asRecord(v);
  if (!record) {
    throw new Error("content/home.md: hero is required");
  }
  const headline = asRecord(record.headline);
  const profile = asRecord(record.profile);
  if (!(headline && profile)) {
    throw new Error("content/home.md: hero.headline and hero.profile required");
  }
  return {
    namePrefix: requireString(record.namePrefix, "hero.namePrefix"),
    brand: requireString(record.brand, "hero.brand"),
    location: requireString(record.location, "hero.location"),
    headline: {
      lead: requireString(headline.lead, "hero.headline.lead"),
      accent: requireString(headline.accent, "hero.headline.accent"),
      bridge: requireString(headline.bridge, "hero.headline.bridge"),
      emphasis: requireString(headline.emphasis, "hero.headline.emphasis"),
      junction: requireString(headline.junction, "hero.headline.junction"),
      highlight: requireString(headline.highlight, "hero.headline.highlight"),
      close: requireString(headline.close, "hero.headline.close"),
    },
    profile: {
      label: requireString(profile.label, "hero.profile.label"),
      paragraphs: asStringArray(profile.paragraphs),
    },
  };
}

function parseHomeFeaturedWorks(v: unknown): HomeFeaturedWork[] {
  if (!Array.isArray(v)) {
    return [];
  }
  return v.flatMap((item, index) => {
    const record = asRecord(item);
    if (!record) {
      return [];
    }
    const badgeVariant = parseFeaturedBadgeVariant(record.badgeVariant);
    const rotation = asNumber(record.rotation);
    if (!badgeVariant || rotation === undefined) {
      throw new Error(
        `content/home.md: featuredWorks[${index}] missing badgeVariant or rotation`
      );
    }
    return [
      {
        slug: requireString(record.slug, `featuredWorks[${index}].slug`),
        badgeLabel: requireString(
          record.badgeLabel,
          `featuredWorks[${index}].badgeLabel`
        ),
        badgeVariant,
        title: requireString(record.title, `featuredWorks[${index}].title`),
        tags: asStringArray(record.tags),
        description: requireString(
          record.description,
          `featuredWorks[${index}].description`
        ),
        cover: requireString(record.cover, `featuredWorks[${index}].cover`),
        rotation,
      },
    ];
  });
}

function parseHomeHowIWork(v: unknown): HomeHowIWorkCard[] {
  if (!Array.isArray(v)) {
    return [];
  }
  return v.flatMap((item, index) => {
    const record = asRecord(item);
    if (!record) {
      return [];
    }
    const theme = parseHowIWorkTheme(record.theme);
    const rotation = asNumber(record.rotation);
    if (!theme || rotation === undefined) {
      throw new Error(
        `content/home.md: howIWork[${index}] missing theme or rotation`
      );
    }
    return [
      {
        eyebrow: requireString(record.eyebrow, `howIWork[${index}].eyebrow`),
        theme,
        title: requireString(record.title, `howIWork[${index}].title`),
        tags: asStringArray(record.tags),
        description: requireString(
          record.description,
          `howIWork[${index}].description`
        ),
        rotation,
      },
    ];
  });
}

function parseHomePracticeColumns(v: unknown): HomePracticeColumn[] {
  if (!Array.isArray(v)) {
    return [];
  }
  return v.flatMap((item, index) => {
    const record = asRecord(item);
    if (!record) {
      return [];
    }
    const id = asProjectCategory(record.id);
    if (!id) {
      throw new Error(`content/home.md: practiceColumns[${index}].id invalid`);
    }
    return [
      {
        id,
        eyebrow: requireString(
          record.eyebrow,
          `practiceColumns[${index}].eyebrow`
        ),
        description: requireString(
          record.description,
          `practiceColumns[${index}].description`
        ),
        useWebStack: record.useWebStack === true,
      },
    ];
  });
}

function getHome(): HomeContent {
  const filePath = path.join(contentDir, "home.md");
  const { data } = readMd(filePath);
  const sections = asRecord(data.sections);
  const recognition = sections ? asRecord(sections.recognition) : undefined;
  if (!(sections && recognition)) {
    throw new Error("content/home.md: sections.recognition required");
  }
  return {
    hero: parseHomeHero(data.hero),
    sections: {
      selectedWorks: requireString(
        sections.selectedWorks,
        "sections.selectedWorks"
      ),
      howIWork: requireString(sections.howIWork, "sections.howIWork"),
      recognition: {
        title: requireString(recognition.title, "sections.recognition.title"),
        intro: requireString(recognition.intro, "sections.recognition.intro"),
      },
      contact: requireString(sections.contact, "sections.contact"),
    },
    featuredWorks: parseHomeFeaturedWorks(data.featuredWorks),
    howIWork: parseHomeHowIWork(data.howIWork),
    practiceColumns: parseHomePracticeColumns(data.practiceColumns),
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
