export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "aylesim-theme";

export const DEFAULT_THEME: Theme = "dark";

export const SITE_BG: Record<Theme, string> = {
  dark: "#0a0a0a",
  light: "#f5f5f5",
};
