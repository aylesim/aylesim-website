import type { ProjectCategory } from "@/lib/roles";

export type BubbleFocus = "all" | ProjectCategory;

export type BubblePose = {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
};

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
export const FOCAL_Z = 56;

export type BubbleLayoutItem = {
  id: string;
  category?: ProjectCategory;
  featured?: boolean;
};

function hash01(id: string) {
  let sum = 0;
  for (let i = 0; i < id.length; i += 1) {
    sum += id.charCodeAt(i) * (i + 13);
  }
  return (sum % 1000) / 1000;
}

function fibonacciCloud(count: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const n = Math.max(count, 1);
  for (let i = 0; i < count; i += 1) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const y = 1 - t * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * GOLDEN;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }
  return points;
}

function bubbleSize(item: BubbleLayoutItem, index: number, large: number) {
  if (item.featured) {
    return large * 1.18;
  }
  return large * (0.78 + ((index * 5) % 7) * 0.04);
}

function placeCloud(options: {
  poses: Map<string, BubblePose>;
  cluster: BubbleLayoutItem[];
  width: number;
  height: number;
  xy: number;
  zSpread: number;
  zLift: number;
  large: number;
  opacity: number;
}) {
  const units = fibonacciCloud(options.cluster.length);
  for (const [index, item] of options.cluster.entries()) {
    const unit = units[index] ?? { x: 0, y: 0, z: 0 };
    const jitter = hash01(item.id) - 0.5;
    options.poses.set(item.id, {
      x: unit.x * options.width * options.xy + jitter * 36,
      y: unit.y * options.height * options.xy * 0.88 + jitter * 24,
      z:
        options.zLift +
        unit.z * options.zSpread +
        jitter * 70 +
        (item.featured ? 90 : 0),
      size: bubbleSize(item, index, options.large),
      opacity: options.opacity,
    });
  }
}

export function layoutBubbles(
  items: BubbleLayoutItem[],
  focus: BubbleFocus,
  width: number,
  height: number
): Map<string, BubblePose> {
  const poses = new Map<string, BubblePose>();
  // These are the hero objects in the scene, not thumbnail-sized cards. Keep
  // the smallest viewport usable while letting the desktop composition feel
  // intentionally close to the camera.
  const large = Math.min(390, Math.max(210, Math.min(width, height) * 0.34));

  if (focus === "all") {
    placeCloud({
      poses,
      cluster: items,
      width,
      height,
      xy: 0.47,
      zSpread: 510,
      zLift: 72,
      large,
      opacity: 1,
    });
    return poses;
  }

  const matches = items.filter((item) => item.category === focus);
  const rest = items.filter((item) => item.category !== focus);
  placeCloud({
    poses,
    cluster: matches,
    width,
    height,
    xy: 0.24,
    zSpread: 180,
    zLift: 180,
    large,
    opacity: 1,
  });
  placeCloud({
    poses,
    cluster: rest,
    width,
    height,
    xy: 0.6,
    zSpread: 360,
    zLift: -390,
    large: Math.max(110, large * 0.48),
    opacity: 0.55,
  });
  return poses;
}

export function depthLook(z: number, baseOpacity: number) {
  const defocus = Math.abs(z - FOCAL_Z);
  const blur = Math.min(24, (defocus / 62) ** 1.13);
  let opacity = baseOpacity;
  if (z < -430) {
    opacity *= Math.max(0.06, 1 - (-430 - z) / 260);
  }
  if (z > 430) {
    opacity *= Math.max(0.12, 1 - (z - 430) / 220);
  }
  return {
    blur,
    opacity,
    zIndex: Math.round(z + 900),
    sharp: blur < 4.5,
  };
}
