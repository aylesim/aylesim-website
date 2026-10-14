"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import type { WorkMenuEntry } from "@/lib/work-menu";

export type SitePage = "work" | "about";

type WorkMenu = {
  entries: WorkMenuEntry[];
  projectCount: number;
  selectedSlug?: string | null;
  onSelect?: (slug: string) => void;
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
  current: SitePage;
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  children: ReactNode;
  filters?: ReactNode;
  workMenu?: WorkMenu;
}) {
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const [projectsOpen, setProjectsOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) {
      setProjectsOpen(false);
      return;
    }
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onMenuOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen, onMenuOpenChange]);

  return (
    <>
      {menuOpen ? (
        <button
          aria-label="Dismiss menu"
          className="site-menu-backdrop"
          onClick={() => onMenuOpenChange(false)}
          tabIndex={-1}
          type="button"
        />
      ) : null}
      <header className="site-header">
        <div className="site-header-bar">
          <Link
            className="site-brand"
            href="/"
            onClick={() => onMenuOpenChange(false)}
          >
            {brand}
          </Link>
          <nav aria-label="Main navigation" className="site-primary-nav">
            <Link
              aria-current={current === "work" ? "page" : undefined}
              href="/"
              onClick={() => onMenuOpenChange(false)}
            >
              Work
            </Link>
            <Link
              aria-current={current === "about" ? "page" : undefined}
              href="/about"
              onClick={() => onMenuOpenChange(false)}
            >
              About
            </Link>
            <button
              aria-controls={menuId}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="site-burger"
              onClick={() => onMenuOpenChange(!menuOpen)}
              ref={menuButtonRef}
              type="button"
            >
              <span
                aria-hidden="true"
                className={
                  menuOpen ? "site-menu-icon is-open" : "site-menu-icon"
                }
              />
              {menuOpen ? "Close" : "Menu"}
            </button>
          </nav>
        </div>
        <nav
          aria-hidden={!menuOpen}
          aria-label="Site menu"
          className={menuOpen ? "site-menu is-open" : "site-menu"}
          id={menuId}
          inert={!menuOpen}
          ref={menuRef}
        >
          <ul className="site-menu-pages">
            {[
              {
                label: "Work",
                href: "/",
                page: "work",
                description: "Projects and collaborations",
              },
              {
                label: "About",
                href: "/about",
                page: "about",
                description: "Background and practice",
              },
              {
                label: "Contact",
                href: "/about#contact",
                description: "Get in touch",
              },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  aria-current={current === item.page ? "page" : undefined}
                  className="site-menu-page"
                  href={item.href}
                  onClick={() => onMenuOpenChange(false)}
                >
                  <span className="site-menu-page-title">{item.label}</span>
                  <span className="site-menu-page-description">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {workMenu && workMenu.projectCount > 0 ? (
            <details
              className="site-menu-projects"
              onToggle={(event) => setProjectsOpen(event.currentTarget.open)}
              open={projectsOpen}
            >
              <summary>
                <span>Browse projects</span>
                <span className="site-menu-project-count">
                  {workMenu.projectCount}
                </span>
              </summary>
              <ul className="site-menu-project-list">
                {workMenu?.entries.map((entry, index) =>
                  entry.type === "heading" ? (
                    <li
                      className="site-menu-heading"
                      key={`heading-${entry.label}-${index}`}
                    >
                      {entry.label}
                    </li>
                  ) : (
                    <li className="site-menu-project" key={entry.slug}>
                      {workMenu.onSelect ? (
                        <button
                          className={
                            workMenu.selectedSlug === entry.slug
                              ? "site-menu-link is-on"
                              : "site-menu-link"
                          }
                          onClick={() => {
                            workMenu.onSelect?.(entry.slug);
                            onMenuOpenChange(false);
                          }}
                          type="button"
                        >
                          {entry.label}
                        </button>
                      ) : (
                        <Link
                          className="site-menu-link"
                          href={`/?project=${encodeURIComponent(entry.slug)}`}
                          onClick={() => onMenuOpenChange(false)}
                        >
                          {entry.label}
                        </Link>
                      )}
                    </li>
                  )
                )}
              </ul>
            </details>
          ) : null}
        </nav>
      </header>
      {filters}
      {children}
    </>
  );
}

export function PageFrame({
  brand,
  current,
  children,
  workMenu,
}: {
  brand: string;
  current: SitePage;
  children: ReactNode;
  workMenu: WorkMenu;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-page">
      <SiteChrome
        brand={brand}
        current={current}
        menuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        workMenu={workMenu}
      >
        {children}
      </SiteChrome>
    </div>
  );
}
