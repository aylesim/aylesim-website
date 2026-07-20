"use client";

import Image from "next/image";
import {
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Award, HomeContent, Project, SiteConfig } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";
import {
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  type ProjectCategory,
} from "@/lib/roles";

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
    <section aria-labelledby="awards-heading" className="archive-block">
      <h2 className="archive-block__label" id="awards-heading">
        Prizes
      </h2>
      <ul className="award-grid">
        {awards.map((award) => (
          <li
            className="award-tile"
            key={`${award.year}-${award.projectSlug}-${award.title}`}
          >
            <span className="award-tile__year">{award.year}</span>
            <button
              className="award-tile__headline"
              onClick={() => onSelect(award.projectSlug)}
              type="button"
            >
              {award.headline}
            </button>
            <p className="award-tile__meta">
              {award.title} · {award.issuer}
            </p>
            <a
              className="award-tile__source"
              href={award.externalHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Source ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectTile({
  project,
  onSelect,
  wide,
}: {
  project: Project;
  onSelect: (slug: string) => void;
  wide?: boolean;
}) {
  const cover = getProjectCover(project);

  return (
    <li className={wide ? "project-tile project-tile--wide" : "project-tile"}>
      <button
        className="project-tile__hit"
        data-project-tile
        onClick={() => onSelect(project.slug)}
        type="button"
      >
        <div aria-hidden className="project-tile__media">
          <Image
            alt=""
            className="project-tile__img"
            fill
            sizes={
              wide
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            src={cover}
          />
          <div className="project-tile__scrim" />
        </div>
        <div className="project-tile__body">
          <span className="project-tile__year">{project.year ?? "————"}</span>
          <span className="project-tile__title">{project.title}</span>
          {project.listTagline ? (
            <span className="project-tile__tagline">{project.listTagline}</span>
          ) : null}
        </div>
      </button>
    </li>
  );
}

function IndexSection({
  category,
  projects,
  onSelect,
}: {
  category: ProjectCategory;
  projects: Project[];
  onSelect: (slug: string) => void;
}) {
  if (projects.length === 0) {
    return null;
  }

  const headingId = `index-${category}`;

  return (
    <section aria-labelledby={headingId} className="archive-block">
      <h3 className="archive-block__label" id={headingId}>
        {CATEGORY_LABELS[category]}
      </h3>
      <ul className="project-grid">
        {projects.map((project, index) => (
          <ProjectTile
            key={project.slug}
            onSelect={onSelect}
            project={project}
            wide={index % 5 === 0}
          />
        ))}
      </ul>
    </section>
  );
}

function groupByCategory(projects: Project[]) {
  const grouped = Object.fromEntries(
    CATEGORY_FILTERS.map((category) => [category, [] as Project[]])
  ) as Record<ProjectCategory, Project[]>;

  const uncategorized: Project[] = [];

  for (const project of projects) {
    if (project.category) {
      grouped[project.category].push(project);
    } else {
      uncategorized.push(project);
    }
  }

  return { grouped, uncategorized };
}

function useScrollHeat(containerRef: RefObject<HTMLElement | null>) {
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  const update = useCallback(() => {
    rafRef.current = null;
    const root = containerRef.current;
    if (!root) {
      return;
    }

    const tiles = root.querySelectorAll<HTMLElement>("[data-project-tile]");
    const vh = window.innerHeight;
    const viewCenter = vh * 0.48;
    const range = vh * 0.42;

    for (const tile of tiles) {
      const rect = tile.getBoundingClientRect();
      const tileCenter = rect.top + rect.height / 2;
      const dist = Math.abs(tileCenter - viewCenter);
      let hot = Math.max(0, 1 - dist / range);

      if (reducedMotion.current) {
        hot = rect.top < vh && rect.bottom > 0 ? 1 : 0.35;
      } else {
        hot **= 1.15;
      }

      tile.style.setProperty("--hot", hot.toFixed(3));
      tile.dataset.active = hot > 0.55 ? "true" : "false";
    }
  }, [containerRef]);

  const schedule = useCallback(() => {
    if (rafRef.current !== null) {
      return;
    }
    rafRef.current = window.requestAnimationFrame(update);
  }, [update]);

  useLayoutEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    schedule();
  }, [schedule]);

  useEffect(() => {
    const onScroll = () => schedule();
    const onResize = () => schedule();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    schedule();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [schedule]);
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
  const { grouped, uncategorized } = groupByCategory(projects);
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useScrollHeat(rootRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={mounted ? "archive-index is-ready" : "archive-index"}
      ref={rootRef}
    >
      <header className="archive-hero">
        <p className="archive-hero__eyebrow">Archive / Index</p>
        <h1 className="archive-hero__name">{home.name}</h1>
        <p className="archive-hero__meta">
          {home.role}
          <span aria-hidden className="archive-hero__slash">
            /
          </span>
          {home.location}
        </p>
      </header>

      <AwardsList awards={site.awards} onSelect={onSelect} />

      <section aria-labelledby="index-heading" className="archive-index__body">
        <h2 className="archive-block__label" id="index-heading">
          Index
        </h2>

        <div className="archive-index__sections">
          {CATEGORY_FILTERS.map((category) => (
            <IndexSection
              category={category}
              key={category}
              onSelect={onSelect}
              projects={grouped[category]}
            />
          ))}

          {uncategorized.length > 0 ? (
            <section aria-labelledby="index-other" className="archive-block">
              <h3 className="archive-block__label" id="index-other">
                Other
              </h3>
              <ul className="project-grid">
                {uncategorized.map((project, index) => (
                  <ProjectTile
                    key={project.slug}
                    onSelect={onSelect}
                    project={project}
                    wide={index % 5 === 0}
                  />
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </section>

      <footer className="archive-footer">
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
