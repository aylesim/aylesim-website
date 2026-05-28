import Image from "next/image";
import Link from "next/link";
import { ProjectTags } from "@/components/home/project-tags";
import { SiteHeader } from "@/components/site-header";
import type { Project } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";
import { CATEGORY_LABELS, ROLE_STYLES } from "@/lib/roles";
import {
  getToolsSections,
  SITE_UTILITIES,
  TOOLS_PAGE_COPY,
  type ToolAction,
  type ToolEntry,
} from "@/lib/tools";

const linkClass =
  "underline decoration-(--foreground)/35 underline-offset-[3px] transition-colors hover:text-(--accent)";

function ToolActionLink({
  action,
  className,
}: {
  action: ToolAction;
  className: string;
}) {
  if (action.external) {
    return (
      <a
        className={className}
        href={action.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {action.label}
        <span aria-hidden> ↗</span>
      </a>
    );
  }

  return (
    <Link className={className} href={action.href}>
      {action.label}
      <span aria-hidden> →</span>
    </Link>
  );
}

function ToolCard({
  entry,
  accent,
}: {
  entry: ToolEntry;
  accent: (typeof ROLE_STYLES)[keyof typeof ROLE_STYLES];
}) {
  const { project, action, unavailable } = entry;
  const cover = getProjectCover(project);
  const coverIsRemote = cover.startsWith("http");
  const categoryLabel = project.category
    ? CATEGORY_LABELS[project.category]
    : null;

  return (
    <li>
      <article className="group flex h-full flex-col border border-(--index-divider) bg-(--foreground)/[0.03]">
        <div className="relative aspect-4/3 overflow-hidden bg-black/30">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="(max-width: 640px) 100vw, 35vw"
            src={cover}
            unoptimized={coverIsRemote}
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 md:p-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-base leading-snug tracking-tight">
                {project.title}
              </h3>
              {unavailable ? (
                <span className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
                  {TOOLS_PAGE_COPY.labels.unavailable}
                </span>
              ) : null}
            </div>
            <ProjectTags tags={project.tags} />
            {categoryLabel ? (
              <p className={`text-[11px] tracking-wide ${accent.labelClass}`}>
                {categoryLabel}
              </p>
            ) : null}
            {project.listTagline ? (
              <p className="text-(--text-muted) text-sm leading-relaxed">
                {project.listTagline}
              </p>
            ) : null}
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <ToolActionLink
              action={action}
              className={`${accent.labelClass} tracking-tight transition-opacity hover:opacity-80`}
            />
            {action.external ? (
              <Link
                className={`${linkClass} text-(--text-muted) text-sm`}
                href={`/?project=${project.slug}`}
              >
                {TOOLS_PAGE_COPY.labels.portfolioLink}
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </li>
  );
}

function UtilityCard({
  utility,
}: {
  utility: (typeof SITE_UTILITIES)[number];
}) {
  const body = (
    <>
      <h3 className="text-base leading-snug tracking-tight">{utility.title}</h3>
      <p className="text-(--text-muted) text-sm leading-relaxed">
        {utility.tagline}
      </p>
      <span className="mt-auto inline-flex text-(--accent) text-sm tracking-tight transition-opacity hover:opacity-80">
        {utility.actionLabel}
        <span aria-hidden>{utility.external ? " ↗" : " →"}</span>
      </span>
    </>
  );

  const shell =
    "flex h-full min-h-[9rem] flex-col gap-3 border border-(--index-divider) bg-(--foreground)/[0.03] p-4 transition-colors hover:bg-(--foreground)/[0.06] md:p-5";

  if (utility.external) {
    return (
      <li>
        <a
          className={shell}
          href={utility.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {body}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link className={shell} href={utility.href}>
        {body}
      </Link>
    </li>
  );
}

export function ToolsPage({ projects }: { projects: Project[] }) {
  const sections = getToolsSections(projects);

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg">
      <SiteHeader active="tools" />

      <main className="relative min-w-0 flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-12">
          <header className="mb-10 max-w-2xl space-y-4 md:mb-14">
            <h1 className="font-normal text-3xl leading-[1.05] tracking-tight md:text-4xl">
              Tools
            </h1>
            <p className="text-(--text-muted) text-base leading-relaxed md:text-lg">
              {TOOLS_PAGE_COPY.lede}
            </p>
          </header>

          <div className="flex flex-col gap-12 md:gap-16">
            {sections.map((section) => {
              const accent = ROLE_STYLES[section.category];
              return (
                <section key={section.id}>
                  <header className="mb-6 max-w-2xl space-y-2 md:mb-8">
                    <h2
                      className={`text-xl tracking-tight md:text-2xl ${accent.labelClass}`}
                    >
                      {section.title}
                    </h2>
                    <p className="text-(--text-muted) text-sm leading-relaxed md:text-base">
                      {section.intro}
                    </p>
                  </header>
                  <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                    {section.entries.map((entry) => (
                      <ToolCard
                        accent={accent}
                        entry={entry}
                        key={entry.project.slug}
                      />
                    ))}
                  </ul>
                </section>
              );
            })}

            <section>
              <header className="mb-6 max-w-2xl space-y-2 md:mb-8">
                <h2 className="text-(--accent) text-xl tracking-tight md:text-2xl">
                  {TOOLS_PAGE_COPY.sections.shortcuts.title}
                </h2>
                <p className="text-(--text-muted) text-sm leading-relaxed md:text-base">
                  {TOOLS_PAGE_COPY.sections.shortcuts.intro}
                </p>
              </header>
              <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5">
                {SITE_UTILITIES.map((utility) => (
                  <UtilityCard key={utility.href} utility={utility} />
                ))}
              </ul>
            </section>
          </div>

          <p className="mt-12 text-(--text-muted) text-sm leading-relaxed md:mt-16">
            {TOOLS_PAGE_COPY.footer}{" "}
            <Link className={linkClass} href="/?projects">
              {TOOLS_PAGE_COPY.footerLink}
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
