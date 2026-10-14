"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useId, useState } from "react";
import type { WorkMenuEntry } from "@/lib/work-menu";

export type SitePage = "work" | "about" | "ask-ai";

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
    entries: WorkMenuEntry[];
    projectCount: number;
    selectedSlug: string | null;
    onSelect: (slug: string) => void;
  };
}) {
  const menuId = useId();
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

  const openMenuLabel = workMenu
    ? `Open work index, ${workMenu.projectCount} projects`
    : "Open menu";
  const openMenuText = workMenu ? `Index · ${workMenu.projectCount}` : "Index";

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
          <button
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : openMenuLabel}
            className="site-burger"
            onClick={() => onMenuOpenChange(!menuOpen)}
            type="button"
          >
            {menuOpen ? "Close" : openMenuText}
          </button>
        </div>
        <ul
          aria-hidden={!menuOpen}
          className={menuOpen ? "site-menu is-open" : "site-menu"}
          id={menuId}
          inert={!menuOpen}
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
          {workMenu?.entries.map((entry, index) =>
            entry.type === "heading" ? (
              <li
                aria-hidden="true"
                className="site-menu-heading"
                key={`heading-${entry.label}-${index}`}
              >
                {entry.label}
              </li>
            ) : (
              <li className="site-menu-project" key={entry.slug}>
                <button
                  className={
                    workMenu.selectedSlug === entry.slug
                      ? "site-menu-link is-on"
                      : "site-menu-link"
                  }
                  onClick={() => {
                    workMenu.onSelect(entry.slug);
                    onMenuOpenChange(false);
                  }}
                  type="button"
                >
                  {entry.label}
                </button>
              </li>
            )
          )}
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
