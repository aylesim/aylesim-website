"use client";

import Image from "next/image";
import { type CSSProperties, useMemo, useState } from "react";
import type { Award, HomeContent, Project, SiteConfig } from "@/lib/content";
import { getProjectCover, type ProjectCover } from "@/lib/project-cover";
import {
  CATEGORY_ACCENT,
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  type ProjectCategory,
} from "@/lib/roles";

type IndexFilter = "all" | ProjectCategory;

const FILTERS: IndexFilter[] = ["all", ...CATEGORY_FILTERS];

function filterLabel(filter: IndexFilter) {
  if (filter === "all") {
    return "All";
  }
  return CATEGORY_LABELS[filter];
}

function clipColor(category: ProjectCategory | null | undefined) {
  if (!category) {
    return "var(--clip-web)";
  }
  return CATEGORY_ACCENT[category];
}

function SessionClip({
  project,
  cover,
  awardTitle,
  priority,
  onSelect,
}: {
  project: Project;
  cover: ProjectCover | null;
  awardTitle?: string;
  priority?: boolean;
  onSelect: (slug: string) => void;
}) {
  const [failed, setFailed] = useState(false);
  const showStill = Boolean(cover) && !failed;
  const clip = clipColor(project.category);

  return (
    <li className="min-w-0">
      <button
        className="clip flex h-full w-full flex-col overflow-hidden text-left"
        onClick={() => onSelect(project.slug)}
        type="button"
      >
        {showStill ? (
          <span className="relative block aspect-[4/3] w-full overflow-hidden bg-(--surface-media)">
            <Image
              alt=""
              className="clip-still object-cover opacity-[0.82] transition-opacity duration-200 motion-reduce:transition-none"
              fill
              onError={() => setFailed(true)}
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              src={cover?.src ?? ""}
              unoptimized
            />
          </span>
        ) : (
          <span
            className="block aspect-[4/3] w-full"
            style={{ background: clip }}
          />
        )}
        <span
          className="clip-strip flex flex-col gap-0.5 px-3 py-2.5"
          style={{ "--clip": clip } as CSSProperties}
        >
          <span className="flex items-baseline justify-between gap-3">
            <span className="font-medium text-[1.05rem] leading-tight">
              {project.title}
            </span>
            <span className="shrink-0 text-xs tabular-nums opacity-70">
              {project.year ?? ""}
            </span>
          </span>
          {project.listTagline ? (
            <span className="text-xs leading-snug opacity-75">
              {project.listTagline}
            </span>
          ) : null}
          {awardTitle ? (
            <span className="text-xs opacity-75">{awardTitle}</span>
          ) : null}
        </span>
      </button>
    </li>
  );
}

function AwardsList({
  awards,
  onSelect,
}: {
  awards: Award[];
  onSelect: (slug: string) => void;
}) {
  if (awards.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="awards-heading" className="max-w-2xl">
      <h2 className="mb-3 font-medium" id="awards-heading">
        Recognition
      </h2>
      <ul className="m-0 list-none space-y-4 p-0">
        {awards.map((award) => (
          <li key={`${award.year}-${award.projectSlug}-${award.title}`}>
            <button
              className="text-left font-medium hover:underline hover:underline-offset-3"
              onClick={() => onSelect(award.projectSlug)}
              type="button"
            >
              {award.headline}
            </button>
            <p className="text-(--text-muted) text-sm">
              {award.title}, {award.issuer}, {award.year}
            </p>
            <a
              className="text-sm"
              href={award.externalHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Source
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

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
  const [filter, setFilter] = useState<IndexFilter>("all");

  const awardTitleBySlug = useMemo(
    () => new Map(site.awards.map((award) => [award.projectSlug, award.title])),
    [site.awards]
  );

  const filtered = useMemo(
    () =>
      projects.filter((project) =>
        filter === "all" ? true : project.category === filter
      ),
    [projects, filter]
  );

  const annotated = useMemo(
    () =>
      filtered.map((project) => ({
        project,
        cover: getProjectCover(project),
      })),
    [filtered]
  );

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <header className="max-w-xl">
        <h1 className="font-medium text-2xl tracking-tight sm:text-[1.75rem]">
          {home.name}
        </h1>
        <p className="mt-1 text-(--text-muted)">
          {home.role}, {home.location}
        </p>
      </header>

      <section aria-labelledby="index-heading">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="sr-only" id="index-heading">
            Work
          </h2>
          <fieldset className="m-0 flex min-w-0 flex-wrap gap-x-4 gap-y-1 border-0 p-0 text-sm">
            <legend className="sr-only">Filter by category</legend>
            {FILTERS.map((item) => {
              const selected = filter === item;
              return (
                <button
                  aria-pressed={selected}
                  className={
                    selected
                      ? "text-(--foreground) underline decoration-2 underline-offset-4"
                      : "text-(--text-muted) hover:text-(--foreground)"
                  }
                  key={item}
                  onClick={() => setFilter(item)}
                  type="button"
                >
                  {filterLabel(item)}
                </button>
              );
            })}
          </fieldset>
        </div>

        {filtered.length === 0 ? (
          <p className="text-(--text-muted)">
            Nothing in {filterLabel(filter)}. Choose another group, or show all
            work.
          </p>
        ) : (
          <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {annotated.map(({ project, cover }, index) => (
              <SessionClip
                awardTitle={awardTitleBySlug.get(project.slug)}
                cover={cover}
                key={project.slug}
                onSelect={onSelect}
                priority={index < 4}
                project={project}
              />
            ))}
          </ul>
        )}
      </section>

      <AwardsList awards={site.awards} onSelect={onSelect} />

      <footer className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-(--text-muted) text-sm">
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
