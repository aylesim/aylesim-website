import gsap from "gsap";
import { cardMenuLayout } from "@/lib/card-menu-layout";

export type MenuElements = {
  stage: HTMLElement;
  pivot: HTMLElement;
  world: HTMLElement;
  tiles: HTMLElement[];
  images: (HTMLElement | null)[];
  labels: NodeListOf<HTMLElement>;
  heading: HTMLElement | null;
};

export function cardGeometry(tile: HTMLElement, rotation: number) {
  const rect = tile.getBoundingClientRect();
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
    width: tile.offsetWidth || 200,
    height: tile.offsetHeight || 144,
    scale: Number(gsap.getProperty(tile, "scaleX")),
    rotation,
    opacity: tile.hidden ? 0 : Number(gsap.getProperty(tile, "opacity")),
    hidden: tile.hidden,
  };
}

export type CardGeometry = ReturnType<typeof cardGeometry>;
type CardTarget = Partial<Omit<CardGeometry, "hidden">> & {
  backgroundColor: string;
  borderBottomColor: string;
  image?: { x: number; y: number; width: number; height: number };
};

export function placeCards(elements: MenuElements, origin: CardGeometry[]) {
  gsap.set(elements.pivot, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    left: 0,
    top: 0,
  });
  gsap.set(elements.world, { x: 0, y: 0 });
  elements.tiles.forEach((tile, index) => {
    const { hidden, ...source } = origin[index];
    tile.hidden = false;
    tile.inert = false;
    tile.setAttribute("aria-hidden", "false");
    gsap.set(tile, {
      ...source,
      x: hidden ? window.innerWidth / 2 : source.x,
      y: hidden ? window.innerHeight / 2 : source.y,
      xPercent: -50,
      yPercent: -50,
      pointerEvents: "auto",
      borderBottom: "1px solid transparent",
    });
    const image = elements.images[index];
    if (image) {
      gsap.set(image, {
        width: source.width,
        height: source.height,
        x: 0,
        y: 0,
      });
    }
  });
  gsap.set(elements.labels, { autoAlpha: 0 });
  gsap.set(elements.heading, { autoAlpha: 0 });
}

function tweenCards(
  timeline: gsap.core.Timeline,
  elements: MenuElements,
  targets: CardTarget[],
  { start, stagger }: { start: number; stagger: number }
) {
  let visibleIndex = 0;
  elements.tiles.forEach((tile, index) => {
    const { image, ...target } = targets[index];
    const order = visibleIndex;
    if (target.opacity !== 0) {
      visibleIndex += 1;
    }
    const at = start + order * stagger;
    timeline.to(tile, target, at);
    const imageElement = elements.images[index];
    if (imageElement && image) {
      timeline.to(imageElement, image, at);
    }
  });
}

function filteredTargets(
  targets: CardTarget[],
  visible: readonly boolean[]
): CardTarget[] {
  let row = 0;
  return visible.map((shown) => {
    if (shown) {
      const target = targets[row];
      row += 1;
      return target;
    }
    return {
      opacity: 0,
      scale: 0.96,
      backgroundColor: "transparent",
      borderBottomColor: "transparent",
    };
  });
}

function fieldTargets(origin: CardGeometry[]): CardTarget[] {
  return origin.map(({ hidden: _hidden, ...source }) => ({
    ...source,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    image: { x: 0, y: 0, width: source.width, height: source.height },
  }));
}

function menuTargets(layout: ReturnType<typeof cardMenuLayout>): CardTarget[] {
  return layout.rows.map((row) => ({
    ...row,
    width: layout.width,
    height: layout.rowHeight,
    rotation: 0,
    scale: 1,
    opacity: 1,
    backgroundColor: "#080808",
    borderBottomColor: "#ffffff26",
    image: {
      x: 12,
      y: (layout.rowHeight - layout.thumbnailHeight) / 2,
      width: layout.thumbnailWidth,
      height: layout.thumbnailHeight,
    },
  }));
}

function queueTargets(layout: ReturnType<typeof cardMenuLayout>): CardTarget[] {
  return layout.queue.map((card) => ({
    ...card,
    y: window.innerHeight * 0.45,
    width: layout.queueWidth,
    height: layout.queueHeight,
    rotation: 0,
    scale: 1,
    opacity: 1,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    image: { x: 0, y: 0, width: layout.queueWidth, height: layout.queueHeight },
  }));
}

export function animateCardMenu({
  elements,
  origin,
  visible,
  open,
  queue,
  onComplete,
}: {
  elements: MenuElements;
  origin: CardGeometry[];
  visible: readonly boolean[];
  open: boolean;
  queue: boolean;
  onComplete: () => void;
}) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = visible.filter(Boolean).length;
  const layout = cardMenuLayout(window.innerWidth, count);
  const duration = reduced ? 0 : 0.48;
  const stagger = reduced ? 0 : 0.012;
  const split =
    reduced || !queue ? 0 : duration + Math.max(0, count - 1) * stagger + 0.08;
  const fade = reduced ? 0 : 0.24;
  gsap.set(elements.stage, {
    "--card-menu-height": `${layout.height}px`,
    "--card-menu-thumb": `${layout.thumbnailWidth}px`,
  });
  gsap.set(elements.heading, {
    x: window.innerWidth / 2,
    y: layout.top - 48,
    xPercent: -50,
    width: layout.width,
  });
  const timeline = gsap.timeline({
    defaults: { ease: "power3.inOut", duration, overwrite: "auto" },
    onComplete,
  });
  timeline.to(elements.stage, { scrollTop: 0, duration: fade }, 0);
  timeline.to(
    [elements.heading, ...elements.labels],
    { autoAlpha: 0, duration: fade / 2 },
    0
  );
  if (queue && !reduced) {
    tweenCards(
      timeline,
      elements,
      filteredTargets(queueTargets(layout), visible),
      { start: 0, stagger }
    );
  }
  const targets = open
    ? filteredTargets(menuTargets(layout), visible)
    : fieldTargets(origin);
  tweenCards(timeline, elements, targets, { start: split, stagger });
  if (open) {
    timeline.to(
      elements.labels,
      { autoAlpha: 1, duration: fade, stagger },
      split + fade
    );
    timeline.to(elements.heading, { autoAlpha: 1, duration: fade }, split);
  }
  return timeline;
}
