export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "aylesim-theme";

export const DEFAULT_THEME: Theme = "dark";

export const SITE_BG: Record<Theme, string> = {
  dark: "#000000",
  light: "#f6f4f0",
};
