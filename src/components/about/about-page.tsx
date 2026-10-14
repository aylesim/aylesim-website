"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Markdown } from "@/components/markdown";
import { PageFrame } from "@/components/site/site-chrome";
import type { About, SiteConfig } from "@/lib/content";
import { spiralPoses } from "@/lib/tile-layout";

gsap.registerPlugin(useGSAP);
const aboutSectionBoundary = /(?=^## )/m;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AboutPage({
  about,
  brand,
  site,
}: {
  about: About;
  brand: string;
  site: SiteConfig;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || reducedMotion()) {
        return;
      }
      const cards = gsap.utils.toArray<HTMLElement>(".about-card", root);
      const poses = spiralPoses(cards.length, 108);
      cards.forEach((card, index) => {
        const pose = poses[index] ?? { x: 0, y: 0 };
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.9,
            rotation: -8,
            x: pose.x * 0.42,
            y: pose.y * 0.42 + 36,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: 0,
            y: 0,
            duration: 0.32,
            delay: index * 0.07,
            ease: "power2.out",
            overwrite: "auto",
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <PageFrame brand={brand} contactEmail={site.contactEmail} current="about">
      <main className="about" ref={rootRef}>
        <header className="about-card about-card--hero">
          <div className="about-card-inner">
            <h1>About</h1>
            <p className="about-subtitle">{about.lede}</p>
            <p className="about-availability">Berlin, EU citizen</p>
          </div>
        </header>
        {about.body
          .split(aboutSectionBoundary)
          .filter((source) => source.trim())
          .map((source) => (
            <section
              className="about-card about-card--body"
              id={source.startsWith("## Teaching") ? "teaching" : undefined}
              key={source.slice(0, 60)}
            >
              <div className="about-card-inner about-prose">
                <Markdown>{source}</Markdown>
              </div>
            </section>
          ))}
      </main>
    </PageFrame>
  );
}
