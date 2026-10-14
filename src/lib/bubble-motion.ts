import gsap from "gsap";
import { type BubblePose, depthLook } from "@/lib/bubble-layout";

type MotionTimeline = ReturnType<typeof gsap.timeline>;

type AppliedLook = {
  blur: number;
  opacity: number;
  zIndex: number;
  sharp: boolean;
  pointerEvents: string;
};

type NodeParts = {
  disk: HTMLElement | null;
  label: HTMLElement | null;
};

const appliedLook = new WeakMap<HTMLElement, AppliedLook>();
const nodeParts = new WeakMap<HTMLElement, NodeParts>();

export function prefersReducedMotion() {
  return false;
}

export function motionDuration(seconds: number) {
  if (prefersReducedMotion()) {
    return 0.01;
  }
  return seconds;
}

function diskOf(node: HTMLElement) {
  return node.querySelector<HTMLElement>(".bubble-node-disk");
}

function labelOf(node: HTMLElement) {
  return node.querySelector<HTMLElement>(".bubble-node-label");
}

function partsOf(node: HTMLElement): NodeParts {
  const cached = nodeParts.get(node);
  if (cached) {
    return cached;
  }
  const parts = { disk: diskOf(node), label: labelOf(node) };
  nodeParts.set(node, parts);
  return parts;
}

function baseOpacityOf(node: HTMLElement) {
  const raw = Number(node.dataset.baseOpacity);
  if (Number.isFinite(raw) && raw > 0) {
    return raw;
  }
  return 1;
}

function nodesIn(root: HTMLElement, selector: string) {
  return gsap.utils.toArray<HTMLElement>(selector, root);
}

function pauseTweensOf(nodes: HTMLElement[]) {
  if (nodes.length === 0) {
    return;
  }
  for (const tween of gsap.getTweensOf(nodes)) {
    tween.pause();
  }
}

export function lockDepth(nodes: HTMLElement[]) {
  for (const node of nodes) {
    node.dataset.lockDepth = "1";
  }
}

export function releaseDepthLocks(root: HTMLElement) {
  for (const node of nodesIn(root, "[data-depth]")) {
    node.dataset.lockDepth = "0";
  }
}

export function teardownBubbleMotion(root: HTMLElement) {
  const targets = [
    ...nodesIn(root, "[data-depth]"),
    ...nodesIn(root, "[data-bubble-id]"),
    ...nodesIn(root, ".bubble-node-disk"),
  ];
  gsap.killTweensOf(targets);
  const world = root.querySelector<HTMLElement>(".bubble-world");
  if (world) {
    gsap.killTweensOf(world);
    gsap.set(world, { rotationX: 0, rotationY: 0, x: 0, y: 0 });
  }
  const detail = root.querySelector<HTMLElement>(".bubble-detail-panel");
  if (detail) {
    gsap.killTweensOf(detail);
  }
}

function pointerEventsFor(
  node: HTMLElement,
  look: ReturnType<typeof depthLook>
) {
  if (node.dataset.soap === "true") {
    return "none";
  }
  if (look.opacity > 0.42 && look.blur < 16) {
    return "auto";
  }
  return "none";
}

function writeLook(
  node: HTMLElement,
  look: AppliedLook,
  previous: AppliedLook | undefined
) {
  const { disk, label } = partsOf(node);
  if (!previous || previous.zIndex !== look.zIndex) {
    node.style.zIndex = String(look.zIndex);
  }
  if (!previous || previous.opacity !== look.opacity) {
    node.style.opacity = String(look.opacity);
  }
  if (!previous || previous.blur !== look.blur) {
    (disk ?? node).style.filter = `blur(${look.blur}px)`;
  }
  if (label && (!previous || previous.sharp !== look.sharp)) {
    label.style.opacity = look.sharp ? "1" : "0";
  }
  if (!previous || previous.pointerEvents !== look.pointerEvents) {
    node.style.pointerEvents = look.pointerEvents;
  }
}

export function syncDepth(node: HTMLElement) {
  if (node.dataset.lockDepth === "1") {
    return;
  }
  const z = Number(gsap.getProperty(node, "z")) || 0;
  const look = depthLook(z, baseOpacityOf(node));
  const next: AppliedLook = {
    blur: Math.round(look.blur * 100) / 100,
    opacity: Math.round(look.opacity * 1000) / 1000,
    zIndex: look.zIndex,
    sharp: look.sharp,
    pointerEvents: pointerEventsFor(node, look),
  };
  writeLook(node, next, appliedLook.get(node));
  appliedLook.set(node, next);
}

export function syncDepthTree(root: HTMLElement) {
  for (const node of nodesIn(root, "[data-depth]")) {
    syncDepth(node);
  }
}

