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
export const CAMERA_DISTANCE = 980;
const MAX_FORWARD_Z = 360;
const MAX_FORWARD_DRIFT = 60;
const HORIZONTAL_DRIFT = 40;
const VERTICAL_DRIFT = 34;
const EDGE_INSET = 52;

export type BubbleLayoutItem = {
  id: string;
  category?: ProjectCategory;
  featured?: boolean;
};

// Keep the visible part of the world deliberately short: a project crosses the
// focal plane, then returns to the deep field instead of becoming a long list.
export const TUNNEL_NEAR_Z = 360;
export const TUNNEL_FAR_Z = -840;
export const TUNNEL_DEPTH = TUNNEL_NEAR_Z - TUNNEL_FAR_Z;

function hash01(id: string) {
  let sum = 0;
  for (let i = 0; i < id.length; i += 1) {
    sum += id.charCodeAt(i) * (i + 13);
  }
  return (sum % 1000) / 1000;
}

function bubbleSize(item: BubbleLayoutItem, index: number, large: number) {
  if (item.featured) {
    return large * 1.18;
  }
  return large * (0.78 + ((index * 5) % 7) * 0.04);
}

export function constrainBubblePose(options: {
  x: number;
  y: number;
  z: number;
  size: number;
  width: number;
  height: number;
}) {
  const z = Math.min(MAX_FORWARD_Z, options.z);
  const scale =
    CAMERA_DISTANCE /
    (CAMERA_DISTANCE -
      Math.min(MAX_FORWARD_Z + MAX_FORWARD_DRIFT, z + MAX_FORWARD_DRIFT));
  const projectedRadius = (options.size * scale) / 2;
  const maxX = Math.max(
    0,
    (options.width / 2 - projectedRadius - EDGE_INSET) / scale -
      HORIZONTAL_DRIFT
  );
  const centerY = options.height * 0.48;
  const maxUp = Math.max(
    0,
    (centerY - projectedRadius - EDGE_INSET) / scale - VERTICAL_DRIFT
  );
  const maxDown = Math.max(
    0,
    (options.height - centerY - projectedRadius - EDGE_INSET) / scale -
      VERTICAL_DRIFT
  );
  return {
    x: Math.max(-maxX, Math.min(maxX, options.x)),
    y: Math.max(-maxUp, Math.min(maxDown, options.y)),
    z,
  };
}

function placeTunnel(options: {
  poses: Map<string, BubblePose>;
  cluster: BubbleLayoutItem[];
  width: number;
  height: number;
  large: number;
  opacity: number;
  zOffset?: number;
}) {
  const ordered = [...options.cluster].sort(
    (a, b) => hash01(a.id) - hash01(b.id)
  );
  const count = Math.max(ordered.length, 1);
  for (const [index, item] of ordered.entries()) {
    const seed = hash01(item.id);
    const angle = index * GOLDEN + seed * Math.PI * 2;
    const lane = 0.5 + ((index * 7) % 5) * 0.07;
    const size = bubbleSize(item, index, options.large);
    const pose = constrainBubblePose({
      x: Math.cos(angle) * options.width * 0.19 * lane,
      y: Math.sin(angle * 1.38) * options.height * 0.17 * lane,
      z:
        TUNNEL_FAR_Z +
        ((index + seed * 0.3) / count) * TUNNEL_DEPTH +
        (options.zOffset ?? 0),
      size,
      width: options.width,
      height: options.height,
    });
    options.poses.set(item.id, { ...pose, size, opacity: options.opacity });
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
    placeTunnel({
      poses,
      cluster: items,
      width,
      height,
      large,
      opacity: 1,
    });
    return poses;
  }

  const matches = items.filter((item) => item.category === focus);
  const rest = items.filter((item) => item.category !== focus);
  placeTunnel({
    poses,
    cluster: matches,
    width,
    height,
    large,
    opacity: 1,
  });
  placeTunnel({
    poses,
    cluster: rest,
    width,
    height,
    large: Math.max(110, large * 0.48),
    opacity: 0.16,
    zOffset: -360,
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
