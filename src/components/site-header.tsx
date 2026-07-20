import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export type SiteNavActive = "index" | "about" | "tools" | "ask-ai";

type SiteHeaderProps = {
  active?: SiteNavActive;
  leading?: ReactNode;
};

function navClass(isActive: boolean) {
  return isActive
    ? "text-(--foreground) underline underline-offset-3"
    : "text-(--text-muted) hover:text-(--foreground)";
}

export function SiteHeader({ active, leading }: SiteHeaderProps) {
  return (
    <header className="shrink-0 border-(--index-divider) border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-5 gap-y-2 px-4 py-3 md:px-6">
        {leading}
        <Link className="uppercase tracking-wide" href="/">
          Aylesim
        </Link>
        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1 text-(--text-muted)"
        >
          <Link
            aria-current={active === "index" ? "page" : undefined}
            className={navClass(active === "index")}
            href="/"
          >
            Index
          </Link>
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
            JSON
          </Link>
        </nav>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
