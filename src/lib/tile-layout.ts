export type TilePose = {
  x: number;
  y: number;
};

export type TileView = "spiral" | "grid";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const TILE_RATIO = 215 / 300;
const TILE_VW = 0.155;
const TILE_VW_PORTRAIT = 0.56;

export function isPortraitViewport(width: number, height: number) {
  return height >= width;
}

export function tileWidth(viewportWidth: number, portrait: boolean) {
  return viewportWidth * (portrait ? TILE_VW_PORTRAIT : TILE_VW);
}

export function tileHeightFromWidth(width: number) {
  return width * TILE_RATIO;
}

export function spiralPoses(count: number, cell: number): TilePose[] {
  const spacing = cell * 0.54;
  const poses: TilePose[] = [];
  for (let i = 0; i < count; i++) {
    const radius = spacing * Math.sqrt(i + 0.28);
    const angle = i * GOLDEN_ANGLE - Math.PI / 2;
    poses.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
  }
  return poses;
}

export function gridPoses(
  count: number,
  tileW: number,
  tileH: number,
  gap: number
): TilePose[] {
  const cols = Math.max(2, Math.round(1 / TILE_VW));
  const rows = Math.max(1, Math.ceil(count / cols));
  const totalW = cols * tileW + (cols - 1) * gap;
  const totalH = rows * tileH + (rows - 1) * gap;
  const poses: TilePose[] = [];
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    poses.push({
      x: col * (tileW + gap) - totalW / 2 + tileW / 2,
      y: row * (tileH + gap) - totalH / 2 + tileH / 2,
    });
  }
  return poses;
}

export function layoutPoses(
  view: TileView,
  count: number,
  tileW: number,
  tileH: number
): TilePose[] {
  if (view === "grid") {
    return gridPoses(count, tileW, tileH, tileW * 0.06);
  }
  return spiralPoses(count, Math.max(tileW, tileH));
}
