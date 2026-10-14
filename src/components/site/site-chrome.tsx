"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";

export type SitePage =
  | "home"
  | "work"
  | "instruments"
  | "art"
  | "about"
  | "contact"
  | "archive"
  | "ask-ai";

export type WorkMenuProject = {
  slug: string;
  label: string;
};

export function SiteChrome({
  brand,
  current,
  menuOpen,
  onMenuOpenChange,
  children,
  filters,
  workMenu,
}: {
  brand: string;
  contactEmail: string;
  current: SitePage;
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  children: ReactNode;
  filters?: ReactNode;
  workMenu?: {
    projects: WorkMenuProject[];
    selectedSlug: string | null;
    onSelect: (slug: string) => void;
  };
}) {
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onMenuOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, onMenuOpenChange]);

  return (
    <>
      <header className="site-header">
        <div className="site-header-bar">
          <Link
            className="site-brand"
            href="/"
            onClick={() => onMenuOpenChange(false)}
          >
            {brand}
          </Link>
          <button
            aria-controls="site-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="site-burger"
            onClick={() => onMenuOpenChange(!menuOpen)}
            type="button"
          >
            {menuOpen ? "Close" : "Index"}
          </button>
        </div>
        <ul
          aria-hidden={!menuOpen}
          className={menuOpen ? "site-menu is-open" : "site-menu"}
          id="site-menu"
          inert={!menuOpen}
        >
          {(["work", "instruments", "art", "about", "contact"] as const).map(
            (page) => (
              <li className="site-menu-wide" key={page}>
                <Link
                  aria-current={current === page ? "page" : undefined}
                  className={
                    current === page ? "site-menu-link is-on" : "site-menu-link"
                  }
                  href={`/${page}`}
                  onClick={() => onMenuOpenChange(false)}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              </li>
            )
          )}
          {workMenu?.projects.map((project) => (
            <li className="site-menu-project" key={project.slug}>
              <button
                className={
                  workMenu.selectedSlug === project.slug
                    ? "site-menu-link is-on"
                    : "site-menu-link"
                }
                onClick={() => {
                  workMenu.onSelect(project.slug);
                  onMenuOpenChange(false);
                }}
                type="button"
              >
                {project.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              className="site-menu-link"
              href="/archive"
              onClick={() => onMenuOpenChange(false)}
            >
              Archive
            </Link>
          </li>
        </ul>
      </header>
      {filters}
      {children}
    </>
  );
}

export function PageFrame({
  brand,
  contactEmail,
  current,
  children,
}: {
  brand: string;
  contactEmail: string;
  current: SitePage;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-page">
      <SiteChrome
        brand={brand}
        contactEmail={contactEmail}
        current={current}
        menuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
      >
        {children}
        <footer className="page-footer">
          <Link href="/archive">Archive</Link>
          <a href={`mailto:${contactEmail}`}>Email</a>
          <span>Berlin, EU citizen</span>
        </footer>
      </SiteChrome>
    </div>
  );
}
