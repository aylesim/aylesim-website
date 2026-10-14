"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProjectDetail } from "@/components/home/portfolio-detail";
import { type BubbleFocus, layoutBubbles } from "@/lib/bubble-layout";
import {
  applyIdleLayout,
  attachParallax,
  collapseDetail,
  ensureBokehFloats,
  expandSelectedBubble,
  motionDuration,
  releaseDepthLocks,
  startDepthTicker,
  teardownBubbleMotion,
} from "@/lib/bubble-motion";
import type { Project, SiteConfig } from "@/lib/content";
import type { ProjectCover } from "@/lib/project-cover";
import { CATEGORY_ACCENT } from "@/lib/roles";

type BubbleItem = {
  project: Project;
  cover: ProjectCover | null;
};

const BOKEH_IDS = [
  "bokeh-0",
  "bokeh-1",
  "bokeh-2",
  "bokeh-3",
  "bokeh-4",
  "bokeh-5",
  "bokeh-6",
  "bokeh-7",
  "bokeh-8",
] as const;

const STAR_IDS = Array.from({ length: 30 }, (_, index) => `star-${index}`);

function layoutItems(items: BubbleItem[]) {
  return items.map((item) => ({
    id: item.project.slug,
    category: item.project.category,
    featured: item.project.featured,
  }));
}

function depthNodes(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>("[data-bubble-id]")];
}

function bokehNodes(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>("[data-soap]")];
}

export function ProjectBubbleField({
  items,
  focus,
  selectedSlug,
  onSelect,
  onClose,
  projects,
  site,
}: {
  items: BubbleItem[];
  focus: BubbleFocus;
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  onClose?: () => void;
  projects: Project[];
  site: SiteConfig;
}) {
  const spaceRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<string | null>(null);
  const [frame, setFrame] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const space = spaceRef.current;
    if (!space) {
      return;
    }
    const update = () => {
      const next = {
        w: Math.round(space.clientWidth),
        h: Math.round(space.clientHeight),
      };
      setFrame((prev) => {
        if (Math.abs(prev.w - next.w) < 2 && Math.abs(prev.h - next.h) < 2) {
          return prev;
        }
        return next;
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(space);
    update();
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const space = spaceRef.current;
    if (!space) {
      return;
    }
    const stopTicker = startDepthTicker(space);
    return () => {
      stopTicker();
      teardownBubbleMotion(space);
    };
  }, []);

  useEffect(() => {
    if (!(selectedSlug && onClose)) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedSlug, onClose]);

  useLayoutEffect(() => {
    const world = worldRef.current;
    if (!world || selectedSlug) {
      return;
    }
    return attachParallax(world);
  }, [selectedSlug]);

  useLayoutEffect(() => {
    const space = spaceRef.current;
    if (!space || frame.w === 0) {
      return;
    }
    ensureBokehFloats(bokehNodes(space), frame.w, frame.h);
  }, [frame]);

  useLayoutEffect(() => {
    const space = spaceRef.current;
    if (!space || selectedSlug || frame.w === 0) {
      return;
    }
    const nodes = depthNodes(space);
    const poses = layoutBubbles(layoutItems(items), focus, frame.w, frame.h);
    applyIdleLayout(nodes, poses, motionDuration(1.05));
    return () => {
      gsap.killTweensOf(nodes);
    };
  }, [items, focus, selectedSlug, frame]);

  useLayoutEffect(() => {
    const space = spaceRef.current;
    const previous = selectedRef.current;
    selectedRef.current = selectedSlug;
    if (!selectedSlug) {
      collapseDetail(previous ? detailRef.current : null);
      if (space) {
        releaseDepthLocks(space);
      }
      return;
    }
    if (!space || frame.w === 0) {
      return;
    }
    const world = worldRef.current;
    if (world) {
      gsap.to(world, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        overwrite: true,
      });
    }
    const timeline = expandSelectedBubble({
      stage: space,
      detail: detailRef.current,
      selectedSlug,
      width: frame.w,
      height: frame.h,
    });
    return () => {
      timeline.kill();
    };
  }, [selectedSlug, frame]);

  return (
    <div className="bubble-space" ref={spaceRef}>
      <div aria-hidden="true" className="bubble-void">
        <span className="bubble-aurora bubble-aurora--one" />
        <span className="bubble-aurora bubble-aurora--two" />
        <span className="bubble-orbit bubble-orbit--one" />
        <span className="bubble-orbit bubble-orbit--two" />
        <span className="bubble-orbit bubble-orbit--three" />
        <span className="bubble-starfield">
          {STAR_IDS.map((id) => (
            <i className="bubble-star" key={id} />
          ))}
        </span>
      </div>
      <div className="bubble-world" ref={worldRef}>
        {BOKEH_IDS.map((id) => (
          <span
            aria-hidden
            className="bubble-soap"
            data-depth
            data-soap="true"
            key={id}
          />
        ))}
        {items.map(({ project, cover }) => {
          const clip = project.category
            ? CATEGORY_ACCENT[project.category]
            : "var(--clip-web)";
          return (
            <button
              aria-label={project.title}
              className="bubble-node"
              data-base-opacity="1"
              data-bubble-id={project.slug}
              data-depth
              key={project.slug}
              onClick={() => {
                if (!selectedSlug) {
                  onSelect(project.slug);
                }
              }}
              type="button"
            >
              <span className="bubble-node-disk">
                {cover ? (
                  <Image
                    alt=""
                    className="bubble-node-image"
                    fill
                    sizes="42vw"
                    src={cover.src}
                    unoptimized
                  />
                ) : (
                  <span
                    className="bubble-node-fill"
                    style={{ background: clip }}
                  />
                )}
                <span className="bubble-node-sheen" />
              </span>
              <span className="bubble-node-label">{project.title}</span>
            </button>
          );
        })}
      </div>
      {selectedSlug ? (
        <div
          aria-modal="true"
          className="bubble-detail-panel"
          ref={detailRef}
          role="dialog"
        >
          {onClose ? (
            <button
              className="liquid-back-chip bubble-detail-close"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          ) : null}
          <div className="finder-project-article">
            <ProjectDetail
              projects={projects}
              site={site}
              slug={selectedSlug}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
