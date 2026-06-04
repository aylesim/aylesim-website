import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export type SiteNavActive = "projects" | "about" | "tools" | "ask-ai";

const navItem =
  "rounded-sm px-2.5 py-1 text-sm tracking-tight transition-[color,background-color,box-shadow] duration-200 md:px-3 md:text-[0.9375rem]";

const navMuted = `${navItem} text-(--text-muted) hover:bg-surface-hover hover:text-(--foreground)`;

const navActive = `${navItem} bg-surface-subtle text-(--foreground) shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_35%,transparent)]`;

type SiteHeaderProps = {
  active?: SiteNavActive;
  leading?: ReactNode;
  onProjectsClick?: () => void;
  projectsActive?: boolean;
};

function navClass(isActive: boolean) {
  return isActive ? navActive : navMuted;
}

export function SiteHeader({
  active,
  leading,
  onProjectsClick,
  projectsActive,
}: SiteHeaderProps) {
  const projectsIsActive = active === "projects" || projectsActive === true;

  return (
    <header className="sticky top-0 z-20 shrink-0 border-(--index-divider) border-b border-dotted bg-bg/88 backdrop-blur-md supports-[backdrop-filter]:bg-bg/72">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 md:gap-x-4 md:px-5 md:py-3.5">
        {leading}
        <Link
          className="shrink-0 text-lg tracking-tight transition-colors duration-200 hover:text-(--accent) md:text-xl"
          href="/"
        >
          Aylesim
        </Link>
        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-wrap items-center gap-0.5 sm:gap-1"
        >
          <div className="flex flex-wrap items-center gap-0.5 rounded-sm border border-(--index-divider) border-dotted bg-surface-panel/60 p-0.5 sm:gap-1">
            {onProjectsClick ? (
              <button
                aria-current={projectsIsActive ? "page" : undefined}
                className={navClass(projectsIsActive)}
                onClick={onProjectsClick}
                type="button"
              >
                Projects
              </button>
            ) : (
              <Link
                aria-current={projectsIsActive ? "page" : undefined}
                className={navClass(projectsIsActive)}
                href="/?projects"
              >
                Projects
              </Link>
            )}
            <Link
              aria-current={active === "tools" ? "page" : undefined}
              className={navClass(active === "tools")}
              href="/tools"
            >
              Tools
            </Link>
            <Link
              aria-current={active === "about" ? "page" : undefined}
              className={navClass(active === "about")}
              href="/about"
            >
              About
            </Link>
            <Link
              aria-current={active === "ask-ai" ? "page" : undefined}
              className={navClass(active === "ask-ai")}
              href="/ask-ai"
            >
              Too lazy to read
            </Link>
          </div>
        </nav>
        <div className="ml-auto flex shrink-0 items-center border-(--index-divider) border-l border-dotted pl-3 md:pl-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
