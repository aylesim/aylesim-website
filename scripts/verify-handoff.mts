// biome-ignore-all lint/suspicious/noMisplacedAssertion: This executable verifies a running production build with top-level assertions.
import assert from "node:assert/strict";
import fs from "node:fs";
import { getAllContent } from "../src/lib/content";
import { projectHref, projectSection } from "../src/lib/project-routes";

const base = process.argv[2] ?? "http://localhost:3100";
const content = getAllContent();
const projectPaths = content.projects.map(projectHref);
assert.equal(
  new Set(projectPaths).size,
  content.projects.length,
  "Each project must have exactly one URL"
);
assert.ok(
  content.projects.every(projectSection),
  "Community entries must not be project pages"
);
const routes = [
  "/",
  "/work",
  "/instruments",
  "/art",
  "/about",
  "/contact",
  "/archive",
  ...projectPaths,
];
const hrefPattern = /<a\b[^>]*href="([^"]*)"/g;
const imagePattern = /<img\b[^>]*>/g;
const scriptPattern = /<script\b[^>]*>[\s\S]*?<\/script>/g;
const headingPattern = /<h1\b[^>]*>[\s\S]*?<\/h1>/;
const titlePattern = /<title>(.*?)<\/title>/;
const banned =
  /3,?600|attack.?magazine|dark matter|co-founder|2020–ongoing|tech researcher|ai-native|rizo|two thousand|Full stack developer|AI product engineer/i;
const titles = new Set<string>();
const links = new Set<string>();
let images = 0;
let marked = 0;
for (const route of routes) {
  const response = await fetch(new URL(route, base), { redirect: "manual" });
  assert.equal(response.status, 200, route);
  const rawHtml = await response.text();
  const html = rawHtml.replace(scriptPattern, "");
  assert.ok(
    headingPattern.test(html),
    `Missing actual server-rendered h1 on ${route}`
  );
  assert.ok(!banned.test(html), `Banned claim on ${route}`);
  const title = html.match(titlePattern)?.[1];
  assert.ok(title, `Missing title on ${route}`);
  assert.ok(!titles.has(title), `Duplicate title on ${route}`);
  titles.add(title);
  for (const token of [
    'name="description"',
    'rel="canonical"',
    'property="og:title"',
    'property="og:description"',
    'property="og:image"',
    'name="twitter:card"',
  ]) {
    assert.ok(html.includes(token), `${route} missing ${token}`);
  }
  for (const image of html.matchAll(imagePattern)) {
    assert.ok(/\balt="[^"]+"/.test(image[0]), `Empty image alt on ${route}`);
    images += 1;
  }
  marked += [...html.matchAll(/<mark\b[^>]*data-needs/g)].length;
  for (const [, href] of html.matchAll(hrefPattern)) {
    if (href.startsWith("/") && !href.startsWith("//")) {
      links.add(href.replaceAll("&amp;", "&").split("#")[0]);
    }
  }
  const project = content.projects.find(
    (entry) => projectHref(entry) === route
  );
  if (project) {
    assert.ok(
      html.includes(project.title.replaceAll("&", "&amp;")),
      `Missing SSR project title on ${route}`
    );
    assert.ok(
      !html.includes("<iframe"),
      `Video iframe loaded before click on ${route}`
    );
    for (const heading of [
      "Context and constraints",
      "What I built",
      "Outcome",
      "Media",
      "Links",
    ]) {
      assert.ok(
        html.includes(`<h2>${heading}</h2>`),
        `${route} missing ${heading}`
      );
    }
  }
}
const missing: string[] = [];
for (const href of links) {
  const response = await fetch(new URL(href, base));
  if (href === "/cv.pdf") {
    assert.equal(
      response.status,
      404,
      "Missing CV is intentionally documented"
    );
    missing.push(href);
  } else {
    assert.equal(response.status, 200, `Broken internal link ${href}`);
    if (href !== "/") {
      assert.notEqual(
        new URL(response.url).pathname,
        "/",
        `Internal link ${href} redirects to home`
      );
    }
  }
}
for (const section of ["work", "instruments", "art"]) {
  assert.equal(
    (await fetch(`${base}/${section}/unknown-project`)).status,
    404,
    "Unknown project must be a real 404"
  );
}
for (const project of content.projects) {
  const response = await fetch(`${base}/projects/${project.slug}`, {
    redirect: "manual",
  });
  assert.equal(
    response.status,
    308,
    `Missing legacy redirect for ${project.slug}`
  );
  assert.equal(
    new URL(response.headers.get("location") ?? "", base).pathname,
    projectHref(project)
  );
}
const sitemap = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
for (const route of routes) {
  assert.ok(
    xml.includes(`https://aylesim.com${route === "/" ? "/" : route}`),
    `Sitemap missing ${route}`
  );
}
const homepage = await (await fetch(base)).text();
assert.ok(
  homepage.replace(scriptPattern, "").includes(content.home.role),
  "Exact server-rendered hero missing"
);
assert.ok(
  !homepage.includes("The map visualisations in the chapter"),
  "Homepage ships long project text"
);
assert.ok(homepage.includes("application/ld+json"), "Person JSON-LD missing");
assert.ok(marked > 0, "No highlighted needs markers found");
const media = fs
  .readdirSync("public/media")
  .map((file) => ({ file, size: fs.statSync(`public/media/${file}`).size }));
assert.ok(
  media.every((image) => image.size < 500_000),
  "Exported image exceeds 500 KB"
);
for (const removed of ["/content.json", "/ask-ai"]) {
  assert.equal(
    (await fetch(`${base}${removed}`)).status,
    404,
    `Removed route ${removed} must stay removed`
  );
}
console.log(
  JSON.stringify(
    {
      routes: routes.length,
      projectRoutes: projectPaths.length,
      uniqueTitles: titles.size,
      internalLinks: links.size,
      documentedMissing: missing,
      imagesWithAlt: images,
      highlightedMarkers: marked,
      maxMediaBytes: Math.max(...media.map((image) => image.size)),
      legacyRedirects: projectPaths.length,
      unknownProject404s: 3,
    },
    null,
    2
  )
);
