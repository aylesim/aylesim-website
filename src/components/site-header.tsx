import Link from "next/link";
import type { ReactNode } from "react";

export type SiteNavActive = "projects" | "about" | "tools" | "ask-ai";

const mutedLink =
  "text-(--text-muted) text-sm tracking-tight transition-colors hover:text-(--foreground) md:text-base";

const activeLink = "text-sm tracking-tight md:text-base";

interface SiteHeaderProps {
  active?: SiteNavActive;
  leading?: ReactNode;
  onProjectsClick?: () => void;
  projectsActive?: boolean;
}

export function SiteHeader({
  active,
  leading,
  onProjectsClick,
  projectsActive,
}: SiteHeaderProps) {
  const projectsIsActive = active === "projects" || projectsActive;

  return (
    <header className="sticky top-0 z-20 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-(--index-divider) border-b border-dotted bg-bg px-4 pt-5 pb-3 md:px-5 md:pt-6 md:pb-4">
      {leading}
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
      >
        <Link className="text-lg tracking-tight md:text-xl" href="/">
          Aylesim
        </Link>
        {onProjectsClick ? (
          <button
            className={`text-sm tracking-tight transition-colors md:text-base ${
              projectsIsActive
                ? activeLink
                : `${mutedLink} hover:text-(--foreground)`
            }`}
            onClick={onProjectsClick}
            type="button"
          >
            Projects
          </button>
        ) : (
          <Link
            className={projectsIsActive ? activeLink : mutedLink}
            href="/?projects"
          >
            Projects
          </Link>
        )}
        <Link
          className={active === "tools" ? activeLink : mutedLink}
          href="/tools"
        >
          Tools
        </Link>
        <Link
          className={active === "about" ? activeLink : mutedLink}
          href="/about"
        >
          About
        </Link>
        <Link
          className={active === "ask-ai" ? activeLink : mutedLink}
          href="/ask-ai"
        >
          Too lazy to read
        </Link>
      </nav>
    </header>
  );
}
