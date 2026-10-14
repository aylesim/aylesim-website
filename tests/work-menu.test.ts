import assert from "node:assert/strict";
import test from "node:test";
import { buildWorkMenu } from "../src/lib/work-menu";

const projects = [
  { slug: "web", title: "Website", category: "web-interactive" },
  { slug: "second-tool", title: "Second tool", category: "devices" },
  { slug: "uncategorized", title: "Uncategorized" },
  { slug: "first-tool", title: "First tool", category: "devices" },
  { slug: "community", title: "Community project", category: "community" },
] as const;

test("all collections preserve category order and project order within each category", () => {
  assert.deepEqual(buildWorkMenu(projects), {
    entries: [
      { type: "heading", label: "Audio tools" },
      { type: "project", slug: "second-tool", label: "Second tool" },
      { type: "project", slug: "first-tool", label: "First tool" },
      { type: "heading", label: "Web" },
      { type: "project", slug: "web", label: "Website" },
      { type: "heading", label: "Community" },
      { type: "project", slug: "community", label: "Community project" },
    ],
    projectCount: 4,
  });
});

test("empty collections produce no headings or projects", () => {
  assert.deepEqual(buildWorkMenu([{ slug: "none", title: "None" }]), {
    entries: [],
    projectCount: 0,
  });
  assert.deepEqual(buildWorkMenu([]), { entries: [], projectCount: 0 });
});
