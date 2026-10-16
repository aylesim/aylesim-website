export function cardMenuLayout(viewportWidth: number, count: number) {
  const width = Math.min(800, Math.max(0, viewportWidth - 32));
  const compact = viewportWidth < 768;
  const top = compact ? 176 : 184;
  const rowHeight = compact ? 88 : 76;
  const thumbnailWidth = compact ? 64 : 80;
  const thumbnailHeight = compact ? 46 : 54;
  const queueWidth = Math.min(76, width);
  const queueGap =
    count > 1 ? Math.min(48, (width - queueWidth) / (count - 1)) : 0;

  return {
    width,
    top,
    rowHeight,
    thumbnailWidth,
    thumbnailHeight,
    queueWidth,
    queueHeight: queueWidth * (215 / 300),
    height: top + count * rowHeight + 32,
    rows: Array.from({ length: count }, (_, index) => ({
      x: viewportWidth / 2,
      y: top + (index + 0.5) * rowHeight,
    })),
    queue: Array.from({ length: count }, (_, index) => ({
      x: viewportWidth / 2 + (index - (count - 1) / 2) * queueGap,
    })),
  };
}
