"use client";

import { useTheme } from "@/components/theme/theme-provider";

const toggleClass =
  "font-mono text-[10px] uppercase tracking-widest text-(--text-muted) transition-colors hover:text-(--foreground)";

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
