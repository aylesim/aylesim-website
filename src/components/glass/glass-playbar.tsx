"use client";

import { Glass } from "open-glass-ui";
import { GlassDockNav } from "@/components/glass/glass-dock-nav";

type GlassPlaybarProps = {
  title: string;
  meta?: string;
};

export function GlassPlaybar({ title, meta }: GlassPlaybarProps) {
  return (
    <div className="liquid-playbar-wrap">
      <Glass
        aria-label="Navigation"
        as="div"
        className="liquid-playbar"
        look={{ blur: 1.1, opacity: 0.72, rim: 1.2 }}
        material="frosted"
        role="contentinfo"
        tone="auto"
      >
        <div className="liquid-playbar-now">
          <span aria-hidden className="liquid-playbar-art" />
          <div className="liquid-playbar-copy">
            <p className="liquid-playbar-title">{title}</p>
            {meta ? <p className="liquid-playbar-meta">{meta}</p> : null}
          </div>
        </div>
        <span className="liquid-live-pill">Live</span>
        <GlassDockNav className="liquid-playbar-dock" />
      </Glass>
    </div>
  );
}
