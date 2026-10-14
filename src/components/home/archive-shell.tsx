"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { ProjectDetail } from "@/components/home/portfolio-detail";
import { TileField } from "@/components/home/tile-field";
import { SiteChrome } from "@/components/site/site-chrome";
import type { SiteContent } from "@/lib/content";
import { parseLegacyProjectSlug } from "@/lib/legacy-routes";
import { projectHref } from "@/lib/project-routes";
import {
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  type WorkFilter,
} from "@/lib/roles";

function projectSlugFromSearchParams(
  searchParams: URLSearchParams
): string | null {
  const projectParam = searchParams.get("project");
  if (projectParam !== null) {
    return projectParam || null;
  }
  return parseLegacyProjectSlug(searchParams);
}

export default function ArchiveShell({ content }: { content: SiteContent }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [filter, setFilter] = useState<WorkFilter>("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedSlug = useMemo(
    () => projectSlugFromSearchParams(searchParams),
    [searchParams]
  );

  const openProject = useCallback(
    (slug: string) => {
      startTransition(() => {
        router.replace(`/?project=${slug}`, { scroll: false });
      });
    },
    [router]
  );

  const closeProject = useCallback(() => {
    startTransition(() => {
      router.replace("/", { scroll: false });
    });
  }, [router]);

  useEffect(() => {
    if (!selectedSlug) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProject();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProject, selectedSlug]);

  const selectFilter = (next: WorkFilter) => {
    setFilter((current) => (current === next ? "all" : next));
    if (selectedSlug) {
      closeProject();
    }
  };

  const projects = useMemo(
    () => content.projects.filter((project) => project.showInMenu),
    [content.projects]
  );

  const workMenuProjects = useMemo(
    () =>
      projects
        .filter((project) => filter === "all" || project.category === filter)
        .map((project) => ({
          slug: project.slug,
          label: project.menuLabel ?? project.title,
        })),
    [filter, projects]
  );

  const selectedProject = selectedSlug
    ? projects.find((project) => project.slug === selectedSlug)
    : null;

  return (
    <main className="site-home">
      <SiteChrome
        brand={content.home.brand}
        contactEmail={content.site.contactEmail}
        current="work"
        filters={
          <nav aria-label="Project collections" className="site-filters">
            <ul>
              {CATEGORY_FILTERS.map((category) => (
                <li key={category}>
                  <button
                    aria-pressed={filter === category}
                    className={
                      filter === category ? "site-filter is-on" : "site-filter"
                    }
                    onClick={() => selectFilter(category)}
                    type="button"
                  >
                    {CATEGORY_LABELS[category]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        }
        menuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        workMenu={{
          onSelect: openProject,
          projects: workMenuProjects,
          selectedSlug,
        }}
      >
        <TileField
          filter={filter}
          onSelect={openProject}
          projects={projects}
          selectedSlug={selectedSlug}
          view="spiral"
        />
      </SiteChrome>

      {selectedProject ? (
        <div className="site-detail">
          <button
            aria-label="Close project"
            className="site-detail-close"
            onClick={closeProject}
            type="button"
          >
            Close
          </button>
          <div className="site-detail-body">
            <Link className="about-chip" href={projectHref(selectedProject)}>
              Open project page
            </Link>
            <ProjectDetail
              projects={projects}
              site={content.site}
              slug={selectedProject.slug}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
