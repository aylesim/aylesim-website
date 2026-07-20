"use client";

import type { HomeContent, Project, SiteConfig } from "@/lib/content";
import { CATEGORY_LABELS } from "@/lib/roles";

export function ArchiveIndex({
  home,
  projects,
  site,
  onSelect,
}: {
  home: HomeContent;
  projects: Project[];
  site: SiteConfig;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="flex flex-col gap-10">
      <header className="space-y-1">
        <h1 className="text-base uppercase tracking-wide">{home.name}</h1>
        <p className="text-(--text-muted)">
          {home.role} · {home.location}
        </p>
      </header>

      <section aria-labelledby="index-heading">
        <h2
          className="mb-3 border-(--index-divider) border-b pb-2 text-(--text-muted) text-xs uppercase tracking-widest"
          id="index-heading"
        >
          Index
        </h2>
        <ul className="m-0 list-none divide-y divide-(--index-divider) border-(--index-divider) border-b p-0">
          {projects.map((project) => {
            const categoryLabel = project.category
              ? CATEGORY_LABELS[project.category]
              : null;
            return (
              <li key={project.slug}>
                <button
                  className="group grid w-full grid-cols-[4.5rem_1fr] items-baseline gap-x-3 gap-y-0.5 py-2.5 text-left sm:grid-cols-[4.5rem_minmax(0,1fr)_7rem]"
                  onClick={() => onSelect(project.slug)}
                  type="button"
                >
                  <span className="text-(--text-faint) tabular-nums">
                    {project.year ?? "—"}
                  </span>
                  <span className="min-w-0">
                    <span className="group-hover:underline group-hover:underline-offset-3">
                      {project.title}
                    </span>
                    {project.listTagline ? (
                      <span className="mt-0.5 block text-(--text-faint) text-xs">
                        {project.listTagline}
                      </span>
                    ) : null}
                  </span>
                  {categoryLabel ? (
                    <span className="col-start-2 text-(--text-faint) text-xs sm:col-start-auto sm:text-right">
                      {categoryLabel}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <footer className="flex flex-wrap gap-x-4 gap-y-1 border-(--index-divider) border-t pt-4 text-(--text-muted) text-xs">
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        {site.contactLinks.map((link) => (
          <a
            href={link.href}
            key={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </footer>
    </div>
  );
}
