"use client";

import "open-glass-ui/styles.css";
import { GlassSystemProvider } from "open-glass-ui";
import type { ReactNode } from "react";
import { useTheme } from "@/components/theme/theme-provider";

export function OpenGlassRoot({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <GlassSystemProvider
      design="liquid"
      motion="system"
      quality="auto"
      renderer="auto"
      theme={{
        appearance: theme,
        defaultAppearance: theme,
        className: "liquid-ogui-root min-h-dvh",
        theme: {
          preset: "violet",
          accent: theme === "dark" ? "#c4b5ff" : "#7a63d4",
          secondary: theme === "dark" ? "#9b7bff" : "#b9a6ff",
          contrast: "standard",
          radius: "soft",
          glass: {
            blur: 1.35,
            opacity: 0.38,
            saturation: 1.08,
            rim: 1.35,
            lightAngle: 320,
          },
        },
      }}
    >
      {children}
    </GlassSystemProvider>
  );
}
