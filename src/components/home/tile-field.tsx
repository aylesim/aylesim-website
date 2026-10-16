"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useMemo, useRef } from "react";
import { TileCard } from "@/components/home/tile-card";
import { useCardMenu } from "@/components/home/use-card-menu";
import { getProjectCover } from "@/lib/project-cover";
import type { ProjectPreview } from "@/lib/project-preview";
import type { WorkFilter } from "@/lib/roles";
import {
  DESKTOP_STAGE_QUERY,
  isPortraitViewport,
  layoutPoses,
  type TileView,
  tileHeightFromWidth,
  tileWidth,
} from "@/lib/tile-layout";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

const stageMemory = new Map<
  string,
  { x: number; y: number; rotation: number; portrait: boolean }
>();

const PLANE_MIN = -12;
const PLANE_MAX = 12;
const NUDGE_MIN = 4;
const NUDGE_MAX = 10;
const planeDirections = new WeakMap<HTMLElement, number>();

function focusPreview(target: Element) {
  const control = target.closest("[data-preview]");
  if (control instanceof HTMLElement) {
    control.focus();
  }
  return Boolean(control);
}

function tileClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return null;
  }
  const slug = target.closest("[data-slug]")?.getAttribute("data-slug");
  return slug ? { target, slug } : null;
}

function planeBase(portrait: boolean) {
  return portrait ? 0 : -6;
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
  const direction = planeDirections.get(pivot) ?? 1;
  const next = clampPlane(
    direction * (gsap.utils.random(NUDGE_MIN, NUDGE_MAX) + Math.abs(extra))
  );
  planeDirections.set(pivot, -direction);
  gsap.to(pivot, {
    rotation: next,
    duration: 0.32,
    ease: "none",
    overwrite: "auto",
  });
}

function tweenTile({
  duration,
  featured,
  locked,
  pose,
  selected,
  tile,
  visible,
}: {
  duration: number;
  featured: boolean;
  locked: boolean;
  pose: { x: number; y: number };
  selected: boolean;
  tile: HTMLDivElement;
  visible: boolean;
}) {
  const shown = visible && (!locked || selected) ? 1 : 0.2;
  gsap.to(tile, {
    xPercent: -50,
    yPercent: -50,
    x: pose.x,
    y: pose.y,
    opacity: visible ? shown : 0,
    scale: visible ? 1 + Number(featured) * 0.08 : 0.92,
    duration,
    ease: "power2.out",
    overwrite: "auto",
  });
  tile.style.pointerEvents = visible && !locked ? "auto" : "none";
  tile.classList.toggle("is-on", selected);
}

