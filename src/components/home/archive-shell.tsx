"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TileField } from "@/components/home/tile-field";
import { SiteChrome } from "@/components/site/site-chrome";
import { VideoPreviewDialog } from "@/components/video-preview-dialog";
import { parseLegacyProjectSlug } from "@/lib/legacy-routes";
import type { ProjectPreview } from "@/lib/project-preview";
import { projectHref, sortProjects } from "@/lib/project-routes";
import {
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  type WorkFilter,
} from "@/lib/roles";

const savedFilters = new Map<string, WorkFilter>();

export default function ArchiveShell({
  projects: entries,
  brand,
  contactEmail,
  initialFilter = "all",
  children,
}: {
  projects: ProjectPreview[];
  brand: string;
  contactEmail: string;
  initialFilter?: WorkFilter;
  children?: ReactNode;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<WorkFilter>(initialFilter);
  useEffect(() => {
    const previous = savedFilters.get(window.location.pathname);
    if (previous) {
      setFilter(previous);
    }
  }, []);
  useEffect(() => {
    savedFilters.set(window.location.pathname, filter);
  }, [filter]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const preview = entries.find((entry) => entry.slug === previewSlug);
  const projects = useMemo(
    () => sortProjects(entries.filter((project) => project.showInMenu)),
    [entries]
  );
  const openProject = useCallback(
    (slug: string) => {
      const project = projects.find((entry) => entry.slug === slug);
      if (project) {
        router.push(projectHref(project));
      }
    },
    [projects, router]
  );
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const slug =
      searchParams.get("project") ?? parseLegacyProjectSlug(searchParams);
    if (slug) {
      const project = projects.find((entry) => entry.slug === slug);
      router.replace(project ? projectHref(project) : "/about");
    }
  }, [projects, router]);
  const workMenuProjects = projects
    .filter((project) => filter === "all" || project.category === filter)
    .map((project) => ({
      slug: project.slug,
      label: project.menuLabel ?? project.title,
    }));
  return (
    <main className="site-home">
      <SiteChrome
        brand={brand}
        contactEmail={contactEmail}
        current="home"
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
                    onClick={() => setFilter(category)}
                    type="button"
                  >
                    {category === "all" ? "All" : CATEGORY_LABELS[category]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        }
        menuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        workMenu={{
          projects: workMenuProjects,
          selectedSlug: null,
          onSelect: openProject,
        }}
      >
        <TileField
          filter={filter}
          onPreview={setPreviewSlug}
          onSelect={openProject}
          projects={projects}
          selectedSlug={null}
          view="spiral"
        />
        {children}
        <footer className="stage-footer">
          <Link href="/archive">Archive</Link>
        </footer>
      </SiteChrome>
      {preview?.previewVideo ? (
        <VideoPreviewDialog
          onClose={() => setPreviewSlug(null)}
          title={preview.title}
          video={preview.previewVideo}
        />
      ) : null}
    </main>
  );
}
