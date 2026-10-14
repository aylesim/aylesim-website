import gsap from "gsap";
import {
  type BubblePose,
  CAMERA_DISTANCE,
  constrainBubblePose,
  depthLook,
  TUNNEL_DEPTH,
  TUNNEL_FAR_Z,
} from "@/lib/bubble-layout";

type MotionTimeline = ReturnType<typeof gsap.timeline>;

type AppliedLook = {
  blur: number;
  opacity: number;
  zIndex: number;
  labelOpacity: number;
  pointerEvents: string;
};

type NodeParts = {
  disk: HTMLElement | null;
  label: HTMLElement | null;
};

const appliedLook = new WeakMap<HTMLElement, AppliedLook>();
const nodeParts = new WeakMap<HTMLElement, NodeParts>();
const pointerFocus = new WeakMap<HTMLElement, { amount: number }>();

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function motionDuration(seconds: number) {
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
    appliedLook.delete(node);
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

function pointerEventsFor(node: HTMLElement) {
  if (node.dataset.soap === "true") {
    return "none";
  }
  return "auto";
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
  if (label && (!previous || previous.labelOpacity !== look.labelOpacity)) {
    label.style.opacity = String(look.labelOpacity);
  }
  if (!previous || previous.pointerEvents !== look.pointerEvents) {
    node.style.pointerEvents = look.pointerEvents;
  }
}

export function syncDepth(node: HTMLElement) {
  if (node.dataset.lockDepth === "1") {
    return;
  }
  const z = Number(node.dataset.depthZ) || 0;
  const look = depthLook(z, baseOpacityOf(node));
  const focus = pointerFocus.get(node)?.amount ?? 0;
  const next: AppliedLook = {
    blur: Math.round(look.blur * (1 - focus) ** 2),
    opacity:
      Math.round((look.opacity + (1 - look.opacity) * focus) * 1000) / 1000,
    zIndex: look.zIndex + Math.round(focus * 800),
    labelOpacity: look.sharp ? 1 : Math.round(focus * 1000) / 1000,
    pointerEvents: pointerEventsFor(node),
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
  gsap.ticker.lagSmoothing(1000, 33);
  gsap.ticker.wake();
  syncDepthTree(root);
  let frames = 0;
  const tick = () => {
    if (document.visibilityState !== "visible") {
      return;
    }
    frames += 1;
    if (frames % 2 !== 0) {
      return;
    }
    syncDepthTree(root);
  };
  gsap.ticker.add(tick);
  const onVisible = () => {
    if (document.visibilityState === "visible") {
      gsap.ticker.wake();
    }
  };
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    document.removeEventListener("visibilitychange", onVisible);
    gsap.ticker.remove(tick);
  };
}

function projectScale(z: number) {
  return (
    CAMERA_DISTANCE / (CAMERA_DISTANCE - Math.min(z, CAMERA_DISTANCE - 80))
  );
}

function poseToVars(pose: Pick<BubblePose, "x" | "y" | "z" | "size">) {
  const depth = projectScale(pose.z);
  return {
    x: pose.x * depth,
    y: pose.y * depth,
    z: 0,
    width: pose.size,
    height: pose.size,
    xPercent: -50,
    yPercent: -50,
    rotationY: 0,
    scale: depth,
    force3D: true,
  };
}

export function startDreamFloat(node: HTMLElement, pose: BubblePose) {
  gsap.set(node, { transformOrigin: "50% 50%", force3D: true });
  const space = node.closest<HTMLElement>(".bubble-space");
  const width = space?.clientWidth || window.innerWidth;
  const height = space?.clientHeight || window.innerHeight;
  const seed = Array.from(
    node.dataset.bubbleId ?? node.dataset.soap ?? "soap"
  ).reduce((total, char, index) => total + char.charCodeAt(0) * (index + 7), 0);
  const unit = (offset: number) => ((seed * (offset + 17)) % 97) / 97;
  const duration = 8 + unit(5) * 7;
  const directionX = unit(6) > 0.5 ? 1 : -1;
  const directionY = unit(7) > 0.5 ? 1 : -1;
  const floated = constrainBubblePose({
    x: pose.x + (16 + unit(3) * 28) * directionX,
    y: pose.y + (12 + unit(4) * 22) * directionY,
    z: pose.z + 36 + unit(2) * 54,
    size: pose.size,
    width,
    height,
  });
  node.dataset.depthZ = String(pose.z);
  const next = poseToVars({ ...floated, size: pose.size });
  gsap.to(node, {
    x: next.x,
    y: next.y,
    scale: next.scale,
    duration,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: unit(8) * 2.2,
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
  const position = constrainBubblePose({
    x: gsap.utils.random(-0.5, 0.5) * width * 0.92,
    y: gsap.utils.random(-0.5, 0.5) * height * 0.82,
    z: gsap.utils.random(-480, 240),
    size,
    width,
    height,
  });
  const pose: BubblePose = {
    ...position,
    size,
    opacity: gsap.utils.random(0.4, 0.8),
  };
  node.dataset.bokehWidth = String(width);
  node.dataset.bokehHeight = String(height);
  node.dataset.baseOpacity = String(pose.opacity);
  node.dataset.depthZ = String(pose.z);
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
    const tweens = gsap.getTweensOf(soap);
    const layoutChanged =
      Number(soap.dataset.bokehWidth) !== width ||
      Number(soap.dataset.bokehHeight) !== height;
    if (tweens.length && !layoutChanged) {
      for (const tween of tweens) {
        tween.play();
      }
    } else {
      gsap.killTweensOf(soap);
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
  node.dataset.depthZ = String(pose.z);
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

function loopTunnelDepth(z: number) {
  const relative = z - TUNNEL_FAR_Z;
  return (
    (((relative % TUNNEL_DEPTH) + TUNNEL_DEPTH) % TUNNEL_DEPTH) + TUNNEL_FAR_Z
  );
}

type TunnelEntry = {
  node: HTMLElement;
  pose: BubblePose;
  phase: number;
};

/**
 * Runs a camera through a short, looping depth field. Scroll affects only the
 * camera's z progress; each object keeps a small independent lateral drift.
 */
export function startTunnelMotion(options: {
  root: HTMLElement;
  nodes: HTMLElement[];
  poses: Map<string, BubblePose>;
}) {
  const reduced = prefersReducedMotion();
  const entries: TunnelEntry[] = [];
  for (const node of options.nodes) {
    const id = node.dataset.bubbleId;
    if (!id) {
      continue;
    }
    const pose = options.poses.get(id);
    if (!pose) {
      continue;
    }
    gsap.killTweensOf(node);
    gsap.killTweensOf(partsOf(node).disk);
    entries.push({
      node,
      pose,
      phase: hashPhase(id),
    });
  }

  let travel = 0;
  let velocity = 0;
  let elapsed = 0;
  const render = () => {
    for (const entry of entries) {
      const z = loopTunnelDepth(entry.pose.z + travel);
      const depth = projectScale(z);
      const driftX = reduced
        ? 0
        : Math.sin(elapsed * 0.000_22 + entry.phase) * 19;
      const driftY = reduced
        ? 0
        : Math.cos(elapsed * 0.000_17 + entry.phase * 1.7) * 15;
      entry.node.dataset.lockDepth = "0";
      entry.node.dataset.baseOpacity = String(entry.pose.opacity);
      entry.node.dataset.depthZ = String(z);
      entry.node.dataset.laidOut = "1";
      gsap.set(entry.node, {
        x: (entry.pose.x + driftX) * depth,
        y: (entry.pose.y + driftY) * depth,
        z: 0,
        width: entry.pose.size,
        height: entry.pose.size,
        xPercent: -50,
        yPercent: -50,
        scale: depth,
        force3D: true,
      });
      syncDepth(entry.node);
    }
  };
  const tick = (_time: number, delta: number) => {
    if (document.visibilityState !== "visible") {
      return;
    }
    elapsed += delta;
    if (!reduced) {
      const step = delta / 16.667;
      travel += velocity * step;
      velocity *= 0.885 ** step;
      if (Math.abs(velocity) < 0.01) {
        velocity = 0;
      }
    }
    render();
  };
  const onWheel = (event: WheelEvent) => {
    event.preventDefault();
    const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 18 : 1;
    const delta = event.deltaY * unit;
    if (reduced) {
      travel += delta * 0.14;
      render();
      return;
    }
    velocity = gsap.utils.clamp(-30, 30, velocity + delta * 0.2);
  };

  options.root.addEventListener("wheel", onWheel, { passive: false });
  gsap.ticker.add(tick);
  render();
  return () => {
    options.root.removeEventListener("wheel", onWheel);
    gsap.ticker.remove(tick);
    gsap.killTweensOf(entries.map((entry) => entry.node));
  };
}

function hashPhase(id: string) {
  let value = 0;
  for (let index = 0; index < id.length; index += 1) {
    value = (value * 31 + id.charCodeAt(index)) % 360;
  }
  return (value * Math.PI) / 180;
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
  gsap.ticker.wake();
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

type PointerEntry = {
  node: HTMLElement;
  soap: boolean;
  focus: { amount: number };
  focusTarget: number;
  focusTo: ReturnType<typeof gsap.quickTo>;
  target: HTMLElement | null;
  motionX: number;
  motionY: number;
  motionScale: number;
  xTo: ReturnType<typeof gsap.quickTo> | undefined;
  yTo: ReturnType<typeof gsap.quickTo> | undefined;
  scaleXTo: ReturnType<typeof gsap.quickTo> | undefined;
  scaleYTo: ReturnType<typeof gsap.quickTo> | undefined;
};

type ScreenPoint = {
  x: number;
  y: number;
  r: number;
  z: number;
  scale: number;
};

function focusFalloff(distance: number, radius: number) {
  const t = gsap.utils.clamp(0, 1, (distance - radius) / 130);
  return (1 - t * t * (3 - 2 * t)) * 0.18;
}

function makePointerEntry(node: HTMLElement): PointerEntry {
  const focus = { amount: 0 };
  pointerFocus.set(node, focus);
  const target = node.querySelector<HTMLElement>(".bubble-node-button");
  return {
    node,
    soap: node.dataset.soap === "true",
    focus,
    focusTarget: 0,
    focusTo: gsap.quickTo(focus, "amount", {
      duration: 0.3,
      ease: "power2.out",
    }),
    target,
    motionX: 0,
    motionY: 0,
    motionScale: 1,
    xTo: target
      ? gsap.quickTo(target, "x", { duration: 0.42, ease: "power3.out" })
      : undefined,
    yTo: target
      ? gsap.quickTo(target, "y", { duration: 0.42, ease: "power3.out" })
      : undefined,
    scaleXTo: target
      ? gsap.quickTo(target, "scaleX", {
          duration: 0.42,
          ease: "power2.out",
        })
      : undefined,
    scaleYTo: target
      ? gsap.quickTo(target, "scaleY", {
          duration: 0.42,
          ease: "power2.out",
        })
      : undefined,
  };
}

function screenOf(entry: PointerEntry, bounds: DOMRect): ScreenPoint {
  const x = Number(gsap.getProperty(entry.node, "x")) || 0;
  const y = Number(gsap.getProperty(entry.node, "y")) || 0;
  const size = Number(gsap.getProperty(entry.node, "width")) || 0;
  const scale = Number(gsap.getProperty(entry.node, "scale")) || 1;
  const z = Number(entry.node.dataset.depthZ) || 0;
  return {
    x: bounds.left + bounds.width * 0.5 + x + entry.motionX * scale,
    y: bounds.top + bounds.height * 0.48 + y + entry.motionY * scale,
    r: (size * scale) / 2,
    z,
    scale,
  };
}

function fieldAmount(
  entry: PointerEntry,
  point: ScreenPoint,
  active: PointerEntry | null,
  activeScreen: ScreenPoint | undefined
) {
  let amount = 0;
  if (activeScreen) {
    amount = focusFalloff(
      Math.hypot(point.x - activeScreen.x, point.y - activeScreen.y),
      activeScreen.r
    );
  }
  if (entry === active || entry.node.contains(document.activeElement)) {
    amount = 0.72;
  }
  if (entry.soap) {
    amount *= 0.65;
  }
  return amount;
}

function magnetPose(options: {
  entry: PointerEntry;
  point: ScreenPoint;
  active: PointerEntry | null;
  activeScreen: ScreenPoint | undefined;
  reduced: boolean;
}) {
  const { entry, point, active, activeScreen, reduced } = options;
  if (reduced || entry.soap || !activeScreen) {
    return { x: 0, y: 0, scale: 1 };
  }
  if (entry === active) {
    return { x: 0, y: -3 / point.scale, scale: 1.025 };
  }
  return { x: 0, y: 0, scale: 1 };
}

export function attachPointerFocus(world: HTMLElement) {
  const reduced = prefersReducedMotion();
  const nodes = nodesIn(world, "[data-depth]");
  gsap.set(world, { rotationX: 0, rotationY: 0, x: 0, y: 0 });
  const entries = nodes.map(makePointerEntry);
  const projects = entries.filter((entry) => !entry.soap);
  let hot: PointerEntry | null = null;
  const updateAmount = (entry: PointerEntry, amount: number) => {
    if (Math.abs(amount - entry.focusTarget) <= 0.002) {
      return;
    }
    entry.focusTarget = amount;
    if (reduced) {
      entry.focus.amount = amount;
      return;
    }
    entry.focusTo.tween.duration(amount > entry.focus.amount ? 0.3 : 0.65);
    entry.focusTo(amount);
  };
  const updateVisual = (
    entry: PointerEntry,
    x: number,
    y: number,
    scale: number
  ) => {
    if (Math.abs(x - entry.motionX) > 0.01) {
      entry.motionX = x;
      entry.xTo?.(x);
    }
    if (Math.abs(y - entry.motionY) > 0.01) {
      entry.motionY = y;
      entry.yTo?.(y);
    }
    if (Math.abs(scale - entry.motionScale) > 0.0001) {
      entry.motionScale = scale;
      entry.scaleXTo?.(scale);
      entry.scaleYTo?.(scale);
    }
  };
  const setHot = (next: PointerEntry | null) => {
    if (hot === next) {
      return;
    }
    hot?.node.classList.remove("is-hot");
    hot = next;
    hot?.node.classList.add("is-hot");
    world.style.cursor = hot ? "pointer" : "";
  };
  const pick = (clientX: number, clientY: number) => {
    const bounds = world.getBoundingClientRect();
    if (hot) {
      const current = screenOf(hot, bounds);
      if (
        Math.hypot(clientX - current.x, clientY - current.y) <=
        current.r + 52
      ) {
        return hot;
      }
    }
    let best: PointerEntry | null = null;
    let bestZ = Number.NEGATIVE_INFINITY;
    for (const entry of projects) {
      const point = screenOf(entry, bounds);
      if (
        Math.hypot(clientX - point.x, clientY - point.y) <= point.r + 18 &&
        point.z >= bestZ
      ) {
        best = entry;
        bestZ = point.z;
      }
    }
    return best;
  };
  const applyField = (active: PointerEntry | null) => {
    const bounds = world.getBoundingClientRect();
    const screens = entries.map((entry) => ({
      entry,
      point: screenOf(entry, bounds),
    }));
    const activeScreen = active
      ? screens.find((item) => item.entry === active)?.point
      : undefined;
    for (const { entry, point } of screens) {
      updateAmount(entry, fieldAmount(entry, point, active, activeScreen));
      const pose = magnetPose({
        entry,
        point,
        active,
        activeScreen,
        reduced,
      });
      updateVisual(entry, pose.x, pose.y, pose.scale);
    }
  };
  const onMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") {
      return;
    }
    const next = pick(event.clientX, event.clientY);
    setHot(next);
    applyField(next);
  };
  const onLeave = (event: PointerEvent) => {
    if (event.relatedTarget && world.contains(event.relatedTarget as Node)) {
      return;
    }
    setHot(null);
    applyField(null);
  };
  const onClick = (event: MouseEvent) => {
    if ((event.target as Element | null)?.closest(".bubble-node-button")) {
      return;
    }
    const next = pick(event.clientX, event.clientY);
    next?.target?.click();
  };
  const onBlur = () => {
    setHot(null);
    applyField(null);
  };
  const onFocus = () => {
    const focused =
      projects.find((entry) => entry.node.contains(document.activeElement)) ??
      null;
    if (!focused) {
      return;
    }
    setHot(focused);
    applyField(focused);
  };
  world.addEventListener("pointermove", onMove);
  world.addEventListener("pointerleave", onLeave);
  world.addEventListener("click", onClick);
  world.addEventListener("focusin", onFocus);
  window.addEventListener("blur", onBlur);
  return () => {
    world.removeEventListener("pointermove", onMove);
    world.removeEventListener("pointerleave", onLeave);
    world.removeEventListener("click", onClick);
    world.removeEventListener("focusin", onFocus);
    window.removeEventListener("blur", onBlur);
    setHot(null);
    world.style.cursor = "";
    for (const entry of entries) {
      entry.focusTo.tween.kill();
      entry.xTo?.tween.kill();
      entry.yTo?.tween.kill();
      entry.scaleXTo?.tween.kill();
      entry.scaleYTo?.tween.kill();
      pointerFocus.delete(entry.node);
      appliedLook.delete(entry.node);
      if (entry.target) {
        gsap.set(entry.target, { clearProps: "transform" });
      }
      syncDepth(entry.node);
    }
    gsap.set(world, { rotationX: 0, rotationY: 0, x: 0, y: 0 });
  };
}
