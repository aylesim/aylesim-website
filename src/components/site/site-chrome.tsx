"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { withoutNeeds } from "@/lib/needs";
import type { WorkMenuEntry } from "@/lib/work-menu";

export type SitePage =
  | "home"
  | "work"
  | "instruments"
  | "art"
  | "about"
  | "contact"
  | "archive";

export type WorkMenu = {
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
  const menuProjects =
    workMenu?.entries.filter((entry) => entry.type === "project") ?? [];
  useEffect(() => {
    if (!menuOpen) {
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
          aria-label="Dismiss project list"
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
              aria-current={current === "about" ? "page" : undefined}
              href="/about"
              onClick={() => onMenuOpenChange(false)}
            >
              About
            </Link>
            <button
              aria-controls={menuId}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close project list" : "Open project list"}
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
              {menuOpen ? "Close" : "List"}
            </button>
          </nav>
        </div>
        <nav
          aria-hidden={!menuOpen}
          aria-label="Project list"
          className={menuOpen ? "site-menu is-open" : "site-menu"}
          id={menuId}
          inert={!menuOpen}
          ref={menuRef}
        >
          <div className="project-list-header">
            <h2>Projects</h2>
            <span className="site-menu-project-count">
              {menuProjects.length}
            </span>
          </div>
          <ul className="site-menu-project-list">
            {menuProjects.map((entry) => (
              <li className="site-menu-project" key={entry.slug}>
                {workMenu?.onSelect ? (
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
                    {withoutNeeds(entry.label) || "Untitled project"}
                  </button>
                ) : (
                  <Link
                    className="site-menu-link"
                    href={entry.href}
                    onClick={() => onMenuOpenChange(false)}
                  >
                    {withoutNeeds(entry.label) || "Untitled project"}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
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
  workMenu,
}: {
  brand: string;
  current: SitePage;
  children: ReactNode;
  contactEmail: string;
  workMenu?: WorkMenu;
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
        <footer className="page-footer" id="contact">
          <Link href="/archive">Archive</Link>
          <a href={`mailto:${contactEmail}`}>Email</a>
          <span>Berlin</span>
        </footer>
      </SiteChrome>
    </div>
  );
}
