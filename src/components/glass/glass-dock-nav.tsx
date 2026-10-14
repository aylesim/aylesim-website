"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconButton, Tooltip } from "open-glass-ui";
import type { ReactNode } from "react";
import {
  FinderFolderIcon,
  FinderJsonIcon,
  FinderThemeIcon,
  FinderUserIcon,
} from "@/components/finder/finder-icons";
import { useTheme } from "@/components/theme/theme-provider";

export type AppSection = "index" | "about" | "ask-ai";

type DockItem = {
  id: AppSection;
  href: string;
  label: string;
  icon: ReactNode;
};

const items: DockItem[] = [
  { id: "index", href: "/", label: "Work", icon: <FinderFolderIcon /> },
  { id: "about", href: "/about", label: "About", icon: <FinderUserIcon /> },
  { id: "ask-ai", href: "/ask-ai", label: "JSON", icon: <FinderJsonIcon /> },
];

function dockActiveFromPath(pathname: string): AppSection {
  if (pathname.startsWith("/about")) {
    return "about";
  }
  if (pathname.startsWith("/ask-ai")) {
    return "ask-ai";
  }
  return "index";
}

export function GlassDockNav({
  active,
  className,
}: {
  active?: AppSection;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const resolved = active ?? dockActiveFromPath(pathname);
  const { toggleTheme } = useTheme();

  return (
    <nav
      aria-label="Sections"
      className={className ? `liquid-dock-nav ${className}` : "liquid-dock-nav"}
    >
      {items.map((item) => {
        const isActive = resolved === item.id;
        return (
          <Tooltip key={item.id} label={item.label}>
            <span
              className={
                isActive
                  ? "liquid-dock-nav-item liquid-dock-nav-item--active"
                  : "liquid-dock-nav-item"
              }
            >
              <IconButton
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                onClick={() => router.push(item.href)}
                size="medium"
                variant="quiet"
              >
                {item.icon}
              </IconButton>
            </span>
          </Tooltip>
        );
      })}
      <Tooltip label="Appearance">
        <IconButton
          aria-label="Toggle appearance"
          onClick={toggleTheme}
          size="medium"
          variant="quiet"
        >
          <FinderThemeIcon />
        </IconButton>
      </Tooltip>
    </nav>
  );
}
