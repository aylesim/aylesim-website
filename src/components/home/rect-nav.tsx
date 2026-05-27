"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { HomeIdentity } from "@/components/home/home-identity";
import { ProjectDetail } from "@/components/home/portfolio-detail";
import { ProjectsIndex } from "@/components/home/projects-index";
import type { SiteContent } from "@/lib/content";
import { parseLegacyProjectSlug } from "@/lib/legacy-routes";
import {
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  type ProjectCategory,
  ROLE_STYLES,
} from "@/lib/roles";

function MenuSection({
  label,
  children,
  accent,
}: {
  label: string;
  children: ReactNode;
  accent?: ProjectCategory;
}) {
  const labelClass = accent
    ? ROLE_STYLES[accent].labelClass
    : "text-(--text-muted)";
  const borderClass = accent
    ? `border-t-2 border-solid ${ROLE_STYLES[accent].borderClass}`
    : "border-t border-dotted border-(--index-divider)";
  const firstSectionClass = accent
    ? "first:pt-3"
    : "first:border-t-0 first:pt-0";
  return (
    <div className={`mt-3 pt-3 first:mt-0 ${firstSectionClass} ${borderClass}`}>
      <div className={`py-0.5 font-normal text-sm leading-snug ${labelClass}`}>
        {label}
      </div>
      <ul className="m-0 mt-0.5 flex list-none flex-col divide-y divide-dotted divide-(--index-divider) border-(--index-divider) border-t border-dotted p-0 pt-0.5">
        {children}
      </ul>
    </div>
  );
}

