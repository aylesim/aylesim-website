"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Glass, SearchField } from "open-glass-ui";
import type {
  CollectionCounts,
  WorkSidebarFilter,
} from "@/components/finder/finder-work-sidebar";
import { FinderWorkSidebar } from "@/components/finder/finder-work-sidebar";
import type { AppSection } from "@/components/glass/glass-dock-nav";

const primaryLinks: { href: string; label: string; id: AppSection }[] = [
  { href: "/", label: "Work", id: "index" },
  { href: "/about", label: "About", id: "about" },
  { href: "/ask-ai", label: "Site JSON", id: "ask-ai" },
];

export function GlassNavRail({
  dockActive,
  filter,
  onFilterChange,
  searchQuery = "",
  onSearchChange,
  showFilters = true,
  counts,
  onFilterPreview,
}: {
  dockActive?: AppSection;
  filter?: WorkSidebarFilter;
  onFilterChange?: (filter: WorkSidebarFilter) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  showFilters?: boolean;
  counts?: CollectionCounts;
  onFilterPreview?: (filter: WorkSidebarFilter | null) => void;
}) {
  const pathname = usePathname();

  return (
    <Glass
      aria-label="Library"
      as="aside"
      className="liquid-rail liquid-rail--left"
      look={{ blur: 1.15, opacity: 0.55, rim: 1.1 }}
      material="frosted"
      tone="auto"
    >
      {onSearchChange ? (
        <SearchField
          aria-label="Search projects"
          className="liquid-search"
          label="Search"
          onValueChange={onSearchChange}
          placeholder="Search work…"
          value={searchQuery}
        />
      ) : null}

      <nav aria-label="Primary" className="liquid-primary-nav">
        {primaryLinks.map((link) => {
          let isActive = false;
          if (dockActive) {
            isActive = dockActive === link.id;
          } else if (link.id === "index") {
            isActive = pathname === "/";
          } else {
            isActive = pathname.startsWith(link.href);
          }
          return (
            <Link
              className={
                isActive
                  ? "liquid-nav-pill liquid-nav-pill--active"
                  : "liquid-nav-pill"
              }
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {showFilters && filter !== undefined && onFilterChange ? (
        <div className="liquid-rail-filters">
          <FinderWorkSidebar
            counts={counts}
            filter={filter}
            onFilterChange={onFilterChange}
            onFilterPreview={onFilterPreview}
          />
        </div>
      ) : null}

      <p className="liquid-rail-brand">aylesim</p>
    </Glass>
  );
}
