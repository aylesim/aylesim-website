"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";

export type SitePage = "work" | "about" | "ask-ai";

export function SiteChrome({
  brand,
  contactEmail,
  current,
  menuOpen,
  onMenuOpenChange,
  children,
  filters,
}: {
  brand: string;
  contactEmail: string;
  current: SitePage;
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  children: ReactNode;
  filters?: ReactNode;
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
            <i />
            <i />
            <i />
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
