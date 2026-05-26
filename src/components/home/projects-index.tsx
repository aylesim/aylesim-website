"use client";

import Image from "next/image";
import type { Project } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";
import {
  CATEGORY_FILTERS,
  CATEGORY_INTRO_COPY,
  CATEGORY_LABELS,
  FILTER_PILL_STYLES,
  type ProjectCategory,
  ROLE_STYLES,
} from "@/lib/roles";

const WIDE_SLUGS = new Set([
  "birds",
  "tedx-barletta",
  "planetary-compendium",
  "there-will-be-no-more-determination",
]);

function cardLayout(index: number, slug: string): "wide" | "normal" {
  if (WIDE_SLUGS.has(slug)) {
    return "wide";
  }
  return index % 3 === 2 ? "wide" : "normal";
}

function ProjectCard({
  project,
  layout,
  onHover,
  onSelect,
}: {
  project: Project;
  layout: "wide" | "normal";
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
}) {
  const cover = getProjectCover(project);
  const coverIsRemote = cover.startsWith("http");
  const category = project.category;
  const categoryLabel = category ? CATEGORY_LABELS[category] : null;
  const accentStyles = category ? ROLE_STYLES[category] : null;

  return (
    <li className={layout === "wide" ? "sm:col-span-2" : undefined}>
      <button
        aria-label={project.title}
        className="group w-full text-left"
        onClick={() => onSelect(project.slug)}
        onMouseEnter={() => onHover(project.slug)}
        onMouseLeave={() => onHover(null)}
        type="button"
      >
        <span
          className={`relative block overflow-hidden bg-black/30 ${
            layout === "wide" ? "aspect-21/9" : "aspect-4/3"
          }`}
        >
          <Image
            alt=""
            className="object-cover"
            fill
            sizes={
              layout === "wide"
                ? "(max-width: 640px) 100vw, 70vw"
                : "(max-width: 640px) 100vw, 35vw"
            }
            src={cover}
            unoptimized={coverIsRemote}
          />
        </span>
        <span className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="inline-flex items-baseline gap-1">
            <span className="text-base leading-snug tracking-tight underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-(--foreground)">
              {project.title}
            </span>
            <span className="text-(--text-muted) text-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              →
            </span>
          </span>
          {categoryLabel && accentStyles ? (
            <span
              className={`font-normal text-[11px] tracking-wide ${accentStyles.labelClass}`}
            >
              {categoryLabel}
            </span>
          ) : null}
          {project.year ? (
            <span className="text-(--foreground)/45 text-[11px] tracking-wide">
              {project.year}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  );
}

export function ProjectsIndex({
  projects,
  categoryFilter,
  onCategoryFilter,
  onHighlight,
  onSelect,
}: {
  projects: Project[];
  categoryFilter: ProjectCategory | null;
  onCategoryFilter: (category: ProjectCategory) => void;
  onHighlight: (slug: string | null) => void;
  onSelect: (slug: string) => void;
}) {
  const filtered = categoryFilter
    ? projects.filter((project) => project.category === categoryFilter)
    : projects;

  const filterLabel = categoryFilter ? CATEGORY_LABELS[categoryFilter] : null;
  const introCopy = categoryFilter ? CATEGORY_INTRO_COPY[categoryFilter] : null;

  return (
    <div className="min-h-[calc(100dvh-5rem)] overflow-y-auto px-4 py-6 md:px-8 md:py-8">
      <header className="mb-6 md:mb-8">
        <div className="flex items-start justify-between gap-x-6 gap-y-4">
          <h1 className="text-2xl leading-snug tracking-tight md:text-3xl">
            Selected works
          </h1>

          <fieldset className="m-0 flex shrink-0 flex-wrap items-center justify-end gap-2 border-0 p-0">
            <legend className="sr-only">Filter by category</legend>
            {CATEGORY_FILTERS.map((category) => {
              const active = categoryFilter === category;
              const pillStyles = FILTER_PILL_STYLES[category];
              return (
                <button
                  aria-pressed={active}
                  className={`box-border rounded-full border border-solid px-3 py-1.5 font-normal text-xs tracking-wide transition-colors duration-150 md:text-sm ${
                    active ? pillStyles.active : pillStyles.idle
                  }`}
                  key={category}
                  onClick={() => onCategoryFilter(category)}
                  type="button"
                >
                  {CATEGORY_LABELS[category]}
                </button>
              );
            })}
          </fieldset>
        </div>

        <p className="mt-2 max-w-2xl text-(--text-muted) text-sm leading-relaxed md:text-base">
          {filterLabel && introCopy ? (
            <>
              <span className="font-bold text-(--foreground)">
                {filterLabel}
              </span>
              {" work — "}
              <span className="font-bold text-(--foreground)">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? introCopy.singular : introCopy.plural}
            </>
          ) : (
            <>
              <span className="font-bold text-(--foreground)">
                {projects.length}
              </span>{" "}
              projects across{" "}
              <span className="font-bold text-(--foreground)">
                Audio Developer
              </span>
              ,{" "}
              <span className="font-bold text-(--foreground)">
                Web Developer
              </span>
              , and{" "}
              <span className="font-bold text-(--foreground)">
                Creative Technologist
              </span>{" "}
              work
            </>
          )}
        </p>
      </header>

      {filtered.length === 0 ? (
        <p className="text-(--text-muted) text-sm">
          No projects in this category.
        </p>
      ) : (
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.slug}
              layout={cardLayout(index, project.slug)}
              onHover={onHighlight}
              onSelect={onSelect}
              project={project}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
