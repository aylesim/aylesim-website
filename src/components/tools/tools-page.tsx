import Image from "next/image";
import Link from "next/link";
import { ProjectTags } from "@/components/home/project-tags";
import { SiteHeader } from "@/components/site-header";
import type { Project, SiteConfig, SiteUtility } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";
import { CATEGORY_LABELS, ROLE_STYLES } from "@/lib/roles";
import { getToolsSections, type ToolAction, type ToolEntry } from "@/lib/tools";

const linkClass =
  "underline decoration-(--index-divider) underline-offset-[3px] transition-colors hover:text-(--accent)";

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
  labels,
}: {
  entry: ToolEntry;
  accent: (typeof ROLE_STYLES)[keyof typeof ROLE_STYLES];
  labels: SiteConfig["toolsPage"]["labels"];
}) {
  const { project, action, unavailable } = entry;
  const cover = getProjectCover(project);
  const coverIsRemote = cover.startsWith("http");
  const categoryLabel = project.category
    ? CATEGORY_LABELS[project.category]
    : null;

  return (
    <li>
      <article className="group flex h-full flex-col border border-(--index-divider) bg-surface-subtle">
        <div className="relative aspect-4/3 overflow-hidden bg-(--surface-dim)">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="(max-width: 640px) 100vw, 35vw"
            src={cover}
            unoptimized={coverIsRemote}
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-3.5 md:gap-3 md:p-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-sm leading-snug tracking-tight md:text-[0.9375rem]">
                {project.title}
              </h3>
              {unavailable ? (
                <span className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
                  {labels.unavailable}
                </span>
              ) : null}
            </div>
            <ProjectTags category={project.category} tags={project.tags} />
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
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <ToolActionLink
              action={action}
              className={`${accent.labelClass} text-sm tracking-tight transition-opacity hover:opacity-80`}
            />
            {action.external ? (
              <Link
                className={`${linkClass} text-(--text-muted) text-sm`}
                href={`/?project=${project.slug}`}
              >
                {labels.portfolioLink}
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </li>
  );
}

function UtilityCard({ utility }: { utility: SiteUtility }) {
  const body = (
    <>
      <h3 className="text-sm leading-snug tracking-tight md:text-[0.9375rem]">
        {utility.title}
      </h3>
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
    "flex h-full min-h-[7.5rem] flex-col gap-2.5 border border-(--index-divider) bg-surface-subtle p-3.5 transition-colors hover:bg-surface-hover md:gap-3 md:p-4";

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

export function ToolsPage({
  projects,
  site,
}: {
  projects: Project[];
  site: SiteConfig;
}) {
  const sections = getToolsSections(projects, site);
  const { toolsPage, siteUtilities } = site;
  const { shortcuts } = toolsPage.sections;

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg">
      <SiteHeader active="tools" />

      <main className="relative min-w-0 flex-1">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 md:px-8">
          <header className="border-(--index-divider) border-b border-dotted py-10 md:py-14">
            <h1 className="max-w-2xl font-normal text-3xl leading-[1.08] tracking-[-0.02em] md:text-[2.15rem]">
              Tools
            </h1>
            <p className="mt-3 max-w-xl text-(--text-muted) text-sm leading-[1.65] md:text-[0.9375rem]">
              {toolsPage.lede}
            </p>
          </header>

          <div className="flex flex-col">
            {sections.map((section) => {
              const accent = ROLE_STYLES[section.category];
              return (
                <section
                  className="border-(--index-divider) border-b border-dotted py-10 md:py-14"
                  key={section.id}
                >
                  <header
                    className={`mb-5 max-w-2xl space-y-2 md:mb-6 ${accent.borderClass} border-t-2 pt-5`}
                  >
                    <p
                      className={`font-mono text-[11px] uppercase tracking-widest ${accent.labelClass}`}
                    >
                      {CATEGORY_LABELS[section.category]}
                    </p>
                    <h2 className="text-pretty text-lg leading-[1.2] tracking-tight md:text-xl">
                      {section.title}
                    </h2>
                    <p className="text-(--text-muted) text-sm leading-relaxed md:text-[0.9375rem]">
                      {section.intro}
                    </p>
                  </header>
                  <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {section.entries.map((entry) => (
                      <ToolCard
                        accent={accent}
                        entry={entry}
                        key={entry.project.slug}
                        labels={toolsPage.labels}
                      />
                    ))}
                  </ul>
                </section>
              );
            })}

            <section className="border-(--index-divider) border-b border-dotted py-10 md:py-14">
              <header className="mb-5 max-w-2xl space-y-2 border-(--accent)/40 border-t-2 pt-5 md:mb-6">
                <p className="font-mono text-(--accent) text-[11px] uppercase tracking-widest">
                  {shortcuts.title}
                </p>
                <p className="text-(--text-muted) text-sm leading-relaxed md:text-[0.9375rem]">
                  {shortcuts.intro}
                </p>
              </header>
              <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-4">
                {siteUtilities.map((utility) => (
                  <UtilityCard key={utility.href} utility={utility} />
                ))}
              </ul>
            </section>
          </div>

          <p className="py-8 text-(--text-muted) text-sm leading-relaxed md:py-10">
            {toolsPage.footer}{" "}
            <Link className={linkClass} href="/?projects">
              {toolsPage.footerLink}
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