function menuItemMeta(project: { year?: string; menuLabel?: string }) {
  const parts = [project.year, project.menuLabel].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

function MenuItem({
  title,
  active,
  highlighted,
  dimmed,
  onClick,
  onHover,
  tag,
  subtitle,
  accent,
}: {
  title: string;
  active: boolean;
  highlighted?: boolean;
  dimmed?: boolean;
  onClick: () => void;
  onHover?: (hovering: boolean) => void;
  tag?: string;
  subtitle?: string;
  accent?: ProjectCategory;
}) {
  const accentStyles = accent ? ROLE_STYLES[accent] : null;
  let buttonClass =
    "flex w-full flex-wrap items-baseline gap-x-1.5 gap-y-0 border-l-2 border-transparent py-1.5 pl-4 text-left font-normal text-sm leading-snug transition-colors md:py-0.5 ";
  if (active && accentStyles) {
    buttonClass += accentStyles.activeItemClass;
  } else if (active) {
    buttonClass += "text-(--foreground)";
  } else if (highlighted && accentStyles) {
    buttonClass += `${accentStyles.activeItemClass} opacity-100`;
  } else if (highlighted) {
    buttonClass += "border-l-(--accent) pl-3.5 text-(--foreground)";
  } else if (accentStyles) {
    buttonClass += `text-(--text-muted) ${accentStyles.hoverClass}`;
  } else {
    buttonClass += "text-(--text-muted) hover:text-(--foreground)";
  }
  return (
    <li className={`py-1 first:pt-0 md:py-0.5 ${dimmed ? "opacity-35" : ""}`}>
      <button
        className={buttonClass}
        onClick={onClick}
        onMouseEnter={() => onHover?.(true)}
        onMouseLeave={() => onHover?.(false)}
        type="button"
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
            <span>{title}</span>
            {tag ? (
              <span className="shrink-0 font-normal text-(--foreground)/45 text-[10px] tracking-wide">
                {tag}
              </span>
            ) : null}
          </span>
          {subtitle ? (
            <span className="text-(--foreground)/45 text-sm leading-relaxed md:text-base">
              {subtitle}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  );
}

type NavMode = "home" | "projects" | "project";

function navStateFromSearchParams(searchParams: URLSearchParams): {
  mode: NavMode;
  projectSlug: string | null;
} {
  if (searchParams.has("projects")) {
    return { mode: "projects", projectSlug: null };
  }
  const projectParam = searchParams.get("project");
  if (projectParam !== null) {
    if (!projectParam) {
      return { mode: "projects", projectSlug: null };
    }
    return { mode: "project", projectSlug: projectParam };
  }
  const legacySlug = parseLegacyProjectSlug(searchParams);
  if (legacySlug) {
    return { mode: "project", projectSlug: legacySlug };
  }
  return { mode: "home", projectSlug: null };
}

export default function RectNav({ content }: { content: SiteContent }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | null>(
    null
  );

  const state = useMemo(
    () => navStateFromSearchParams(searchParams),
    [searchParams]
  );

  const setState = useCallback(
    (next: { mode: NavMode; projectSlug?: string | null }) => {
      const q = new URLSearchParams();
      if (next.mode === "project" && next.projectSlug) {
        q.set("project", next.projectSlug);
      } else if (next.mode === "projects") {
        q.set("projects", "");
      }
      startTransition(() => {
        const qs = q.toString();
        router.replace(qs ? `/?${qs}` : "/", {
          scroll: false,
        });
      });
    },
    [router]
  );

  const showSidebar = state.mode !== "home";
  const showDetail = state.mode === "project" && state.projectSlug !== null;

  useEffect(() => {
    if (state.mode !== "projects") {
      setHighlightedSlug(null);
      setCategoryFilter(null);
    }
  }, [state.mode]);

  const toggleCategoryFilter = useCallback((category: ProjectCategory) => {
    setCategoryFilter((current) => (current === category ? null : category));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setState({ mode: "home" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setState]);

  const goBack = useCallback(() => {
    if (state.mode === "project" && state.projectSlug) {
      setState({ mode: "projects" });
      return;
    }
    setState({ mode: "home" });
  }, [setState, state.mode, state.projectSlug]);

  const pickProject = useCallback(
    (slug: string) => {
      if (state.mode === "project" && state.projectSlug === slug) {
        setState({ mode: "projects" });
        return;
      }
      setState({ mode: "project", projectSlug: slug });
    },
    [setState, state.mode, state.projectSlug]
  );

  const visibleProjects = useMemo(
    () => content.projects.filter((item) => item.showInMenu),
    [content.projects]
  );

  const projectsByCategory = useMemo(() => {
    const grouped = Object.fromEntries(
      CATEGORY_FILTERS.map((category) => [
        category,
        [] as typeof visibleProjects,
      ])
    ) as Record<ProjectCategory, typeof visibleProjects>;

    for (const project of visibleProjects) {
      if (project.category) {
        grouped[project.category].push(project);
      }
    }

    return grouped;
  }, [visibleProjects]);

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg">
      <header className="sticky top-0 z-20 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-(--index-divider) border-b border-dotted bg-bg px-4 pt-5 pb-3 md:px-5 md:pt-6 md:pb-4">
        {showSidebar && (
          <button
            className="text-(--text-muted) text-lg tracking-tight transition-colors hover:text-(--foreground) md:hidden"
            onClick={goBack}
            type="button"
          >
            ←
          </button>
        )}
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
        >
          <Link className="text-lg tracking-tight md:text-xl" href="/">
            Aylesim
          </Link>
          <button
            className={`text-sm tracking-tight transition-colors md:text-base ${
              showSidebar
                ? "text-(--foreground)"
                : "text-(--text-muted) hover:text-(--foreground)"
            }`}
            onClick={() => setState({ mode: "projects" })}
            type="button"
          >
            Projects
          </button>
          <Link
            className="text-(--text-muted) text-sm tracking-tight transition-colors hover:text-(--foreground) md:text-base"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-(--text-muted) text-sm tracking-tight transition-colors hover:text-(--foreground) md:text-base"
            href="/ask-ai"
          >
            Too lazy to read
          </Link>
        </nav>
      </header>

      <div
        className={`flex min-w-0 flex-1 flex-col ${
          showSidebar ? "md:flex-row" : ""
        }`}
      >
        {showSidebar && (
          <aside
            className={`w-full flex-col px-4 pt-5 pb-5 md:sticky md:top-20 md:max-h-[calc(100dvh-5rem)] md:w-[24rem] md:min-w-88 md:flex-none md:px-5 ${
              state.mode === "projects" ? "flex md:flex" : "hidden md:flex"
            }`}
          >
            <nav aria-label="Site" className="flex flex-col overflow-y-auto">
              {CATEGORY_FILTERS.map((category) => {
                const items = projectsByCategory[category];
                if (items.length === 0) {
                  return null;
                }
                return (
                  <MenuSection
                    accent={category}
                    key={category}
                    label={CATEGORY_LABELS[category]}
                  >
                    {items.map((item) => (
                      <MenuItem
                        accent={category}
                        active={state.projectSlug === item.slug}
                        dimmed={
                          categoryFilter !== null && categoryFilter !== category
                        }
                        highlighted={highlightedSlug === item.slug}
                        key={item.slug}
                        onClick={() => pickProject(item.slug)}
                        onHover={(hovering) =>
                          setHighlightedSlug(hovering ? item.slug : null)
                        }
                        subtitle={item.listTagline}
                        tag={menuItemMeta(item)}
                        title={item.title}
                      />
                    ))}
                  </MenuSection>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="relative min-w-0 flex-1">
          {showDetail && state.projectSlug && (
            <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-10 md:py-12">
              <ProjectDetail
                projects={content.projects}
                slug={state.projectSlug}
              />
            </div>
          )}
          {state.mode === "home" && (
            <HomeIdentity
              onProjectClick={pickProject}
              projects={content.projects}
            />
          )}
          {state.mode === "projects" && (
            <ProjectsIndex
              categoryFilter={categoryFilter}
              onCategoryFilter={toggleCategoryFilter}
              onHighlight={setHighlightedSlug}
              onSelect={pickProject}
              projects={visibleProjects}
            />
          )}
        </main>
      </div>
    </div>
  );
}
