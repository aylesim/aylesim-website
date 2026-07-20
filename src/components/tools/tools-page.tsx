import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import type { Project, SiteConfig, SiteUtility } from "@/lib/content";
import { getToolsSections, type ToolAction, type ToolEntry } from "@/lib/tools";

function ToolActionLink({ action }: { action: ToolAction }) {
  if (action.external) {
    return (
      <a href={action.href} rel="noopener noreferrer" target="_blank">
        {action.label}
      </a>
    );
  }
  return <Link href={action.href}>{action.label}</Link>;
}

function ToolRow({
  entry,
  labels,
}: {
  entry: ToolEntry;
  labels: SiteConfig["toolsPage"]["labels"];
}) {
  const { project, action, unavailable } = entry;
  return (
    <li className="grid grid-cols-1 gap-1 border-(--index-divider) border-b py-3 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4">
      <div>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span>{project.title}</span>
          {unavailable ? (
            <span className="text-(--text-faint) text-xs uppercase">
              {labels.unavailable}
            </span>
          ) : null}
        </div>
        {project.listTagline ? (
          <p className="mt-0.5 text-(--text-faint) text-xs">
            {project.listTagline}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-(--text-muted) text-xs">
        {unavailable ? null : <ToolActionLink action={action} />}
        <Link href={`/?project=${project.slug}`}>{labels.portfolioLink}</Link>
      </div>
    </li>
  );
}

function UtilityRow({ utility }: { utility: SiteUtility }) {
  const Comp = utility.external ? "a" : Link;
  const extra = utility.external
    ? { href: utility.href, rel: "noopener noreferrer", target: "_blank" }
    : { href: utility.href };
  return (
    <li className="grid grid-cols-1 gap-1 border-(--index-divider) border-b py-3 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-4">
      <div>
        <span>{utility.title}</span>
        <p className="mt-0.5 text-(--text-faint) text-xs">{utility.tagline}</p>
      </div>
      <Comp className="text-(--text-muted) text-xs" {...extra}>
        {utility.actionLabel}
      </Comp>
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

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg">
      <SiteHeader active="tools" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <div className="space-y-10">
          <header className="space-y-1">
            <h1 className="text-base uppercase tracking-wide">Tools</h1>
            <p className="text-(--text-muted)">{toolsPage.lede}</p>
          </header>

          {sections.map((section) => (
            <section aria-labelledby={`tools-${section.id}`} key={section.id}>
              <h2 className="mb-1 text-sm" id={`tools-${section.id}`}>
                {section.title}
              </h2>
              <p className="mb-3 text-(--text-faint) text-xs">
                {section.intro}
              </p>
              <ul className="m-0 list-none border-(--index-divider) border-t p-0">
                {section.entries.map((entry) => (
                  <ToolRow
                    entry={entry}
                    key={entry.project.slug}
                    labels={toolsPage.labels}
                  />
                ))}
              </ul>
            </section>
          ))}

          {siteUtilities.length > 0 ? (
            <section aria-labelledby="tools-utilities">
              <h2 className="mb-3 text-sm" id="tools-utilities">
                {toolsPage.sections.shortcuts.title}
              </h2>
              <ul className="m-0 list-none border-(--index-divider) border-t p-0">
                {siteUtilities.map((utility) => (
                  <UtilityRow key={utility.href} utility={utility} />
                ))}
              </ul>
            </section>
          ) : null}

          <p className="text-(--text-muted) text-xs">
            {toolsPage.footer} <Link href="/">{toolsPage.footerLink}</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
