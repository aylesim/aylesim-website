"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";

export type SitePage = "work" | "about" | "ask-ai";

export type WorkMenuProject = {
  slug: string;
  label: string;
};

export function SiteChrome({
  brand,
  contactEmail,
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
        >
          <li className="site-menu-wide">
            <Link
              aria-current={current === "work" ? "page" : undefined}
              className={
                current === "work" ? "site-menu-link is-on" : "site-menu-link"
              }
              href="/"
              onClick={() => onMenuOpenChange(false)}
            >
              Work
            </Link>
          </li>
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
          <li className="site-menu-wide">
            <Link
              aria-current={current === "ask-ai" ? "page" : undefined}
              className={
                current === "ask-ai" ? "site-menu-link is-on" : "site-menu-link"
              }
              href="/ask-ai"
              onClick={() => onMenuOpenChange(false)}
            >
              JSON
            </Link>
          </li>
          <li>
            <Link
              aria-current={current === "about" ? "page" : undefined}
              className={
                current === "about" ? "site-menu-link is-on" : "site-menu-link"
              }
              href="/about"
              onClick={() => onMenuOpenChange(false)}
            >
              About
            </Link>
          </li>
          <li>
            <a className="site-menu-link" href={`mailto:${contactEmail}`}>
              Contact
            </a>
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
      </SiteChrome>
    </div>
  );
}
