"use client";

import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextLabel = theme === "dark" ? "Day" : "Night";

  return (
    <button
      aria-label={`Switch to ${nextLabel.toLowerCase()} mode`}
      className="text-(--text-muted) text-sm hover:text-(--foreground)"
      onClick={toggleTheme}
      type="button"
    >
      {nextLabel}
    </button>
  );
}
