"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { ArchiveIndex } from "@/components/home/archive-index";
import type { BubbleFocus } from "@/lib/bubble-layout";
import type { SiteContent } from "@/lib/content";
import { parseLegacyProjectSlug } from "@/lib/legacy-routes";
import { CATEGORY_FILTERS, CATEGORY_LABELS } from "@/lib/roles";

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
  const [filter, setFilter] = useState<BubbleFocus>("all");

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

  const selectFilter = (next: BubbleFocus) => {
    setFilter(next);
    if (selectedSlug) {
      closeProject();
    }
  };

  const projects = useMemo(
    () => content.projects.filter((project) => project.showInMenu),
    [content.projects]
  );

  return (
    <main className="orbital-home">
      <ArchiveIndex
        focus={filter}
        onClose={closeProject}
        onSelect={openProject}
        projects={projects}
        selectedSlug={selectedSlug}
        site={content.site}
      />

      <aside
        aria-label="Portfolio navigation"
        className={
          selectedSlug ? "orbital-menu orbital-menu--quiet" : "orbital-menu"
        }
      >
        <Link className="orbital-menu-brand" href="/" onClick={closeProject}>
          {content.home.brand}
        </Link>
        <p className="orbital-menu-role">{content.home.role}</p>

        <nav aria-label="Primary" className="orbital-menu-primary">
          <button
            aria-current="page"
            className="orbital-menu-link orbital-menu-link--active"
            onClick={() => selectFilter("all")}
            type="button"
          >
            Work
          </button>
          <Link className="orbital-menu-link" href="/about">
            About
          </Link>
        </nav>

        <nav aria-label="Project collections" className="orbital-menu-filters">
          <button
            aria-pressed={filter === "all"}
            className="orbital-menu-filter"
            onClick={() => selectFilter("all")}
            type="button"
          >
            All projects <span>{projects.length}</span>
          </button>
          {CATEGORY_FILTERS.map((category) => {
            const count = projects.filter(
              (project) => project.category === category
            ).length;
            return (
              <button
                aria-pressed={filter === category}
                className="orbital-menu-filter"
                key={category}
                onClick={() => selectFilter(category)}
                type="button"
              >
                {CATEGORY_LABELS[category]} <span>{count}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </main>
  );
}
