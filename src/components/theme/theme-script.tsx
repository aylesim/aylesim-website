import Script from "next/script";
import { DEFAULT_THEME, SITE_BG, THEME_STORAGE_KEY } from "@/lib/theme";

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var t=s==="light"||s==="dark"?s:${JSON.stringify(DEFAULT_THEME)};document.documentElement.dataset.theme=t;document.documentElement.style.backgroundColor=t==="light"?${JSON.stringify(SITE_BG.light)}:${JSON.stringify(SITE_BG.dark)};}catch(e){document.documentElement.dataset.theme=${JSON.stringify(DEFAULT_THEME)};}})();`;

export function ThemeScript() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {themeInitScript}
    </Script>
  );
}
