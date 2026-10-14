"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { getProjectCover } from "@/lib/project-cover";
import type { ProjectPreview } from "@/lib/project-preview";
import type { WorkFilter } from "@/lib/roles";
import {
  isPortraitViewport,
  layoutPoses,
  type TileView,
  tileHeightFromWidth,
  tileWidth,
} from "@/lib/tile-layout";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

const PLANE_MIN = -60;
const PLANE_MAX = 60;
const NUDGE_MIN = 14;
const NUDGE_MAX = 32;

function planeBase(portrait: boolean) {
  return portrait ? 0 : -25;
}

function clampPlane(angle: number) {
  return gsap.utils.clamp(PLANE_MIN, PLANE_MAX, angle);
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function settlePlane(pivot: HTMLElement, portrait: boolean) {
  gsap.set(pivot, {
    xPercent: -50,
    yPercent: -50,
    rotation: planeBase(portrait),
    transformOrigin: "50% 50%",
  });
}

function orientPlane({
  changed,
  pivot,
  portrait,
  ready,
  reduced,
}: {
  changed: boolean;
  pivot: HTMLElement;
  portrait: boolean;
  ready: boolean;
  reduced: boolean;
}) {
  if (!ready) {
    settlePlane(pivot, portrait);
    return;
  }
  if (!changed) {
    return;
  }
  gsap.to(pivot, {
    rotation: planeBase(portrait),
    duration: reduced ? 0 : 0.6,
    ease: "power2.out",
    overwrite: "auto",
  });
}

function nudgePlane(pivot: HTMLElement, extra = 0) {
  if (reducedMotion()) {
    return;
  }
  const current = clampPlane(Number(gsap.getProperty(pivot, "rotation")));
  const step =
    gsap.utils.random(NUDGE_MIN, NUDGE_MAX) *
    (gsap.utils.random(0, 1) < 0.5 ? -1 : 1);
  let next = clampPlane(current + step + extra);
  if (Math.abs(next - current) < 8) {
    const bounce = current > 0 ? -1 : 1;
    next = clampPlane(
      current + bounce * gsap.utils.random(NUDGE_MIN, NUDGE_MAX)
    );
  }
  gsap.to(pivot, {
    rotation: next,
    duration: 0.32,
    ease: "none",
    overwrite: "auto",
  });
}

function tweenTile({
  duration,
  locked,
  pose,
  selected,
  tile,
  visible,
}: {
  duration: number;
  locked: boolean;
  pose: { x: number; y: number };
  selected: boolean;
  tile: HTMLButtonElement;
  visible: boolean;
}) {
  const shown = visible && (!locked || selected) ? 1 : 0.2;
  gsap.to(tile, {
    xPercent: -50,
    yPercent: -50,
    x: pose.x,
    y: pose.y,
    opacity: visible ? shown : 0,
    scale: visible ? 1 : 0.92,
    duration,
    ease: "power2.out",
    overwrite: "auto",
  });
  tile.style.pointerEvents = visible && !locked ? "auto" : "none";
  tile.classList.toggle("is-on", selected);
}

export function TileField({
  filter,
  onSelect,
  projects,
  selectedSlug,
  view,
}: {
  filter: WorkFilter;
  onSelect: (slug: string) => void;
  projects: ProjectPreview[];
  selectedSlug: string | null;
  view: TileView;
}) {
  const stageRef = useRef<HTMLElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const onSelectRef = useRef(onSelect);
  const selectedRef = useRef(selectedSlug);
  const firstLayout = useRef(true);
  const planeReady = useRef(false);
  const skipViewNudge = useRef(true);
  const portraitRef = useRef(false);
  onSelectRef.current = onSelect;
  selectedRef.current = selectedSlug;

  const items = useMemo(
    () =>
      projects.map((project) => ({
        project,
        cover: getProjectCover(project),
        visible: filter === "all" || project.category === filter,
      })),
    [filter, projects]
  );

  useGSAP(
    () => {
      const world = worldRef.current;
      const pivot = pivotRef.current;
      if (!(world && pivot)) {
        return;
      }
      let pressX = 0;
      let pressY = 0;
      const [drag] = Draggable.create(world, {
        type: "x,y",
        inertia: !reducedMotion(),
        dragClickables: true,
        cursor: "grab",
        activeCursor: "grabbing",
        zIndexBoost: false,
        allowContextMenu: true,
        onPress() {
          pressX = this.x;
          pressY = this.y;
        },
        onRelease() {
          const dist = Math.hypot(this.x - pressX, this.y - pressY);
          if (dist < 10) {
            return;
          }
          const extra = gsap.utils.clamp(-20, 20, (this.x - pressX) * 0.05);
          nudgePlane(pivot, extra);
        },
        onClick(event) {
          if (selectedRef.current) {
            return;
          }
          const target = event.target;
          if (!(target instanceof Element)) {
            return;
          }
          const slug = target.closest("[data-slug]")?.getAttribute("data-slug");
          if (slug) {
            nudgePlane(pivot);
            onSelectRef.current(slug);
          }
        },
      });
      return () => {
        drag.kill();
      };
    },
    { scope: stageRef }
  );

  useGSAP(
    () => {
      const stage = stageRef.current;
      const pivot = pivotRef.current;
      if (!(stage && pivot)) {
        return;
      }
      const reduced = reducedMotion();

      const applyLayout = () => {
        const width = stage.clientWidth || window.innerWidth;
        const height = stage.clientHeight || window.innerHeight;
        const portrait = isPortraitViewport(width, height);
        const tw = tileWidth(width, portrait);
        const th = tileHeightFromWidth(tw);
        const portraitChanged = portraitRef.current !== portrait;
        const ready = planeReady.current;
        portraitRef.current = portrait;
        pivot.classList.toggle("is-portrait", portrait);
        orientPlane({
          changed: portraitChanged,
          pivot,
          portrait,
          ready,
          reduced,
        });

        const visibleItems = items.filter((item) => item.visible);
        const poses = layoutPoses(view, visibleItems.length, tw, th);
        const poseBySlug = new Map(
          visibleItems.map((item, index) => [item.project.slug, poses[index]])
        );

        const duration = firstLayout.current || reduced ? 0 : 0.28;
        const locked = selectedSlug !== null;
        tilesRef.current.forEach((tile, index) => {
          const item = items[index];
          if (!(tile && item)) {
            return;
          }
          tweenTile({
            duration,
            locked,
            pose: poseBySlug.get(item.project.slug) ?? { x: 0, y: 0 },
            selected: item.project.slug === selectedSlug,
            tile,
            visible: item.visible,
          });
        });
        firstLayout.current = false;
      };

      applyLayout();
      planeReady.current = true;
      window.addEventListener("resize", applyLayout);
      return () => window.removeEventListener("resize", applyLayout);
    },
    { dependencies: [items, selectedSlug, view], scope: stageRef }
  );

  useGSAP(
    () => {
      if (skipViewNudge.current) {
        skipViewNudge.current = false;
        return;
      }
      const pivot = pivotRef.current;
      if (pivot) {
        nudgePlane(pivot);
      }
    },
    { dependencies: [filter, view], scope: stageRef }
  );

  return (
    <section className="tile-stage" ref={stageRef}>
      <div className="tile-pivot" ref={pivotRef}>
        <div className="tile-world" ref={worldRef}>
          {items.map((item, index) => (
            <button
              className="tile"
              data-slug={item.project.slug}
              draggable={false}
              key={item.project.slug}
              onClick={(event) => {
                if (event.detail === 0) {
                  onSelect(item.project.slug);
                }
              }}
              ref={(node) => {
                tilesRef.current[index] = node;
              }}
              type="button"
            >
              {item.cover ? (
                <Image
                  alt={item.project.imageAlt ?? "[needs alt text]"}
                  className="tile-image"
                  height={500}
                  sizes="(max-aspect-ratio: 1/1) 56vw, 16vw"
                  src={item.cover.src}
                  width={800}
                />
              ) : (
                <span className="tile-fallback">{item.project.title}</span>
              )}
              <span className="tile-veil" />
              <span className="tile-meta">
                {item.project.year ? <span>{item.project.year}</span> : null}
                <span>{item.project.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
