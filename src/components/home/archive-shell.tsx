"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { IntroOverlay } from "@/components/home/intro-overlay";
import { ProjectDetail } from "@/components/home/portfolio-detail";
import { TileField } from "@/components/home/tile-field";
import { SiteChrome } from "@/components/site/site-chrome";
import type { SiteContent } from "@/lib/content";
import { parseLegacyProjectSlug } from "@/lib/legacy-routes";
import {
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  type WorkFilter,
} from "@/lib/roles";
import type { TileView } from "@/lib/tile-layout";

const INTRO_KEY = "aylesim-entered";

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
  const [view, setView] = useState<TileView>("spiral");
  const [menuOpen, setMenuOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  const selectedSlug = useMemo(
    () => projectSlugFromSearchParams(searchParams),
    [searchParams]
  );

  useEffect(() => {
    if (selectedSlug) {
      setEntered(true);
      return;
    }
    try {
      setEntered(sessionStorage.getItem(INTRO_KEY) === "1");
    } catch {
      setEntered(false);
    }
  }, [selectedSlug]);

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

  const enter = () => {
    setEntered(true);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      return;
    }
  };

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

  const introLines = useMemo(
    () => [
      content.home.role,
      content.site.contactAvailability,
      content.home.location,
    ],
    [content.home.location, content.home.role, content.site.contactAvailability]
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
      >
        <TileField
          filter={filter}
          onSelect={openProject}
          projects={projects}
          selectedSlug={selectedSlug}
          view={view}
        />
        <nav aria-label="Layout" className="site-views">
          <button
            aria-label="Spiral view"
            aria-pressed={view === "spiral"}
            className={view === "spiral" ? "site-view is-on" : "site-view"}
            onClick={() => setView("spiral")}
            type="button"
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 10 9">
              <path
                d="M8 0H2v3H0v3h2v3h6V6h2V3H8V0ZM7 6V3H3v3h4Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            className={view === "grid" ? "site-view is-on" : "site-view"}
            onClick={() => setView("grid")}
            type="button"
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 9 9">
              <path
                d="M3 0H0v3h3V0Zm6 0H6v3h3V0ZM0 6h3v3H0V6Zm9 0H6v3h3V6Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </nav>
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
            <ProjectDetail
              projects={projects}
              site={content.site}
              slug={selectedProject.slug}
            />
          </div>
        </div>
      ) : null}

      {entered ? null : (
        <IntroOverlay
          brand={content.home.brand}
          lines={introLines}
          onEnter={enter}
        />
      )}
    </main>
  );
}
