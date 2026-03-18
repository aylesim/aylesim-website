"use client";

import Link from "next/link";
import { useState } from "react";
import BirdOnText from "@/components/home/bird-on-text";

const FLY_DELAY_STEP = 80;

const editorialBlocks = [
  {
    category: "Work",
    description: "Selected projects, installations, and collaborations.",
    href: "/work",
  },
  {
    category: "Devices",
    description: "Max4Live instruments for musicians and producers.",
    href: "/devices",
  },
  {
    category: "About",
    description: "Background, skills, exhibitions, and CV.",
    href: "/about",
  },
];

export default function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <p className="pt-2 pb-4 font-serif-display text-[var(--text-muted)] text-base content-width md:pb-6 md:text-lg">
        Building instruments and experiences at the edge of music and code ·
        Berlin
      </p>
      <hr className="mt-4 mb-0 border-0 border-[var(--border)]/60 border-t content-width md:mt-6" />
      <section className="flex flex-1 items-center justify-center">
        <button
          className="translate-x-20 text-left font-bold font-serif-display text-3xl text-[var(--foreground)] md:translate-x-32 md:text-4xl lg:translate-x-40 lg:text-5xl"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          type="button"
        >
          <BirdOnText flyDelay={0} size="lg" triggerFly={hovered}>
            <span className="text-5xl md:text-6xl lg:text-7xl">Birds</span>
          </BirdOnText>
          <span className="ml-2 inline md:ml-3"> </span>
          <BirdOnText flyDelay={FLY_DELAY_STEP} size="md" triggerFly={hovered}>
            <span className="font-normal text-[var(--text-muted)] text-lg md:text-xl lg:text-2xl">
              now
            </span>
          </BirdOnText>
          <span className="inline">{"\u2009"}</span>
          <BirdOnText
            flyDelay={FLY_DELAY_STEP * 2}
            size="sm"
            topOffset={12}
            triggerFly={hovered}
          >
            <span className="font-normal text-[var(--text-muted)] text-lg md:text-xl lg:text-2xl">
              available
            </span>
          </BirdOnText>
        </button>
      </section>
      <section className="border-[var(--border)]/60 border-t pt-12 pb-16 content-width md:pt-16 md:pb-24">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {editorialBlocks.map((block) => (
            <div className="flex-1" key={block.category}>
              <p className="mb-1 font-serif-display text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]">
                {block.category}
              </p>
              <p className="mb-2 font-serif-display text-[var(--text-secondary)] text-base md:text-lg">
                {block.description}
              </p>
              <Link
                className="font-serif-display text-[var(--text-muted)] text-sm transition-colors duration-300 hover:text-[var(--foreground)]"
                href={block.href}
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
