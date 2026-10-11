"use client";

import Image from "next/image";
import { useState } from "react";
import type { Award, HomeContent, Project, SiteConfig } from "@/lib/content";
import { getProjectCover, type ProjectCover } from "@/lib/project-cover";
import {
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

function cardMeta(project: Project, extra?: string) {
  const category = project.category ? CATEGORY_LABELS[project.category] : null;
  return [project.year ?? "—", category, extra].filter(Boolean).join(" · ");
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
    <section aria-labelledby="awards-heading" className="space-y-3">
      <h2
        className="border-(--index-divider) border-b pb-2 text-xs uppercase tracking-widest"
        id="awards-heading"
      >
        Prizes
      </h2>
      <ul className="m-0 list-none space-y-4 p-0">
        {awards.map((award) => (
          <li
            className="border-(--index-divider) border-b pb-4 last:border-b-0 last:pb-0"
            key={`${award.year}-${award.projectSlug}-${award.title}`}
          >
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-(--text-muted) tabular-nums">
                  {award.year}
                </span>
                <button
                  className="text-left underline-offset-3 hover:underline"
                  onClick={() => onSelect(award.projectSlug)}
                  type="button"
                >
                  {award.headline}
                </button>
              </div>
              <p className="text-(--text-muted) text-xs">
                {award.title} · {award.issuer}
              </p>
              <a
                className="w-fit text-xs underline underline-offset-3"
                href={award.externalHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                Source
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WorkVisualCard({
  project,
  cover,
  awardTitle,
  featured,
  onSelect,
}: {
  project: Project;
  cover: ProjectCover;
  awardTitle?: string;
  featured: boolean;
  onSelect: (slug: string) => void;
}) {
  const [failed, setFailed] = useState(false);
  const meta = cardMeta(project, cover.kind === "video" ? "Video" : undefined);

  return (
    <li className={featured ? "min-w-0 sm:col-span-2" : "min-w-0"}>
      <button
        className="group flex h-full w-full flex-col border border-(--index-divider) bg-bg text-left hover:border-(--foreground)"
        onClick={() => onSelect(project.slug)}
        type="button"
      >
        {failed ? null : (
          <span
            className={`relative block w-full overflow-hidden bg-(--surface-media) ${featured ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/3]"}`}
          >
            <Image
              alt=""
              className="object-cover"
              fill
              onError={() => setFailed(true)}
              priority={featured}
              sizes={
                featured
                  ? "(min-width: 1024px) 66vw, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              src={cover.src}
              unoptimized
            />
          </span>
        )}
        <span className="flex flex-col gap-1 px-3 py-3">
          <span className="text-(--text-muted) text-xs">{meta}</span>
          <span className="text-sm group-hover:underline group-hover:underline-offset-3 sm:text-base">
            {project.title}
          </span>
          {project.listTagline ? (
            <span className="text-(--text-muted) text-xs">
              {project.listTagline}
            </span>
          ) : null}
          {awardTitle ? (
            <span className="text-(--text-muted) text-xs">
              Prize · {awardTitle}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  );
}

function WorkTextCard({
  project,
  awardTitle,
  onSelect,
}: {
  project: Project;
  awardTitle?: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <li className="min-w-0">
      <button
        className="group flex h-full w-full flex-col gap-2 border border-(--index-divider) bg-bg px-3 py-4 text-left hover:border-(--foreground)"
        onClick={() => onSelect(project.slug)}
        type="button"
      >
        <span className="text-(--text-muted) text-xs">{cardMeta(project)}</span>
        <span className="text-sm group-hover:underline group-hover:underline-offset-3">
          {project.title}
        </span>
        {project.listTagline ? (
          <span className="text-(--text-muted) text-xs">
            {project.listTagline}
          </span>
        ) : null}
        {awardTitle ? (
          <span className="text-(--text-muted) text-xs">
            Prize · {awardTitle}
          </span>
        ) : null}
      </button>
    </li>
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
  const awardTitleBySlug = new Map(
    site.awards.map((award) => [award.projectSlug, award.title])
  );
  const filtered = projects.filter((project) =>
    filter === "all" ? true : project.category === filter
  );
  const annotated = filtered.map((project) => ({
    project,
    cover: getProjectCover(project),
  }));
  const visual = annotated.filter(
    (item): item is { project: Project; cover: ProjectCover } =>
      item.cover !== null
  );
  const textual = annotated.filter((item) => item.cover === null);

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <header className="max-w-3xl">
        <h1 className="text-xl uppercase tracking-wide sm:text-2xl">
          {home.name}
        </h1>
        <p className="mt-2 text-sm leading-relaxed sm:text-base">
          {home.role}
          <span className="text-(--text-muted)"> · {home.location}</span>
        </p>
      </header>

      <section aria-labelledby="index-heading">
        <div className="mb-4 flex flex-col gap-3 border-(--index-divider) border-b pb-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-xs uppercase tracking-widest" id="index-heading">
            Index
          </h2>
          <fieldset className="m-0 flex min-w-0 flex-wrap gap-x-4 gap-y-1 border-0 p-0 text-xs uppercase tracking-widest">
            <legend className="sr-only">Filter by category</legend>
            {FILTERS.map((item) => {
              const selected = filter === item;
              return (
                <button
                  aria-pressed={selected}
                  className={
                    selected
                      ? "text-(--foreground) underline underline-offset-3"
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
          <p className="text-(--text-muted) text-sm">
            No projects in this category.
          </p>
        ) : (
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {visual.map(({ project, cover }, index) => (
              <WorkVisualCard
                awardTitle={awardTitleBySlug.get(project.slug)}
                cover={cover}
                featured={index === 0}
                key={project.slug}
                onSelect={onSelect}
                project={project}
              />
            ))}
            {textual.map(({ project }) => (
              <WorkTextCard
                awardTitle={awardTitleBySlug.get(project.slug)}
                key={project.slug}
                onSelect={onSelect}
                project={project}
              />
            ))}
          </ul>
        )}
      </section>

      <AwardsList awards={site.awards} onSelect={onSelect} />

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
