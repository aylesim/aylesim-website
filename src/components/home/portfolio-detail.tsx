import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ProjectTags } from "@/components/home/project-tags";
import { Markdown } from "@/components/markdown";
import type { Project, ProjectVideo, SiteConfig } from "@/lib/content";
import { projectStills } from "@/lib/project-cover";

const detailLinkClass = "underline underline-offset-3";

const youtubeEmbedPath = /^\/embed\/([^/?]+)/;
const vimeoPlayerPath = /^\/video\/(\d+)/;
const vimeoVideoInPath = /\/video\/(\d+)/;
const vimeoNumericSegment = /^\d+$/;
const hostnameWwwPrefix = /^www\./;

function Meta({ children }: { children: React.ReactNode }) {
  return <p className="text-(--text-muted) text-sm">{children}</p>;
}

function DetailLinks({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">
      {children}
    </div>
  );
}

function HighlightsList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 list-inside list-disc space-y-1 text-(--text-muted) text-xs">
      {items.map((h) => (
        <li key={h}>{h}</li>
      ))}
    </ul>
  );
}

function youtubeVideoId(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      return id || null;
    }
    if (
      u.hostname === "www.youtube.com" ||
      u.hostname === "youtube.com" ||
      u.hostname === "m.youtube.com"
    ) {
      const v = u.searchParams.get("v");
      if (v) {
        return v;
      }
      const m = u.pathname.match(youtubeEmbedPath);
      return m?.[1] ?? null;
    }
  } catch {
    return null;
  }
  return null;
}

function vimeoVideoId(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.replace(hostnameWwwPrefix, "");
    if (host === "player.vimeo.com") {
      const m = u.pathname.match(vimeoPlayerPath);
      return m?.[1] ?? null;
    }
    if (host === "vimeo.com") {
      const videoPath = u.pathname.match(vimeoVideoInPath);
      if (videoPath) {
        return videoPath[1];
      }
      const segments = u.pathname.split("/").filter(Boolean);
      for (const seg of segments) {
        if (vimeoNumericSegment.test(seg)) {
          return seg;
        }
      }
    }
  } catch {
    return null;
  }
  return null;
}

function ProjectVideoEmbed({ item }: { item: ProjectVideo }) {
  const ytId = youtubeVideoId(item.url);
  if (ytId) {
    return (
      <div className="relative aspect-video w-full max-w-full overflow-hidden bg-black">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube.com/embed/${ytId}`}
          title={item.title}
        />
      </div>
    );
  }
  const vmId = vimeoVideoId(item.url);
  if (vmId) {
    return (
      <div className="relative aspect-video w-full max-w-full overflow-hidden bg-black">
        <iframe
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={`https://player.vimeo.com/video/${vmId}?badge=0&autopause=0&player_id=0&app_id=58479`}
          title={item.title}
        />
      </div>
    );
  }
  return (
    <a
      className={detailLinkClass}
      href={item.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {item.url}
    </a>
  );
}

function ProjectVideos({
  videos,
  leading = false,
}: {
  videos: ProjectVideo[];
  leading?: boolean;
}) {
  return (
    <div className={leading ? "mb-8 space-y-6" : "mt-8 space-y-8"}>
      {leading ? null : (
        <h2 className="text-xl leading-tight tracking-tight">
          {videos.length === 1 ? "Video" : "Videos"}
        </h2>
      )}
      {videos.map((item) => (
        <div className="space-y-2" key={item.url}>
          <p className="text-(--text-muted) text-xs">{item.title}</p>
          <ProjectVideoEmbed item={item} />
        </div>
      ))}
    </div>
  );
}

function markdownImagesIn(source: string) {
  return source.matchAll(/!\[([^\]]*)\]\(([^)\s]+)\)/g);
}

function stripHiddenImages(source: string, hiddenSrcs: ReadonlySet<string>) {
  if (hiddenSrcs.size === 0) {
    return source;
  }
  const stripped = source.replace(
    /!\[[^\]]*\]\(([^)\s]+)\)/g,
    (full, src: string) => (hiddenSrcs.has(src) ? "" : full)
  );
  return stripped
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function altFromMarkdown(source: string, src: string, fallback: string) {
  for (const match of markdownImagesIn(source)) {
    if (match[2] === src && match[1]) {
      return match[1];
    }
  }
  return fallback;
}

