"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { ArchiveIndex } from "@/components/home/archive-index";
import { ProjectDetail } from "@/components/home/portfolio-detail";
import { SiteHeader } from "@/components/site-header";
import type { SiteContent } from "@/lib/content";
import { parseLegacyProjectSlug } from "@/lib/legacy-routes";

function projectSlugFromSearchParams(
  searchParams: URLSearchParams
): string | null {
  const projectParam = searchParams.get("project");
  if (projectParam !== null) {
    return projectParam || null;
  }
  if (searchParams.has("projects")) {
    return null;
  }
  return parseLegacyProjectSlug(searchParams);
}

export default function ArchiveShell({ content }: { content: SiteContent }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const projectSlug = useMemo(
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

  const visibleProjects = useMemo(
    () => content.projects.filter((item) => item.showInMenu),
    [content.projects]
  );

  const showingDetail = Boolean(projectSlug);

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg">
      <SiteHeader
        active={showingDetail ? undefined : "index"}
        leading={
          showingDetail ? (
            <button
              className="text-(--text-muted) hover:text-(--foreground)"
              onClick={closeProject}
              type="button"
            >
              ← Index
            </button>
          ) : undefined
        }
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-6 md:py-10">
        {showingDetail && projectSlug ? (
          <ProjectDetail
            projects={content.projects}
            site={content.site}
            slug={projectSlug}
          />
        ) : (
          <ArchiveIndex
            home={content.home}
            onSelect={openProject}
            projects={visibleProjects}
            site={content.site}
          />
        )}
      </main>
    </div>
  );
}