export function startDepthTicker(root: HTMLElement) {
  syncDepthTree(root);
  if (prefersReducedMotion()) {
    return () => {
      releaseDepthLocks(root);
    };
  }
  const tick = () => {
    if (document.visibilityState !== "visible") {
      return;
    }
    syncDepthTree(root);
  };
  gsap.ticker.add(tick);
  const onVisible = () => {
    if (document.visibilityState === "visible") {
      gsap.ticker.wake();
      return;
    }
    gsap.ticker.sleep();
  };
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    document.removeEventListener("visibilitychange", onVisible);
    gsap.ticker.remove(tick);
  };
}

function poseToVars(pose: BubblePose) {
  return {
    x: pose.x,
    y: pose.y,
    z: pose.z,
    width: pose.size,
    height: pose.size,
    xPercent: -50,
    yPercent: -50,
    rotationY: 0,
    scale: 1,
    force3D: true,
  };
}

export function startDreamFloat(node: HTMLElement, pose: BubblePose) {
  gsap.set(node, { transformOrigin: "50% 50%", force3D: true });
  if (prefersReducedMotion()) {
    syncDepth(node);
    return;
  }
  const seed = Array.from(
    node.dataset.bubbleId ?? node.dataset.soap ?? "soap"
  ).reduce((total, char, index) => total + char.charCodeAt(0) * (index + 7), 0);
  const unit = (offset: number) => ((seed * (offset + 17)) % 97) / 97;
  const toward = 90 + unit(2) * 150;
  const swayX = 34 + unit(3) * 82;
  const swayY = 26 + unit(4) * 66;
  const duration = 8 + unit(5) * 7;
  const directionX = unit(6) > 0.5 ? 1 : -1;
  const directionY = unit(7) > 0.5 ? 1 : -1;
  gsap.to(node, {
    x: pose.x + swayX * directionX,
    y: pose.y + swayY * directionY,
    duration,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: unit(8) * 2.2,
    overwrite: "auto",
  });
  gsap.to(node, {
    z: pose.z + toward,
    duration: duration * 1.12,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: unit(9) * 1.8,
    overwrite: "auto",
  });
  const disk = partsOf(node).disk;
  if (disk) {
    gsap.to(disk, {
      rotateZ: directionX * (2.5 + unit(10) * 3.5),
      duration: duration * 0.86,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: unit(11) * 1.4,
      overwrite: "auto",
    });
  }
}

export function startBokehFloat(
  node: HTMLElement,
  width: number,
  height: number
) {
  const size = gsap.utils.random(70, 290);
  const pose: BubblePose = {
    x: gsap.utils.random(-0.5, 0.5) * width * 0.92,
    y: gsap.utils.random(-0.5, 0.5) * height * 0.82,
    z: gsap.utils.random(-480, 240),
    size,
    opacity: gsap.utils.random(0.4, 0.8),
  };
  node.dataset.baseOpacity = String(pose.opacity);
  gsap.set(node, poseToVars(pose));
  syncDepth(node);
  startDreamFloat(node, pose);
}

export function ensureBokehFloats(
  soaps: HTMLElement[],
  width: number,
  height: number
) {
  for (const soap of soaps) {
    if (!gsap.getTweensOf(soap).length) {
      startBokehFloat(soap, width, height);
    }
  }
}

export function tweenNodeToPose(
  node: HTMLElement,
  pose: BubblePose,
  duration: number
) {
  gsap.killTweensOf(node);
  const disk = partsOf(node).disk;
  if (disk) {
    gsap.killTweensOf(disk);
  }
  node.dataset.lockDepth = "0";
  node.dataset.baseOpacity = String(pose.opacity);
  const vars = poseToVars(pose);
  const first = node.dataset.laidOut !== "1";
  node.dataset.laidOut = "1";
  if (first) {
    gsap.set(node, vars);
    startDreamFloat(node, pose);
  } else {
    gsap.to(node, {
      ...vars,
      duration,
      ease: "power3.inOut",
      overwrite: true,
      onComplete: () => startDreamFloat(node, pose),
    });
  }
  if (disk) {
    gsap.to(disk, {
      borderRadius: "50%",
      duration: first ? 0 : duration,
      ease: "power3.inOut",
      overwrite: true,
    });
  }
}

export function applyIdleLayout(
  nodes: HTMLElement[],
  poses: Map<string, BubblePose>,
  duration: number
) {
  for (const node of nodes) {
    const id = node.dataset.bubbleId;
    const pose = id ? poses.get(id) : undefined;
    if (pose) {
      tweenNodeToPose(node, pose, duration);
    }
  }
}

