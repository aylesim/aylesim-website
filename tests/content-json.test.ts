import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getAllContent } from "../src/lib/content";
import {
  contentJsonPublicPath,
  getSiteContentPayload,
  serializeSiteContentJson,
} from "../src/lib/content-json";

test("serialized content matches the published JSON byte for byte", () => {
  assert.equal(
    `${serializeSiteContentJson()}\n`,
    readFileSync(contentJsonPublicPath, "utf-8")
  );
});

test("serialization uses the supplied content consistently", () => {
  const content = getAllContent();
  content.home.brand = "Snapshot brand";
  content.site.origin = "https://snapshot.example";
  content.projects = [];

  const payload = getSiteContentPayload(content);
  assert.equal(payload.content.home.brand, "Snapshot brand");
  assert.equal(
    payload.site.contentJsonUrl,
    "https://snapshot.example/content.json"
  );
  assert.deepEqual(payload.content.projects, []);
  const serialized = JSON.parse(serializeSiteContentJson(content));
  assert.equal(serialized.content.home.brand, "Snapshot brand");
  assert.equal(serialized.site.origin, "https://snapshot.example");
  assert.deepEqual(serialized.content.projects, []);
});
