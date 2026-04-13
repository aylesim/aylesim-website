"use client";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface CanvasItem {
  id: string;
  src: string;
  label: string;
  projectSlug: string;
  stackKey: number;
  isVideo?: boolean;
}

const CANVAS_TOP_SLUG_BOOST = 1_000_000;
const CANVAS_STACK_EPS = 1e-6;

function canvasTopBoost(slug: string): number {
  if (slug === "birds") {
    return CANVAS_TOP_SLUG_BOOST + 10_000;
  }
  if (slug === "tedx-barletta") {
    return CANVAS_TOP_SLUG_BOOST;
  }
  return 0;
}

function itemStackKey(p: Project, ordinal: number): number {
  return p.stackOrder + canvasTopBoost(p.slug) + ordinal * CANVAS_STACK_EPS;
}

function pushCanvasItem(
  items: CanvasItem[],
  p: Project,
  partial: Pick<CanvasItem, "id" | "src" | "label" | "projectSlug"> & {
    isVideo?: boolean;
  },
  ordMap: Map<string, number>
): void {
  const o = ordMap.get(p.slug) ?? 0;
  ordMap.set(p.slug, o + 1);
  items.push({
    ...partial,
    stackKey: itemStackKey(p, o),
  });
}

const hostnameWwwPrefix = /^www\./;
const vimeoPlayerPath = /^\/video\/(\d+)/;
const vimeoVideoInPath = /\/video\/(\d+)/;
const vimeoNumericSegment = /^\d+$/;
const CANVAS_FALLBACK_SRC = "/planetary.png";

function youtubeVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    if (u.hostname === "www.youtube.com" || u.hostname === "youtube.com") {
      return u.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

function vimeoVideoId(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.replace(hostnameWwwPrefix, "");
    if (host === "player.vimeo.com") {
      const m = u.pathname.match(vimeoPlayerPath);
      return m?.[1] ?? null;
    }
    if (host === "vimeo.com") {
      const videoPath = u.pathname.match(vimeoVideoInPath);
      if (videoPath) {
        return videoPath[1];
      }
      const segments = u.pathname.split("/").filter(Boolean);
      for (const seg of segments) {
        if (vimeoNumericSegment.test(seg)) {
          return seg;
        }
      }
    }
  } catch {
    return null;
  }
  return null;
}

function thumbnailUrlForVideo(url: string): string | null {
  const yt = youtubeVideoId(url);
  if (yt) {
    return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
  }
  const vm = vimeoVideoId(url);
  if (vm) {
    return `https://vumbnail.com/${vm}.jpg`;
  }
  return null;
}

const CANVAS_SINGLE_IMAGE_SLUG = "there-will-be-no-more-determination";

function addProjectImageItems(
  p: Project,
  items: CanvasItem[],
  seen: Set<string>,
  usedSrc: Set<string>,
  ordMap: Map<string, number>
): void {
  const imgs =
    p.slug === CANVAS_SINGLE_IMAGE_SLUG ? p.images.slice(0, 1) : p.images;
  for (const src of imgs) {
    if (usedSrc.has(src)) {
      continue;
    }
    const key = `${p.slug}::img::${src}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    usedSrc.add(src);
    pushCanvasItem(
      items,
      p,
      {
        id: `${p.slug}--img--${src}`,
        src,
        label: p.title,
        projectSlug: p.slug,
      },
      ordMap
    );
  }
}

function addCanvasCoverItem(
  p: Project,
  items: CanvasItem[],
  seen: Set<string>,
  usedSrc: Set<string>,
  ordMap: Map<string, number>
): void {
  if (countItemsForSlug(items, p.slug) > 0) {
    return;
  }
  const cover = p.canvasCover;
  if (!cover || usedSrc.has(cover)) {
    return;
  }
  const key = `${p.slug}::cover::${cover}`;
  if (seen.has(key)) {
    return;
  }
  seen.add(key);
  usedSrc.add(cover);
  pushCanvasItem(
    items,
    p,
    {
      id: `${p.slug}--cover--${cover}`,
      src: cover,
      label: p.title,
      projectSlug: p.slug,
    },
    ordMap
  );
}

function countItemsForSlug(items: CanvasItem[], slug: string): number {
  let n = 0;
  for (const it of items) {
    if (it.projectSlug === slug) {
      n++;
    }
  }
  return n;
}

function ensureFallbackVideoItem(
  p: Project,
  items: CanvasItem[],
  seen: Set<string>,
  usedSrc: Set<string>,
  ordMap: Map<string, number>
): void {
  for (const v of p.videos ?? []) {
    const thumb = thumbnailUrlForVideo(v.url);
    if (!thumb) {
      continue;
    }
    if (usedSrc.has(thumb)) {
      continue;
    }
    const key = `${p.slug}::video::${thumb}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    usedSrc.add(thumb);
    pushCanvasItem(
      items,
      p,
      {
        id: `${p.slug}--video--${hashString(v.url)}`,
        src: thumb,
        label: p.title,
        projectSlug: p.slug,
        isVideo: true,
      },
      ordMap
    );
    return;
  }
}

