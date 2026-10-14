"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import type { WorkMenuEntry } from "@/lib/work-menu";

export type SitePage = "work" | "about" | "ask-ai";

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
  workMenu?: {
    entries: WorkMenuEntry[];
    projectCount: number;
    selectedSlug: string | null;
    onSelect: (slug: string) => void;
  };
}) {
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
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
        <ul
          aria-hidden={!menuOpen}
          className={menuOpen ? "site-menu is-open" : "site-menu"}
          id={menuId}
          inert={!menuOpen}
          ref={menuRef}
        >
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
          {workMenu ? (
            <li className="site-menu-summary">
              All projects ({workMenu.projectCount})
            </li>
          ) : null}
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
  current,
  children,
}: {
  brand: string;
  current: SitePage;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-page">
      <SiteChrome
        brand={brand}
        current={current}
        menuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
      >
        {children}
      </SiteChrome>
    </div>
  );
}
