"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { DraggableCanvas } from "@/components/home/draggable-canvas";
import {
  AboutInlineContent,
  ProjectDetail,
} from "@/components/home/portfolio-detail";
import type { SiteContent } from "@/lib/content";
import { mentionLinks } from "@/lib/site";

function parseLegacySel(sp: URLSearchParams): {
  aboutOpen: boolean;
  projectSlug: string | null;
} {
  const raw = sp.get("sel");
  if (!raw) {
    return { aboutOpen: false, projectSlug: null };
  }
  const decoded = decodeURIComponent(raw);
  if (decoded === "about" || decoded === "contact" || decoded === "elsewhere") {
    return { aboutOpen: true, projectSlug: null };
  }
  const colon = decoded.indexOf(":");
  if (colon <= 0) {
    return { aboutOpen: false, projectSlug: null };
  }
  const prefix = decoded.slice(0, colon);
  const slug = decoded.slice(colon + 1);
  if (!slug) {
    return { aboutOpen: false, projectSlug: null };
  }
  if (prefix === "project" || prefix === "work" || prefix === "device") {
    return { aboutOpen: false, projectSlug: slug };
  }
  if (prefix === "info") {
    return { aboutOpen: true, projectSlug: null };
  }
  return { aboutOpen: false, projectSlug: null };
}

function MenuSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-3 border-(--index-divider) border-t border-dotted pt-3 first:mt-0 first:border-t-0 first:pt-0">
      <div className="py-0.5 font-normal text-(--text-muted) text-sm leading-snug">
        {label}
      </div>
      <ul className="m-0 mt-0.5 flex list-none flex-col divide-y divide-dotted divide-(--index-divider) border-(--index-divider) border-t border-dotted p-0 pt-0.5">
        {children}
      </ul>
    </div>
  );
}

function MenuItem({
  title,
  active,
  onClick,
  tag,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
  tag?: string;
}) {
  return (
    <li className="py-0.5 first:pt-0">
      <button
        className={`flex w-full flex-wrap items-baseline gap-x-1.5 gap-y-0 py-0.5 pl-4 text-left font-normal text-sm leading-snug transition-colors ${
          active
            ? "text-(--foreground)"
            : "text-(--text-muted) hover:text-(--foreground)"
        }`}
        onClick={onClick}
        type="button"
      >
        <span>{title}</span>
        {tag ? (
          <span className="shrink-0 font-normal text-(--foreground)/45 text-[10px] tracking-wide">
            {tag}
          </span>
        ) : null}
      </button>
    </li>
  );
}

function MentionLinkItem({ href, label }: { href: string; label: string }) {
  return (
    <li className="py-0.5 first:pt-0">
      <a
        className="flex w-full py-0.5 pl-4 text-left font-normal text-(--text-muted) text-sm leading-snug transition-colors hover:text-(--foreground)"
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
    const aboutParam = searchParams.get("about");
    const projectParam = searchParams.get("project");
    if (aboutParam !== null || projectParam !== null) {
      return {
        aboutOpen: aboutParam === "1" || aboutParam === "true",
        projectSlug: projectParam || null,
      };
    }
    return parseLegacySel(searchParams);
  }, [searchParams]);

  const setState = useCallback(
    (next: { aboutOpen: boolean; projectSlug: string | null }) => {
      const q = new URLSearchParams();
      if (next.aboutOpen) {
        q.set("about", "1");
      }
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

  const urlAboutOpen = state.aboutOpen;
  const [panelOpen, setPanelOpen] = useState(urlAboutOpen);
  const [panelHeight, setPanelHeight] = useState(0);
  const [readyToAnimate, setReadyToAnimate] = useState(false);
  const panelContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPanelOpen(urlAboutOpen);
  }, [urlAboutOpen]);

  useEffect(() => {
    const el = panelContentRef.current;
    if (!el) {
      return;
    }
    const updateHeight = () => setPanelHeight(el.scrollHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    setReadyToAnimate(true);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanelOpen(false);
        setState({ aboutOpen: false, projectSlug: null });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setState]);

  const toggleAbout = useCallback(() => {
    const next = !panelOpen;
    setPanelOpen(next);
    setState({
      aboutOpen: next,
      projectSlug: state.projectSlug,
    });
  }, [panelOpen, setState, state.projectSlug]);

  const pickProject = useCallback(
    (slug: string) => {
      setState({
        aboutOpen: state.aboutOpen,
        projectSlug: state.projectSlug === slug ? null : slug,
      });
    },
    [setState, state.aboutOpen, state.projectSlug]
  );

  const visibleProjects = useMemo(
    () => content.projects.filter((item) => item.showInMenu),
    [content.projects]
  );

  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 px-4 pt-8 pb-4 md:px-5 md:pt-8 md:pb-4">
        <Link className="text-lg tracking-tight md:text-xl" href="/">
          Aylesim
        </Link>
        <button
          className={`text-lg tracking-tight transition-colors md:text-xl ${
            panelOpen
              ? "text-(--foreground)"
              : "text-(--text-muted) hover:text-(--foreground)"
          }`}
          onClick={toggleAbout}
          type="button"
        >
          about
        </button>
      </header>
      <div
        className={`shrink-0 overflow-hidden ${
          readyToAnimate ? "transition-[height] duration-420 ease-in-out" : ""
        }`}
        style={{
          height: panelOpen ? `${panelHeight}px` : "0px",
        }}
      >
        <div
          aria-hidden={!panelOpen}
          className="overflow-hidden"
          inert={!panelOpen}
          ref={panelContentRef}
        >
          <div className="border-(--index-divider) border-t border-b border-dotted px-4 py-5 md:px-5">
            <AboutInlineContent about={content.about} />
          </div>
        </div>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1">
        <aside className="flex h-full min-h-0 w-[min(100%,20rem)] shrink-0 flex-col px-4 pt-2 pb-5 md:w-[24rem] md:min-w-88 md:px-5 md:pt-2">
          <nav
            aria-label="Site"
            className="flex min-h-0 flex-1 flex-col overflow-y-auto"
          >
            <MenuSection label="Projects">
              {visibleProjects.map((item) => {
                return (
                  <MenuItem
                    active={state.projectSlug === item.slug}
                    key={item.slug}
                    onClick={() => pickProject(item.slug)}
                    tag={item.menuLabel}
                    title={item.title}
                  />
                );
              })}
            </MenuSection>
            <MenuSection label="Mentions">
              {mentionLinks.map((item) => (
                <MentionLinkItem
                  href={item.href}
                  key={item.href}
                  label={item.label}
                />
              ))}
            </MenuSection>
          </nav>
        </aside>

        <main
          className={`relative min-h-0 min-w-0 flex-1 ${
            state.projectSlug ? "overflow-y-auto" : "overflow-hidden"
          }`}
        >
          {state.projectSlug ? (
            <div className="mx-auto w-full max-w-5xl px-6 py-10 md:px-10 md:py-12">
              <ProjectDetail
                projects={content.projects}
                slug={state.projectSlug}
              />
            </div>
          ) : (
            <DraggableCanvas
              onProjectClick={pickProject}
              projects={visibleProjects}
            />
          )}
        </main>
      </div>
    </div>
  );
}
