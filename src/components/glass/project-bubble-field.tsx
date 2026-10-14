"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProjectDetail } from "@/components/home/portfolio-detail";
import { type BubbleFocus, layoutBubbles } from "@/lib/bubble-layout";
import {
  attachPointerFocus,
  collapseDetail,
  expandSelectedBubble,
  releaseDepthLocks,
  startDepthTicker,
  startTunnelMotion,
  teardownBubbleMotion,
} from "@/lib/bubble-motion";
import type { Project, SiteConfig } from "@/lib/content";
import type { ProjectCover } from "@/lib/project-cover";
import { CATEGORY_ACCENT } from "@/lib/roles";

gsap.registerPlugin(useGSAP);

type BubbleItem = {
  project: Project;
  cover: ProjectCover | null;
};

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

function spaceFrame(space: HTMLElement) {
  const w = Math.round(space.clientWidth || window.innerWidth);
  const h = Math.round(space.clientHeight || window.innerHeight);
  return { w, h };
}

function layoutFrame(space: HTMLElement, frame: { w: number; h: number }) {
  const measured = spaceFrame(space);
  return {
    w: frame.w >= 2 ? frame.w : measured.w,
    h: frame.h >= 2 ? frame.h : measured.h,
  };
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
  const frameRef = useRef({ w: 0, h: 0 });
  const [layoutKey, setLayoutKey] = useState(0);

  useLayoutEffect(() => {
    const space = spaceRef.current;
    if (!space) {
      return;
    }
    const update = () => {
      const next = spaceFrame(space);
      const prev = frameRef.current;
      const first = prev.w < 2 || prev.h < 2;
      const jumped =
        Math.abs(prev.w - next.w) >= 32 || Math.abs(prev.h - next.h) >= 32;
      if (!(first || jumped)) {
        return;
      }
      frameRef.current = next;
      setLayoutKey((key) => key + 1);
    };
    const observer = new ResizeObserver(update);
    observer.observe(space);
    update();
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const space = spaceRef.current;
      if (!space) {
        return;
      }
      gsap.ticker.wake();
      const stopTicker = startDepthTicker(space);
      return () => {
        stopTicker();
        teardownBubbleMotion(space);
      };
    },
    { scope: spaceRef }
  );

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

  useGSAP(
    () => {
      const world = worldRef.current;
      if (!world || selectedSlug) {
        return;
      }
      return attachPointerFocus(world);
    },
    { scope: worldRef, dependencies: [selectedSlug], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const space = spaceRef.current;
      if (!space || selectedSlug) {
        return;
      }
      const { w, h } = layoutFrame(space, frameRef.current);
      if (w < 2 || h < 2) {
        return;
      }
      const nodes = depthNodes(space);
      const poses = layoutBubbles(layoutItems(items), focus, w, h);
      return startTunnelMotion({ root: space, nodes, poses });
    },
    {
      scope: spaceRef,
      dependencies: [items, focus, selectedSlug, layoutKey],
      revertOnUpdate: true,
    }
  );

  useGSAP(
    () => {
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
      if (!space) {
        return;
      }
      const { w, h } = layoutFrame(space, frameRef.current);
      if (w < 2 || h < 2) {
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
        width: w,
        height: h,
      });
      return () => {
        timeline.kill();
      };
    },
    { scope: spaceRef, dependencies: [selectedSlug, layoutKey] }
  );

  return (
    <div className="bubble-space" ref={spaceRef}>
      <div aria-hidden="true" className="bubble-void">
        <span className="bubble-aurora bubble-aurora--one" />
        <span className="bubble-aurora bubble-aurora--two" />
      </div>
      <div className="bubble-camera">
        <div className="bubble-world" ref={worldRef}>
          {items.map(({ project, cover }) => {
            const clip = project.category
              ? CATEGORY_ACCENT[project.category]
              : "var(--clip-web)";
            return (
              <div
                className="bubble-node"
                data-base-opacity="1"
                data-bubble-id={project.slug}
                data-depth
                key={project.slug}
              >
                <button
                  aria-label={project.title}
                  className="bubble-node-button"
                  onClick={() => {
                    if (!selectedSlug) {
                      onSelect(project.slug);
                    }
                  }}
                  type="button"
                >
                  <span className="bubble-node-visual">
                    <span className="bubble-node-disk relative">
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
                  </span>
                </button>
              </div>
            );
          })}
        </div>
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
