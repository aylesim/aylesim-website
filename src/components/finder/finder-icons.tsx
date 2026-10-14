const iconClass = "finder-dock-icon";

export function FinderFolderIcon() {
  return (
    <svg
      aria-hidden
      className={iconClass}
      role="presentation"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5H9l1.2 1.6H18.5A2.5 2.5 0 0 1 21 9v8.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5V7.5Z"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M4 9.2h16v8.3a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5V9.2Z"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  );
}

export function FinderUserIcon() {
  return (
    <svg
      aria-hidden
      className={iconClass}
      role="presentation"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="9" fill="currentColor" r="4" />
      <path
        d="M6 19.5c0-3.3 2.7-6 6-6s6 2.7 6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function FinderJsonIcon() {
  return (
    <svg
      aria-hidden
      className={iconClass}
      role="presentation"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 4.5 5.5 7 8 9.5M16 4.5 18.5 7 16 9.5M9 18.5l6-13"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function FinderThemeIcon() {
  return (
    <svg
      aria-hidden
      className={iconClass}
      role="presentation"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        fill="none"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function FinderChevronLeftIcon() {
  return (
    <svg
      aria-hidden
      className="finder-toolbar-icon"
      role="presentation"
      viewBox="0 0 24 24"
    >
      <path
        d="M14.5 6 9 12l5.5 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function FinderSidebarFolderIcon({ active }: { active?: boolean }) {
  return (
    <span
      aria-hidden
      className={`finder-sidebar-folder ${active ? "finder-sidebar-folder--active" : ""}`}
    >
      <svg
        aria-hidden
        className="finder-sidebar-folder-icon"
        role="presentation"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 7.5A2.5 2.5 0 0 1 6.5 5H9l1.2 1.6H18.5A2.5 2.5 0 0 1 21 9v8.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5V7.5Z"
          fill="currentColor"
          opacity="0.92"
        />
      </svg>
    </span>
  );
}