export function collapseDetail(detail: HTMLElement | null) {
  if (!detail) {
    return;
  }
  gsap.to(detail, { autoAlpha: 0, duration: 0.22, overwrite: true });
}

function recedeOthers(
  timeline: MotionTimeline,
  others: HTMLElement[],
  duration: number
) {
  timeline.to(
    others,
    {
      z: -520,
      opacity: 0.1,
      scale: 0.72,
      duration,
      stagger: 0.012,
      pointerEvents: "none",
    },
    "expand"
  );
}

function expandActive(options: {
  timeline: MotionTimeline;
  active: HTMLElement | undefined;
  width: number;
  height: number;
  duration: number;
}) {
  if (!options.active) {
    return;
  }
  const { disk, label } = partsOf(options.active);
  options.timeline.to(
    options.active,
    {
      x: 0,
      y: 0,
      z: 168,
      xPercent: -50,
      yPercent: -50,
      width: options.width,
      height: options.height,
      scale: 1,
      opacity: 1,
      duration: options.duration,
    },
    "expand"
  );
  if (disk) {
    options.timeline.to(
      disk,
      {
        borderRadius: "1.7rem",
        filter: "blur(0px)",
        duration: options.duration,
      },
      "expand"
    );
  }
  if (label) {
    options.timeline.to(label, { opacity: 0, duration: 0.18 }, "expand");
  }
}

function revealDetail(
  timeline: MotionTimeline,
  detail: HTMLElement | null,
  duration: number
) {
  if (!detail) {
    return;
  }
  gsap.set(detail, { autoAlpha: 0, pointerEvents: "auto" });
  timeline.to(detail, { autoAlpha: 1, duration }, "detail");
}

export function expandSelectedBubble(options: {
  stage: HTMLElement;
  detail: HTMLElement | null;
  selectedSlug: string;
  width: number;
  height: number;
}) {
  const nodes = nodesIn(options.stage, "[data-bubble-id]");
  const active = nodes.find(
    (node) => node.dataset.bubbleId === options.selectedSlug
  );
  const others = nodes.filter(
    (node) => node.dataset.bubbleId !== options.selectedSlug
  );
  gsap.killTweensOf(nodes);
  pauseTweensOf(nodesIn(options.stage, "[data-soap]"));
  lockDepth(nodes);
  const timeline = gsap.timeline({
    defaults: { ease: "power3.inOut" },
  });
  timeline.addLabel("expand", 0);
  timeline.addLabel("detail", 0.38);
  recedeOthers(timeline, others, motionDuration(0.55));
  expandActive({
    timeline,
    active,
    width: Math.min(920, options.width * 0.78),
    height: Math.min(700, options.height * 0.74),
    duration: motionDuration(0.9),
  });
  revealDetail(timeline, options.detail, motionDuration(0.42));
  return timeline;
}

export function attachParallax(world: HTMLElement) {
  if (prefersReducedMotion()) {
    return () => {
      gsap.set(world, { rotationX: 0, rotationY: 0, x: 0, y: 0 });
    };
  }
  const stage = world.parentElement;
  if (!stage) {
    return () => {
      gsap.set(world, { rotationX: 0, rotationY: 0, x: 0, y: 0 });
    };
  }
  let bounds = stage.getBoundingClientRect();
  const refreshBounds = () => {
    bounds = stage.getBoundingClientRect();
  };
  const rotateX = gsap.quickTo(world, "rotationX", {
    duration: 1.15,
    ease: "power3.out",
  });
  const rotateY = gsap.quickTo(world, "rotationY", {
    duration: 1.15,
    ease: "power3.out",
  });
  const shiftX = gsap.quickTo(world, "x", {
    duration: 1.3,
    ease: "power3.out",
  });
  const shiftY = gsap.quickTo(world, "y", {
    duration: 1.3,
    ease: "power3.out",
  });
  const onMove = (event: PointerEvent) => {
    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }
    const nx = gsap.utils.clamp(
      -0.5,
      0.5,
      (event.clientX - bounds.left) / bounds.width - 0.5
    );
    const ny = gsap.utils.clamp(
      -0.5,
      0.5,
      (event.clientY - bounds.top) / bounds.height - 0.5
    );
    rotateY(nx * 13);
    rotateX(-ny * 9);
    shiftX(nx * -22);
    shiftY(ny * -14);
  };
  const reset = () => {
    rotateX(0);
    rotateY(0);
    shiftX(0);
    shiftY(0);
  };
  const observer = new ResizeObserver(refreshBounds);
  observer.observe(stage);
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("blur", reset);
  return () => {
    observer.disconnect();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("blur", reset);
    gsap.to(world, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      duration: 0.6,
      overwrite: true,
    });
  };
}
