"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useTransition,
} from "react";
import { HomeIdentity } from "@/components/home/home-identity";
import { ProjectDetail } from "@/components/home/portfolio-detail";
import type { SiteContent } from "@/lib/content";
import { pressMentions, primaryAward } from "@/lib/credentials";
import { parseLegacyProjectSlug } from "@/lib/legacy-routes";
import { type ProjectCategory, ROLE_STYLES } from "@/lib/roles";
import { hireAvailabilityShort } from "@/lib/site";

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
  return (
    <div
      className={`mt-3 pt-3 first:mt-0 first:border-t-0 first:pt-0 ${borderClass}`}
    >
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
  onClick,
  tag,
  subtitle,
  accent,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
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
  } else if (accentStyles) {
    buttonClass += `text-(--text-muted) ${accentStyles.hoverClass}`;
  } else {
    buttonClass += "text-(--text-muted) hover:text-(--foreground)";
  }
  return (
    <li className="py-1 first:pt-0 md:py-0.5">
      <button className={buttonClass} onClick={onClick} type="button">
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

function MentionLinkItem({ href, label }: { href: string; label: string }) {
  return (
    <li className="py-1 first:pt-0 md:py-0.5">
      <a
        className="flex w-full py-1.5 pl-4 text-left font-normal text-(--text-muted) text-sm leading-snug transition-colors hover:text-(--foreground) md:py-0.5"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {label}
      </a>
    </li>
  );
}

export default function RectNav({ content }: { content: SiteContent }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const state = useMemo(() => {
    const projectParam = searchParams.get("project");
    if (projectParam !== null) {
      return { projectSlug: projectParam || null };
    }
    return { projectSlug: parseLegacyProjectSlug(searchParams) };
  }, [searchParams]);

  const setState = useCallback(
    (next: { projectSlug: string | null }) => {
      const q = new URLSearchParams();
      if (next.projectSlug) {
        q.set("project", next.projectSlug);
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setState({ projectSlug: null });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setState]);

  const pickProject = useCallback(
    (slug: string) => {
      setState({
        projectSlug: state.projectSlug === slug ? null : slug,
      });
    },
    [setState, state.projectSlug]
  );

  const visibleProjects = useMemo(
    () => content.projects.filter((item) => item.showInMenu),
    [content.projects]
  );

  const audioProjects = useMemo(
    () => visibleProjects.filter((p) => p.category === "audio"),
    [visibleProjects]
  );
  const webProjects = useMemo(
    () => visibleProjects.filter((p) => p.category === "web"),
    [visibleProjects]
  );
  const creativeProjects = useMemo(
    () => visibleProjects.filter((p) => p.category === "creative"),
    [visibleProjects]
  );

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col">
      <header className="sticky top-0 z-20 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-(--index-divider) border-b border-dotted bg-(--bg)/92 px-4 pt-5 pb-3 backdrop-blur-sm md:px-5 md:pt-6 md:pb-4">
        {state.projectSlug && (
          <button
            className="text-(--text-muted) text-lg tracking-tight transition-colors hover:text-(--foreground) md:hidden"
            onClick={() => setState({ projectSlug: null })}
            type="button"
          >
            ←
          </button>
        )}
        <Link className="text-lg tracking-tight md:text-xl" href="/">
          Aylesim
        </Link>
        <Link
          className="text-(--text-muted) text-lg tracking-tight transition-colors hover:text-(--foreground) md:text-xl"
          href="/about"
        >
          about
        </Link>
        <span className="ml-auto font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
          {hireAvailabilityShort}
        </span>
      </header>

      <div
        className={`flex min-w-0 flex-1 flex-col ${
          state.projectSlug ? "md:flex-row" : ""
        }`}
      >
        {state.projectSlug && (
          <aside className="hidden w-full flex-col px-4 pt-5 pb-5 md:sticky md:top-20 md:flex md:max-h-[calc(100dvh-5rem)] md:w-[24rem] md:min-w-88 md:flex-none md:px-5">
            <nav aria-label="Site" className="flex flex-col overflow-y-auto">
              {audioProjects.length > 0 && (
                <MenuSection accent="audio" label="Audio Developer">
                  {audioProjects.map((item) => (
                    <MenuItem
                      accent="audio"
                      active={state.projectSlug === item.slug}
                      key={item.slug}
                      onClick={() => pickProject(item.slug)}
                      subtitle={item.listTagline}
                      tag={menuItemMeta(item)}
                      title={item.title}
                    />
                  ))}
                </MenuSection>
              )}
              {webProjects.length > 0 && (
                <MenuSection accent="web" label="Web Developer">
                  {webProjects.map((item) => (
                    <MenuItem
                      accent="web"
                      active={state.projectSlug === item.slug}
                      key={item.slug}
                      onClick={() => pickProject(item.slug)}
                      subtitle={item.listTagline}
                      tag={menuItemMeta(item)}
                      title={item.title}
                    />
                  ))}
                </MenuSection>
              )}
              {creativeProjects.length > 0 && (
                <MenuSection accent="creative" label="Creative Technologist">
                  {creativeProjects.map((item) => (
                    <MenuItem
                      accent="creative"
                      active={state.projectSlug === item.slug}
                      key={item.slug}
                      onClick={() => pickProject(item.slug)}
                      subtitle={item.listTagline}
                      tag={menuItemMeta(item)}
                      title={item.title}
                    />
                  ))}
                </MenuSection>
              )}
              <MenuSection label="Recognition">
                <MentionLinkItem
                  href={primaryAward.externalHref}
                  label={`MUR · ${primaryAward.headline}`}
                />
                {pressMentions.map((item) => (
                  <MentionLinkItem
                    href={item.href}
                    key={item.href}
                    label={`${item.outlet} — ${item.title}`}
                  />
                ))}
              </MenuSection>
            </nav>
          </aside>
        )}

        <main className="relative min-w-0 flex-1">
          {state.projectSlug && (
            <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-10 md:py-12">
              <ProjectDetail
                projects={content.projects}
                slug={state.projectSlug}
              />
            </div>
          )}
          {!state.projectSlug && (
            <HomeIdentity
              about={content.about}
              onProjectClick={pickProject}
              projects={content.projects}
            />
          )}
        </main>
      </div>
    </div>
  );
}
