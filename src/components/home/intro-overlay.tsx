"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export function IntroOverlay({
  brand,
  lines,
  onEnter,
}: {
  brand: string;
  lines: readonly string[];
  onEnter: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);

  useGSAP(
    () => {
      if (lines.length < 2) {
        return;
      }
      const tick = () => {
        const node = lineRef.current;
        if (!node) {
          return;
        }
        gsap.to(node, {
          opacity: 0,
          duration: 0.28,
          ease: "power2.in",
          onComplete: () => {
            setIndex((current) => (current + 1) % lines.length);
            gsap.to(node, { opacity: 1, duration: 0.42, ease: "power2.out" });
          },
        });
      };
      const id = window.setInterval(tick, 2400);
      return () => window.clearInterval(id);
    },
    { dependencies: [lines], scope: rootRef }
  );

  return (
    <div className="intro" ref={rootRef}>
      <button className="intro-scrim" onClick={onEnter} type="button">
        <span className="sr-only">Enter site</span>
      </button>
      <div className="intro-card">
        <span className="intro-brand">{brand}</span>
        <span className="intro-line" ref={lineRef}>
          {lines[index] ?? ""}
        </span>
        <span aria-hidden="true" className="intro-dots">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}
