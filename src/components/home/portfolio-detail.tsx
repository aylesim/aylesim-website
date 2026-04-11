import Image from "next/image";
import ReactMarkdown from "react-markdown";
import type { AboutData, Project, ProjectVideo } from "@/lib/content";
import { contactEmail, contactLinks } from "@/lib/site";

const detailLinkClass =
  "underline decoration-[var(--foreground)]/35 underline-offset-[3px]";

const youtubeEmbedPath = /^\/embed\/([^/?]+)/;

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-(--text-muted) text-xs leading-relaxed">{children}</p>
  );
}

function PrimaryLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 block w-fit bg-white px-3 py-1.5 text-black text-sm leading-none tracking-tight sm:text-base">
      {children}
    </p>
  );
}

function DetailLinks({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-xs">
      {children}
    </div>
  );
}

function HighlightsList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-inside list-disc space-y-1 text-(--text-muted) text-xs leading-relaxed">
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

function ProjectVideos({ videos }: { videos: ProjectVideo[] }) {
  return (
    <div className="mt-8 space-y-8">
      <h3 className="text-xl leading-tight tracking-tight">Videos</h3>
      {videos.map((item) => {
        const id = youtubeVideoId(item.url);
        return (
          <div className="space-y-2" key={item.url}>
            <p className="text-(--text-muted) text-xs">{item.title}</p>
            {id ? (
              <div className="relative aspect-video w-full max-w-full overflow-hidden border border-(--index-divider) bg-black">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={item.title}
                />
              </div>
            ) : (
              <a
                className={detailLinkClass}
                href={item.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.url}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ProjectDetail({
  slug,
  projects,
}: {
  slug: string;
  projects: Project[];
}) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return null;
  }
  const [primaryLabel, ...remainingPrimaryMeta] = project.primaryMeta;
  return (
    <div className="w-full max-w-4xl">
      <h2 className="mb-3 block w-fit bg-white px-4 py-2 text-3xl text-black leading-[0.95] tracking-tight sm:text-5xl">
        {project.title}
      </h2>
      {primaryLabel ? <PrimaryLabel>{primaryLabel}</PrimaryLabel> : null}
      {remainingPrimaryMeta.length > 0 ? (
        <Meta>{remainingPrimaryMeta.join(" · ")}</Meta>
      ) : null}
      {project.secondaryMeta ? <Meta>{project.secondaryMeta}</Meta> : null}
      {project.tags.length > 0 ? (
        <Meta>Filed under: {project.tags.join(" · ")}</Meta>
      ) : null}
      <div className="mt-4 text-(--foreground)/90 text-sm leading-relaxed">
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
                <span className="my-4 block overflow-hidden border border-(--index-divider)">
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
              <blockquote className="my-4 border-(--index-divider) border-l-2 pl-4 text-(--text-muted)">
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
              <ul className="my-3 list-inside list-disc space-y-1">
                {children}
              </ul>
            ),
          }}
        >
          {project.description}
        </ReactMarkdown>
      </div>
      {project.videos && project.videos.length > 0 ? (
        <ProjectVideos videos={project.videos} />
      ) : null}
      {project.highlights.length > 0 ? (
        <HighlightsList items={project.highlights} />
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
    </div>
  );
}

export function AboutInlineContent({ about }: { about: AboutData }) {
  const embeddedLinkClass =
    "text-xs underline decoration-[var(--foreground)]/35 underline-offset-[3px]";
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,1fr)] lg:gap-10">
        <div className="min-w-0 max-w-4xl space-y-3 text-(--foreground)/90 text-sm leading-relaxed">
          {about.bio.map((paragraph) => (
            <div key={paragraph}>
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
                  p: ({ children }) => <p>{children}</p>,
                }}
              >
                {paragraph}
              </ReactMarkdown>
            </div>
          ))}
        </div>
        <div className="min-w-0 space-y-3 border-(--index-divider) border-t border-dotted pt-4 lg:max-w-sm lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <a
            className={`block ${embeddedLinkClass}`}
            href={`mailto:${contactEmail}`}
          >
            {contactEmail}
          </a>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {contactLinks.map((link) => (
              <a
                className={embeddedLinkClass}
                href={link.href}
                key={link.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-3 border-(--index-divider) border-t border-dotted pt-3 text-(--text-muted) text-sm leading-relaxed">
            Open to studio collaborations, commissions, and freelance projects.
          </p>
        </div>
      </div>
    </div>
  );
}
