"use client";

import { useTheme } from "@/components/theme/theme-provider";

const toggleClass =
  "rounded-sm border border-(--index-divider) border-dotted bg-surface-panel/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-(--text-muted) transition-[color,background-color,border-color] duration-200 hover:border-(--accent)/40 hover:bg-surface-hover hover:text-(--foreground)";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      aria-label={`Switch to ${nextLabel.toLowerCase()} mode`}
      className={toggleClass}
      onClick={toggleTheme}
      type="button"
    >
      {nextLabel}
    </button>
  );
}