function buildItems(projects: Project[]): CanvasItem[] {
  const items: CanvasItem[] = [];
  const seen = new Set<string>();
  const usedSrc = new Set<string>();
  const ordMap = new Map<string, number>();
  for (const p of projects) {
    addProjectImageItems(p, items, seen, usedSrc, ordMap);
  }
  for (const p of projects) {
    addCanvasCoverItem(p, items, seen, usedSrc, ordMap);
  }
  for (const p of projects) {
    if (countItemsForSlug(items, p.slug) === 0) {
      ensureFallbackVideoItem(p, items, seen, usedSrc, ordMap);
    }
  }
  items.sort((a, b) => {
    if (a.stackKey < b.stackKey) {
      return -1;
    }
    if (a.stackKey > b.stackKey) {
      return 1;
    }
    return a.id.localeCompare(b.id);
  });
  return items;
}

function lcg(seed: number) {
  const mod = 2_147_483_648;
  let s = seed % mod;
  return () => {
    s = (s * 1_664_525 + 1_013_904_223) % mod;
    return s / mod;
  };
}

function hashString(s: string): number {
  const mod = 2_147_483_647;
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) % mod;
  }
  return Math.abs(h);
}

const CANVAS_IMG_PX = 320;
const CANVAS_EDGE_PAD = 10;

function centerFarEnough(
  cx: number,
  cy: number,
  centers: { cx: number; cy: number }[],
  minDist: number
): boolean {
  for (const p of centers) {
    const dx = cx - p.cx;
    const dy = cy - p.cy;
    if (Math.hypot(dx, dy) < minDist) {
      return false;
    }
  }
  return true;
}

function layoutCardsScattered(
  cards: HTMLElement[],
  width: number,
  height: number,
  rand: () => number,
  relayout = false
): void {
  const centers: { cx: number; cy: number }[] = [];
  const maxAttempts = 180;

  for (const card of cards) {
    const cw = card.offsetWidth || CANVAS_IMG_PX;
    const ch = card.offsetHeight || CANVAS_IMG_PX;
    const spanX = Math.max(CANVAS_EDGE_PAD, width - cw - CANVAS_EDGE_PAD * 2);
    const spanY = Math.max(CANVAS_EDGE_PAD, height - ch - CANVAS_EDGE_PAD * 2);
    const minDist = Math.min(cw, ch) * 0.38 + Math.max(cw, ch) * 0.06 + 22;

    let x = CANVAS_EDGE_PAD;
    let y = CANVAS_EDGE_PAD;
    let placed = false;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const tx = rand() * spanX + CANVAS_EDGE_PAD;
      const ty = rand() * spanY + CANVAS_EDGE_PAD;
      const cx = tx + cw / 2;
      const cy = ty + ch / 2;
      if (centerFarEnough(cx, cy, centers, minDist)) {
        x = tx;
        y = ty;
        placed = true;
        break;
      }
    }
    if (!placed) {
      x = rand() * spanX + CANVAS_EDGE_PAD;
      y = rand() * spanY + CANVAS_EDGE_PAD;
    }
    centers.push({ cx: x + cw / 2, cy: y + ch / 2 });
    if (relayout) {
      gsap.to(card, { x, y, duration: 0.45, ease: "power2.out" });
    } else {
      gsap.set(card, { x, y, opacity: 0, scale: 0.88 });
    }
  }
}