function ProjectStillLead({
  stills,
  alts,
}: {
  stills: string[];
  alts: string[];
}) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      {stills.map((src, index) => (
        <figure className="overflow-hidden bg-(--surface-media)" key={src}>
          <Image
            alt={alts[index] ?? ""}
            className="h-auto w-full"
            height={1200}
            priority={index === 0}
            src={src}
            unoptimized
            width={1800}
          />
        </figure>
      ))}
    </div>
  );
}

function ProjectMarkdownBody({ source }: { source: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ children, href }) => (
          <a
            className={detailLinkClass}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {children}
          </a>
        ),
        img: ({ alt, src }) =>
          typeof src === "string" ? (
            <span className="my-4 block overflow-hidden">
              <Image
                alt={alt ?? ""}
                className="h-auto w-full"
                height={900}
                src={src}
                unoptimized
                width={1600}
              />
            </span>
          ) : null,
        blockquote: ({ children }) => (
          <blockquote className="my-4 border-(--foreground) border-l pl-4 text-(--text-muted)">
            {children}
          </blockquote>
        ),
        h1: ({ children }) => (
          <h3 className="mt-6 mb-2 text-2xl leading-tight tracking-tight first:mt-0">
            {children}
          </h3>
        ),
        h2: ({ children }) => (
          <h3 className="mt-6 mb-2 text-xl leading-tight tracking-tight first:mt-0">
            {children}
          </h3>
        ),
        h3: ({ children }) => (
          <h4 className="mt-5 mb-2 text-lg leading-tight tracking-tight first:mt-0">
            {children}
          </h4>
        ),
        ol: ({ children }) => (
          <ol className="my-3 list-inside list-decimal space-y-1">
            {children}
          </ol>
        ),
        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
        ul: ({ children }) => (
          <ul className="my-3 list-inside list-disc space-y-1">{children}</ul>
        ),
      }}
    >
      {source}
    </ReactMarkdown>
  );
}

export function ProjectDetail({
  slug,
  projects,
  site,
}: {
  slug: string;
  projects: Project[];
  site: SiteConfig;
}) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return null;
  }
  const [primaryLabel, ...remainingPrimaryMeta] = project.primaryMeta;
  const stills = projectStills(project);
  const hiddenSrcs = new Set(stills);
  const markdownSource = [project.description, project.descriptionAfterVideos]
    .filter(Boolean)
    .join("\n");
  const stillAlts = stills.map((src, index) =>
    altFromMarkdown(
      markdownSource,
      src,
      `${project.title}, still ${index + 1} of ${stills.length}`
    )
  );
  const metaParts = [
    primaryLabel,
    ...remainingPrimaryMeta,
    project.secondaryMeta,
  ].filter(Boolean);
  const videos = project.videos ?? [];
  const leadWithVideo = stills.length === 0 && videos.length > 0;
  return (
    <article className="w-full">
      {stills.length > 0 ? (
        <ProjectStillLead alts={stillAlts} stills={stills} />
      ) : null}
      {leadWithVideo ? <ProjectVideos leading videos={videos} /> : null}
      <div className="max-w-2xl">
        <h1 className="mb-2 font-medium text-3xl leading-tight tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        {metaParts.length > 0 ? <Meta>{metaParts.join(" / ")}</Meta> : null}
        {project.slug === site.aylesimDevicesSlug ? (
          <Meta>{site.audioDeveloperProductLine}</Meta>
        ) : null}
        {project.tags.length > 0 ? (
          <ProjectTags
            category={project.category}
            className="mt-3 mb-1"
            tags={project.tags}
          />
        ) : null}
        {project.link ? (
          <DetailLinks>
            <a
              className={detailLinkClass}
              href={project.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              {project.linkLabel ?? "Visit"}
            </a>
          </DetailLinks>
        ) : null}
        <div className="mt-6 text-(--foreground) text-sm leading-relaxed">
          <Markdown>
            {stripHiddenImages(project.description, hiddenSrcs)}
          </Markdown>
        </div>
      </div>
      {leadWithVideo || videos.length === 0 ? null : (
        <ProjectVideos videos={videos} />
      )}
      {project.descriptionAfterVideos ? (
        <div className="mt-6 max-w-2xl text-(--foreground) text-sm leading-relaxed">
          <ProjectMarkdownBody
            source={stripHiddenImages(
              project.descriptionAfterVideos,
              hiddenSrcs
            )}
          />
        </div>
      ) : null}
      {project.highlights.length > 0 ? (
        <div className="max-w-2xl">
          <HighlightsList items={project.highlights} />
        </div>
      ) : null}
    </article>
  );
}
