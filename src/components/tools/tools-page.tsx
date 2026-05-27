import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import type { Project } from "@/lib/content";
import { ROLE_STYLES } from "@/lib/roles";
import {
  getToolsSections,
  SITE_UTILITIES,
  TOOLS_PAGE_COPY,
  type ToolAction,
  type ToolEntry,
  type ToolSection,
} from "@/lib/tools";

const linkClass =
  "underline decoration-(--foreground)/35 underline-offset-[3px] transition-colors hover:text-(--accent)";

const listClass =
  "m-0 list-none divide-y divide-dotted divide-(--index-divider) border-(--index-divider) border-y border-dotted p-0";

const actionClass =
  "shrink-0 text-(--text-muted) text-xs tracking-tight transition-colors hover:text-(--foreground) sm:text-sm";

function ActionLink({
  action,
  accentClass,
}: {
  action: ToolAction;
  accentClass?: string;
}) {
  const className = accentClass
    ? `${accentClass} text-xs tracking-tight transition-opacity hover:opacity-80 sm:text-sm`
    : actionClass;

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

function ToolRow({
  entry,
  accentClass,
}: {
  entry: ToolEntry;
  accentClass: string;
}) {
  const { project, action, unavailable } = entry;

  return (
    <li className={unavailable ? "opacity-45" : undefined}>
      <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm leading-snug tracking-tight">
              {project.title}
            </span>
            {unavailable ? (
              <span className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
                {TOOLS_PAGE_COPY.labels.unavailable}
              </span>
            ) : null}
          </div>
          {project.listTagline ? (
            <p className="mt-0.5 text-(--text-muted) text-xs leading-relaxed sm:text-sm">
              {project.listTagline}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1">
          <ActionLink accentClass={accentClass} action={action} />
          {action.external ? (
            <Link className={actionClass} href={`/?project=${project.slug}`}>
              {TOOLS_PAGE_COPY.labels.portfolioLink}
            </Link>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function UtilityRow({ utility }: { utility: (typeof SITE_UTILITIES)[number] }) {
  const content = (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <div className="min-w-0">
        <span className="text-sm leading-snug tracking-tight">
          {utility.title}
        </span>
        <p className="mt-0.5 text-(--text-muted) text-xs leading-relaxed sm:text-sm">
          {utility.tagline}
        </p>
      </div>
      <span className="shrink-0 text-(--accent) text-xs tracking-tight sm:text-sm">
        {utility.actionLabel}
        <span aria-hidden>{utility.external ? " ↗" : " →"}</span>
      </span>
    </div>
  );

  if (utility.external) {
    return (
      <li>
        <a
          className="block transition-opacity hover:opacity-80"
          href={utility.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link
        className="block transition-opacity hover:opacity-80"
        href={utility.href}
      >
        {content}
      </Link>
    </li>
  );
}

function ToolsSectionBlock({ section }: { section: ToolSection }) {
  const accent = ROLE_STYLES[section.category];

  return (
    <section>
      <header className="mb-4 space-y-1">
        <p
          className={`font-mono text-[10px] uppercase tracking-widest ${accent.labelClass}`}
        >
          {section.title}
        </p>
        <p className="max-w-xl text-(--text-muted) text-sm leading-relaxed">
          {section.intro}
        </p>
      </header>
      <ul className={listClass}>
        {section.entries.map((entry) => (
          <ToolRow
            accentClass={accent.labelClass}
            entry={entry}
            key={entry.project.slug}
          />
        ))}
      </ul>
    </section>
  );
}

export function ToolsPage({ projects }: { projects: Project[] }) {
  const sections = getToolsSections(projects);

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg">
      <SiteHeader active="tools" />

      <main className="relative min-w-0 flex-1">
        <div className="mx-auto w-full max-w-2xl px-4 py-7 md:px-6 md:py-10">
          <header className="mb-8 space-y-2 md:mb-10">
            <h1 className="font-normal text-2xl leading-[1.05] tracking-tight md:text-3xl">
              Tools
            </h1>
            <p className="text-(--text-muted) text-sm leading-relaxed md:text-base">
              {TOOLS_PAGE_COPY.lede}
            </p>
          </header>

          <div className="flex flex-col gap-9 md:gap-11">
            {sections.map((section) => (
              <ToolsSectionBlock key={section.id} section={section} />
            ))}

            <section>
              <header className="mb-4 space-y-1">
                <p className="font-mono text-(--accent) text-[10px] uppercase tracking-widest">
                  {TOOLS_PAGE_COPY.sections.shortcuts.title}
                </p>
                <p className="max-w-xl text-(--text-muted) text-sm leading-relaxed">
                  {TOOLS_PAGE_COPY.sections.shortcuts.intro}
                </p>
              </header>
              <ul className={listClass}>
                {SITE_UTILITIES.map((utility) => (
                  <UtilityRow key={utility.href} utility={utility} />
                ))}
              </ul>
            </section>
          </div>

          <p className="mt-8 text-(--text-muted) text-xs leading-relaxed md:mt-10 md:text-sm">
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
