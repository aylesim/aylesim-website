"use client";

import { FinderSidebarFolderIcon } from "@/components/finder/finder-icons";
import {
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  type ProjectCategory,
} from "@/lib/roles";

export type WorkSidebarFilter = "all" | ProjectCategory;

export type CollectionCounts = Partial<Record<WorkSidebarFilter, number>>;

const FILTERS: WorkSidebarFilter[] = ["all", ...CATEGORY_FILTERS];

function filterLabel(filter: WorkSidebarFilter) {
  if (filter === "all") {
    return "All Projects";
  }
  return CATEGORY_LABELS[filter];
}

export function FinderWorkSidebar({
  filter,
  onFilterChange,
  onFilterPreview,
  counts,
}: {
  filter: WorkSidebarFilter;
  onFilterChange: (filter: WorkSidebarFilter) => void;
  onFilterPreview?: (filter: WorkSidebarFilter | null) => void;
  counts?: CollectionCounts;
}) {
  return (
    <nav aria-label="Collections" className="finder-sidebar-nav">
      <p className="finder-sidebar-heading">Collections</p>
      <ul className="finder-sidebar-list">
        {FILTERS.map((item) => {
          const selected = filter === item;
          const count = counts?.[item];
          return (
            <li key={item}>
              <button
                aria-current={selected ? "true" : undefined}
                className={
                  selected
                    ? "finder-sidebar-row finder-sidebar-row--active"
                    : "finder-sidebar-row"
                }
                onClick={() => onFilterChange(item)}
                onMouseEnter={() => onFilterPreview?.(item)}
                onMouseLeave={() => onFilterPreview?.(null)}
                type="button"
              >
                <FinderSidebarFolderIcon active={selected} />
                <span className="finder-sidebar-row-label">
                  {filterLabel(item)}
                </span>
                {typeof count === "number" ? (
                  <span className="finder-sidebar-count">{count}</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