export function TileField({
  filter,
  menuId,
  menuOpen,
  onSelect,
  onPreview,
  projects,
  selectedSlug,
  view,
}: {
  filter: WorkFilter;
  menuId: string;
  menuOpen: boolean;
  onSelect: (slug: string) => void;
  onPreview: (slug: string) => void;
  projects: ProjectPreview[];
  selectedSlug: string | null;
  view: TileView;
}) {
  const stageRef = useRef<HTMLElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const onSelectRef = useRef(onSelect);
  const onPreviewRef = useRef(onPreview);
  onPreviewRef.current = onPreview;
  const selectedRef = useRef(selectedSlug);
  const savedStage = useRef<
    { x: number; y: number; rotation: number; portrait: boolean } | undefined
  >(undefined);
  const portraitRef = useRef(false);
  const refreshLayout = useRef<((instant?: boolean) => void) | null>(null);
  const items = useMemo(
    () =>
      projects.map((project) => ({
        project,
        cover: getProjectCover(project),
        visible: filter === "all" || project.category === filter,
      })),
    [filter, projects]
  );
  const visibility = useMemo(() => items.map((item) => item.visible), [items]);
  const layoutState = useRef({ items, selectedSlug, view });
  layoutState.current = { items, selectedSlug, view };
  const {
    active: menuActive,
    ready: menuReady,
    activeRef: menuActiveRef,
  } = useCardMenu({
    open: menuOpen,
    visible: visibility,
    stageRef,
    pivotRef,
    worldRef,
    tilesRef,
    refreshLayout,
    rememberStage: () => {
      const world = worldRef.current;
      const pivot = pivotRef.current;
      if (world && pivot && window.matchMedia(DESKTOP_STAGE_QUERY).matches) {
        stageMemory.set(window.location.pathname, {
          x: Number(gsap.getProperty(world, "x")),
          y: Number(gsap.getProperty(world, "y")),
          rotation: Number(gsap.getProperty(pivot, "rotation")),
          portrait: portraitRef.current,
        });
      }
    },
  });
  const { contextSafe } = useGSAP({ scope: stageRef });
  const activateTile = contextSafe((slug: string) => {
    if (openingSlug.current) {
      return;
    }
    openingSlug.current = slug;
    if (menuActiveRef.current) {
      onSelectRef.current(slug);
      return;
    }
    const world = worldRef.current;
    const pivot = pivotRef.current;
    const desktop = window.matchMedia(DESKTOP_STAGE_QUERY).matches;
    if (world && pivot && desktop) {
      stageMemory.set(window.location.pathname, {
        x: Number(gsap.getProperty(world, "x")),
        y: Number(gsap.getProperty(world, "y")),
        rotation: Number(gsap.getProperty(pivot, "rotation")),
        portrait: portraitRef.current,
      });
    }
    const tile = tilesRef.current.find((node) => node?.dataset.slug === slug);
    if (!tile || reducedMotion() || !desktop) {
      onSelectRef.current(slug);
      return;
    }
    gsap.to(tile, {
      scale: Number(gsap.getProperty(tile, "scaleX")) * 1.15,
      duration: 0.18,
      ease: "power2.out",
      onComplete: () => onSelectRef.current(slug),
    });
  });
  const activateRef = useRef(activateTile);
  activateRef.current = activateTile;
  const firstLayout = useRef(true);
  const planeReady = useRef(false);
  const previousView = useRef({ filter, view });
  const openingSlug = useRef<string | null>(null);
  onSelectRef.current = onSelect;
  selectedRef.current = selectedSlug;

  useGSAP(
    () => {
      const world = worldRef.current;
      const pivot = pivotRef.current;
      if (!(world && pivot)) {
        return;
      }
      const media = gsap.matchMedia();
      media.add(DESKTOP_STAGE_QUERY, (context) => {
        const memoryKey = window.location.pathname;
        savedStage.current = stageMemory.get(memoryKey);
        if (savedStage.current) {
          gsap.set(world, { x: savedStage.current.x, y: savedStage.current.y });
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
          onRelease: context.add("onRelease", function (this: Draggable) {
            if (menuActiveRef.current) {
              return;
            }
            const dist = Math.hypot(this.x - pressX, this.y - pressY);
            if (dist < 10) {
              return;
            }
            const extra = gsap.utils.clamp(-2, 2, (this.x - pressX) * 0.005);
            nudgePlane(pivot, extra);
          }) as (this: Draggable) => void,
          onClick: context.add(
            "onClick",
            function (this: Draggable, event: MouseEvent) {
              if (selectedRef.current || menuActiveRef.current) {
                return;
              }
              const clicked = tileClick(event);
              if (!clicked) {
                return;
              }
              const { target, slug } = clicked;
              if (focusPreview(target)) {
                onPreviewRef.current(slug);
                return;
              }
              nudgePlane(pivot);
              activateRef.current(slug);
            }
          ) as (this: Draggable, event: MouseEvent) => void,
        });
        return () => {
          drag.kill();
          gsap.killTweensOf(pivot);
        };
      });
      return () => media.revert();
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
      const media = gsap.matchMedia();
      media.add(DESKTOP_STAGE_QUERY, (context) => {
        const reduced = reducedMotion();
        planeReady.current = false;
        const applyLayout = context.add("applyLayout", (instant = false) => {
          const state = layoutState.current;
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
            reduced: reduced || instant,
          });

          if (!ready && savedStage.current?.portrait === portrait) {
            gsap.set(pivot, {
              rotation: clampPlane(savedStage.current.rotation),
            });
          }
          const visibleItems = state.items.filter((item) => item.visible);
          const poses = layoutPoses(state.view, visibleItems.length, tw, th);
          const poseBySlug = new Map(
            visibleItems.map((item, index) => [item.project.slug, poses[index]])
          );

          const duration = firstLayout.current || reduced || instant ? 0 : 0.28;
          const locked = state.selectedSlug !== null;
          tilesRef.current.forEach((tile, index) => {
            const item = state.items[index];
            if (!(tile && item)) {
              return;
            }
            tweenTile({
              duration,
              featured: Boolean(item.project.featured),
              locked,
              pose: poseBySlug.get(item.project.slug) ?? { x: 0, y: 0 },
              selected: item.project.slug === state.selectedSlug,
              tile,
              visible: item.visible,
            });
          });
          firstLayout.current = false;
          planeReady.current = true;
        }) as (instant?: boolean) => void;

        refreshLayout.current = applyLayout;
        if (!menuActiveRef.current) {
          applyLayout();
        }
        const resize = () => {
          if (!menuActiveRef.current) {
            applyLayout();
          }
        };
        window.addEventListener("resize", resize);
        return () => {
          refreshLayout.current = null;
          window.removeEventListener("resize", resize);
          for (const tile of tilesRef.current) {
            tile?.style.removeProperty("pointer-events");
            tile?.classList.remove("is-on");
          }
        };
      });
      return () => media.revert();
    },
    { scope: stageRef }
  );

  useGSAP(
    () => {
      if (!menuActiveRef.current) {
        refreshLayout.current?.();
      }
    },
    { dependencies: [items, selectedSlug, view], scope: stageRef }
  );

  useGSAP(
    () => {
      if (
        previousView.current.filter === filter &&
        previousView.current.view === view
      ) {
        return;
      }
      previousView.current = { filter, view };
      if (!window.matchMedia(DESKTOP_STAGE_QUERY).matches) {
        if (stageRef.current) {
          stageRef.current.scrollTop = 0;
        }
        return;
      }
      const pivot = pivotRef.current;
      if (pivot && !menuActiveRef.current) {
        nudgePlane(pivot);
      }
    },
    { dependencies: [filter, view], scope: stageRef }
  );

  return (
    <section
      aria-busy={menuActive && !menuReady}
      aria-label={menuActive ? "Project list" : "Projects"}
      className="tile-stage"
      id={menuId}
      ref={stageRef}
    >
      <div aria-hidden={!menuActive} className="tile-menu-heading">
        <h2>Projects</h2>
        <span>{visibility.filter(Boolean).length}</span>
      </div>
      <div className="tile-pivot" ref={pivotRef}>
        <div className="tile-world" ref={worldRef}>
          {items.map((item, index) => (
            <TileCard
              cover={item.cover}
              key={item.project.slug}
              menuActive={menuActive}
              menuReady={menuReady}
              onOpen={() => activateTile(item.project.slug)}
              onPreview={() => onPreview(item.project.slug)}
              project={item.project}
              tileRef={(node) => {
                tilesRef.current[index] = node;
              }}
              visible={menuActive || item.visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
