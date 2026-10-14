"use client";

import { Glass } from "open-glass-ui";
import type { ReactNode } from "react";
import { FinderChevronLeftIcon } from "@/components/finder/finder-icons";
import type {
  CollectionCounts,
  WorkSidebarFilter,
} from "@/components/finder/finder-work-sidebar";
import type { AppSection } from "@/components/glass/glass-dock-nav";
import { GlassNavRail } from "@/components/glass/glass-nav-rail";
import { GlassPlaybar } from "@/components/glass/glass-playbar";
import { LiquidAtmosphere } from "@/components/glass/liquid-atmosphere";

type FinderAppShellProps = {
  dockActive?: AppSection;
  headline: string;
  subtitle?: string;
  aside?: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  children: ReactNode;
  filter?: WorkSidebarFilter;
  onFilterChange?: (filter: WorkSidebarFilter) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showFilters?: boolean;
  playbarMeta?: string;
  counts?: CollectionCounts;
  onFilterPreview?: (filter: WorkSidebarFilter | null) => void;
};

export function FinderAppShell({
  dockActive,
  headline,
  subtitle,
  aside,
  onBack,
  backLabel = "Back",
  children,
  filter,
  onFilterChange,
  searchQuery = "",
  onSearchChange,
  showFilters = true,
  playbarMeta = "aylesim · portfolio",
  counts,
  onFilterPreview,
}: FinderAppShellProps) {
  return (
    <div className="liquid-desktop">
      <LiquidAtmosphere />
      <div className="liquid-stage">
        <Glass
          aria-label="Application"
          as="div"
          className="liquid-app"
          look={{ blur: 1.1, opacity: 0.28, rim: 1.4, lightAngle: 320 }}
          material="frosted"
          tone="auto"
        >
          <div className="liquid-app-grid">
            <GlassNavRail
              counts={counts}
              dockActive={dockActive}
              filter={filter}
              onFilterChange={onFilterChange}
              onFilterPreview={onFilterPreview}
              onSearchChange={onSearchChange}
              searchQuery={searchQuery}
              showFilters={showFilters}
            />

            <main className="liquid-main">
              <header className="liquid-main-header">
                <div className="liquid-main-heading">
                  {onBack ? (
                    <button
                      className="liquid-back-chip"
                      onClick={onBack}
                      type="button"
                    >
                      <FinderChevronLeftIcon />
                      <span>{backLabel}</span>
                    </button>
                  ) : null}
                  <h1 className="liquid-headline">{headline}</h1>
                  {subtitle ? (
                    <p className="liquid-subheadline">{subtitle}</p>
                  ) : null}
                </div>
              </header>
              <div className="liquid-main-scroll">{children}</div>
            </main>

            {aside ? <div className="liquid-aside-slot">{aside}</div> : null}
          </div>
        </Glass>
      </div>
      <GlassPlaybar meta={playbarMeta} title={headline} />
    </div>
  );
}
