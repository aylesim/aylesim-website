import assert from "node:assert/strict";
import test from "node:test";
import { cardMenuLayout } from "../src/lib/card-menu-layout";

test("the queue keeps every card within narrow and wide viewports", () => {
  for (const width of [320, 390, 768, 1440]) {
    for (const count of [1, 16, 40]) {
      const layout = cardMenuLayout(width, count);
      for (const card of layout.queue) {
        assert.ok(card.x - layout.queueWidth / 2 >= 16);
        assert.ok(card.x + layout.queueWidth / 2 <= width - 16);
      }
    }
  }
});

test("menu rows keep project order, never overlap, and fit the scroll area", () => {
  for (const width of [320, 1280]) {
    const layout = cardMenuLayout(width, 16);
    layout.rows.forEach((row, index) => {
      assert.equal(row.x, width / 2);
      assert.equal(
        row.y - layout.rowHeight / 2,
        layout.top + index * layout.rowHeight
      );
      assert.ok(row.y + layout.rowHeight / 2 < layout.height);
    });
  }
});

test("an empty menu has no card positions", () => {
  const layout = cardMenuLayout(390, 0);
  assert.deepEqual(layout.rows, []);
  assert.deepEqual(layout.queue, []);
  assert.ok(Number.isFinite(layout.height));
});
