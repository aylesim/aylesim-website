"use client";

import { Animation, RegisterGsapPlugins, Root } from "@bsmnt/scrollytelling";
import ScrollTrigger from "gsap/ScrollTrigger";
import { type ReactNode, useEffect, useState } from "react";

type AboutScrollCardVariant = "hero" | "default" | "highlight" | "contact";

const VARIANT_TWEEN: Record<
  AboutScrollCardVariant,
  {
    fromTo: [
      { opacity: number; y: number; scale?: number },
      { opacity: number; y: number; scale?: number },
    ];
  }
> = {
  hero: {
    fromTo: [
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0 },
    ],
  },
  default: {
    fromTo: [
      { opacity: 0, y: 72, scale: 0.965 },
      { opacity: 1, y: 0, scale: 1 },
    ],
  },
  highlight: {
    fromTo: [
      { opacity: 0, y: 64, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1 },
    ],
  },
  contact: {
    fromTo: [
      { opacity: 0, y: 56 },
      { opacity: 1, y: 0 },
    ],
  },
};

const VARIANT_SCROLL: Record<
  AboutScrollCardVariant,
  { start: string; end: string; scrub: number }
> = {
  hero: { start: "top 94%", end: "top 68%", scrub: 0.75 },
  default: { start: "top 92%", end: "top 58%", scrub: 0.9 },
  highlight: { start: "top 92%", end: "top 56%", scrub: 0.85 },
  contact: { start: "top 94%", end: "top 62%", scrub: 0.8 },
};

export function AboutScrollCard({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: AboutScrollCardVariant;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const scroll = VARIANT_SCROLL[variant];
  const tween = VARIANT_TWEEN[variant];

  return (
    <Root
      disabled={reducedMotion}
      end={scroll.end}
      scrub={scroll.scrub}
      start={scroll.start}
    >
      <Animation
        tween={{
          end: 100,
          start: 0,
          ...tween,
        }}
      >
        {children}
      </Animation>
    </Root>
  );
}

export function AboutScrollProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <RegisterGsapPlugins plugins={[ScrollTrigger]} />
      {children}
    </>
  );
}
