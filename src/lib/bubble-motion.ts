import gsap from "gsap";
import { type BubblePose, depthLook } from "@/lib/bubble-layout";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

function baseOpacityOf(node: HTMLElement) {
  const raw = Number(node.dataset.baseOpacity);
  if (Number.isFinite(raw) && raw > 0) {
    return raw;
  }
  return 1;
}

export function lockDepth(nodes: HTMLElement[]) {
  for (const node of nodes) {
    node.dataset.lockDepth = "1";
  }
}

export function releaseDepthLocks(root: HTMLElement) {
  const nodes = root.querySelectorAll<HTMLElement>("[data-depth]");
  for (const node of nodes) {
    node.dataset.lockDepth = "0";
  }
}

export function teardownBubbleMotion(root: HTMLElement) {
  const targets = [
    ...root.querySelectorAll<HTMLElement>("[data-depth]"),
    ...root.querySelectorAll<HTMLElement>("[data-bubble-id]"),
    ...root.querySelectorAll<HTMLElement>(".bubble-node-disk"),
  ];
  gsap.killTweensOf(targets);
  const world = root.querySelector<HTMLElement>(".bubble-world");
  if (world) {
    gsap.killTweensOf(world);
    gsap.set(world, { rotationX: 0, rotationY: 0 });
  }
  const detail = root.querySelector<HTMLElement>(".bubble-detail-panel");
  if (detail) {
    gsap.killTweensOf(detail);
  }
}

export function syncDepth(node: HTMLElement) {
  if (node.dataset.lockDepth === "1") {
    return;
  }
  const z = Number(gsap.getProperty(node, "z")) || 0;
  const look = depthLook(z, baseOpacityOf(node));
  node.style.zIndex = String(look.zIndex);
  node.style.opacity = String(look.opacity);
  const target = diskOf(node) ?? node;
  target.style.filter = `blur(${look.blur.toFixed(2)}px)`;
  const label = labelOf(node);
  if (label) {
    label.style.opacity = look.sharp ? "1" : "0";
  }
  if (node.dataset.soap === "true") {
    node.style.pointerEvents = "none";
    return;
  }
  const clickable = look.opacity > 0.42 && look.blur < 16;
  node.style.pointerEvents = clickable ? "auto" : "none";
}

export function syncDepthTree(root: HTMLElement) {
  const nodes = root.querySelectorAll<HTMLElement>("[data-depth]");
  for (const node of nodes) {
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
    syncDepthTree(root);
  };
  gsap.ticker.add(tick);
  return () => {
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
  });
  gsap.to(node, {
    z: pose.z + toward,
    duration: duration * 1.12,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: unit(9) * 1.8,
  });
  const disk = diskOf(node);
  if (disk) {
    gsap.to(disk, {
      rotateZ: directionX * (2.5 + unit(10) * 3.5),
      duration: duration * 0.86,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: unit(11) * 1.4,
    });
  }
}

export function startBokehFloat(
  node: HTMLElement,
  width: number,
  height: number
) {
  const size = 70 + Math.random() * 220;
  const pose: BubblePose = {
    x: (Math.random() - 0.5) * width * 0.92,
    y: (Math.random() - 0.5) * height * 0.82,
    z: -480 + Math.random() * 720,
    size,
    opacity: 0.4 + Math.random() * 0.4,
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
  const disk = diskOf(node);
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
  gsap.to(detail, { opacity: 0, duration: 0.22, overwrite: true });
}

type MotionTimeline = ReturnType<typeof gsap.timeline>;

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
    0
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
  const disk = diskOf(options.active);
  const label = labelOf(options.active);
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
    0
  );
  if (disk) {
    options.timeline.to(
      disk,
      {
        borderRadius: "1.7rem",
        filter: "blur(0px)",
        duration: options.duration,
      },
      0
    );
  }
  if (label) {
    options.timeline.to(label, { opacity: 0, duration: 0.18 }, 0);
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
  gsap.set(detail, { opacity: 0, pointerEvents: "auto" });
  timeline.to(detail, { opacity: 1, duration }, 0.38);
}

export function expandSelectedBubble(options: {
  stage: HTMLElement;
  detail: HTMLElement | null;
  selectedSlug: string;
  width: number;
  height: number;
}) {
  const nodes = [
    ...options.stage.querySelectorAll<HTMLElement>("[data-bubble-id]"),
  ];
  const active = nodes.find(
    (node) => node.dataset.bubbleId === options.selectedSlug
  );
  const others = nodes.filter(
    (node) => node.dataset.bubbleId !== options.selectedSlug
  );
  gsap.killTweensOf(nodes);
  lockDepth(nodes);
  const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
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
      gsap.set(world, { rotationX: 0, rotationY: 0 });
    };
  }
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
    const stage = world.parentElement;
    if (!stage) {
      return;
    }
    const bounds = stage.getBoundingClientRect();
    const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
    const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
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
  window.addEventListener("pointermove", onMove);
  window.addEventListener("blur", reset);
  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("blur", reset);
    gsap.to(world, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      duration: 0.6,
    });
  };
}
