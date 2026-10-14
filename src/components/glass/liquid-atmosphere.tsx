"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function LiquidAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      return;
    }

    const orbs = root.querySelectorAll<HTMLElement>(".liquid-orb");
    const tweens = Array.from(orbs).map((orb, index) =>
      gsap.to(orb, {
        xPercent: index % 2 === 0 ? 12 : -10,
        yPercent: index % 2 === 0 ? -8 : 10,
        scale: index === 1 ? 1.08 : 1.04,
        duration: 18 + index * 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: index * 0.8,
      })
    );

    return () => {
      for (const tween of tweens) {
        tween.kill();
      }
    };
  }, []);

  return (
    <div aria-hidden className="liquid-mesh-bg" ref={rootRef}>
      <span className="liquid-orb liquid-orb--violet" />
      <span className="liquid-orb liquid-orb--amber" />
      <span className="liquid-orb liquid-orb--teal" />
      <span className="liquid-orb liquid-orb--blue" />
    </div>
  );
}