export function DraggableCanvas({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (slug: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragsRef = useRef<InstanceType<typeof Draggable>[]>([]);
  const draggedRef = useRef(new WeakSet<Element>());
  const items = buildItems(projects);
  const [brokenIds, setBrokenIds] = useState<Record<string, true>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) {
      return;
    }

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    if (w === 0 || h === 0) {
      return;
    }
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(".canvas-card")
    );
    layoutCardsScattered(cards, w, h, lcg(17));

    gsap.to(cards, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: { each: 0.055, from: "random" },
      ease: "back.out(1.4)",
    });

    dragsRef.current = Draggable.create(cards, {
      bounds: container,
      onDragStart() {
        gsap.to(this.target, {
          scale: 1.07,
          duration: 0.18,
          ease: "power2.out",
        });
        gsap.set(this.target, { zIndex: 500 });
      },
      onDrag() {
        draggedRef.current.add(this.target as Element);
      },
      onDragEnd() {
        gsap.to(this.target, {
          scale: 1,
          duration: 0.38,
          ease: "back.out(1.7)",
        });
        setTimeout(() => {
          draggedRef.current.delete(this.target as Element);
        }, 80);
      },
    });

    let prevW = w;
    let prevH = h;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      const newW = container.offsetWidth;
      const newH = container.offsetHeight;
      if (newW === prevW && newH === prevH) {
        return;
      }
      prevW = newW;
      prevH = newH;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (newW === 0 || newH === 0) {
          return;
        }
        layoutCardsScattered(cards, newW, newH, lcg(17), true);
      }, 200);
    });
    observer.observe(container);

    return () => {
      clearTimeout(resizeTimer);
      observer.disconnect();
      for (const d of dragsRef.current) {
        d.kill();
      }
    };
  }, [items.length]);

  return (
    <div className="absolute inset-0 overflow-hidden" ref={containerRef}>
      {items.map((item, i) => (
        <button
          className="canvas-card absolute cursor-grab text-left active:cursor-grabbing"
          key={item.id}
          onClick={(e) => {
            if (draggedRef.current.has(e.currentTarget)) {
              return;
            }
            onProjectClick(item.projectSlug);
          }}
          style={{ opacity: 0, zIndex: 20 + i }}
          type="button"
        >
          <div className="relative overflow-hidden rounded-lg border border-white/25 shadow-[0_20px_55px_rgba(0,0,0,0.75)] ring-1 ring-white/10 ring-inset">
            {item.isVideo ? (
              <>
                <Image
                  alt={item.label}
                  className="block select-none"
                  draggable={false}
                  height={Math.round((CANVAS_IMG_PX * 9) / 16)}
                  onError={() =>
                    setBrokenIds((prev) => {
                      if (prev[item.id]) {
                        return prev;
                      }
                      return { ...prev, [item.id]: true };
                    })
                  }
                  src={brokenIds[item.id] ? CANVAS_FALLBACK_SRC : item.src}
                  style={{ height: "auto", width: CANVAS_IMG_PX }}
                  unoptimized
                  width={CANVAS_IMG_PX}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55">
                    <div className="ml-1 h-0 w-0 border-y-[6px] border-y-transparent border-l-[11px] border-l-white" />
                  </div>
                </div>
              </>
            ) : (
              <Image
                alt={item.label}
                className="block select-none"
                draggable={false}
                height={CANVAS_IMG_PX}
                onError={() =>
                  setBrokenIds((prev) => {
                    if (prev[item.id]) {
                      return prev;
                    }
                    return { ...prev, [item.id]: true };
                  })
                }
                src={brokenIds[item.id] ? CANVAS_FALLBACK_SRC : item.src}
                style={{ height: "auto", width: CANVAS_IMG_PX }}
                unoptimized
                width={CANVAS_IMG_PX}
              />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
