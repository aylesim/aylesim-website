import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { projectHref } from "@/lib/project-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const { projects, site } = getAllContent();
  return [
    "/",
    "/work",
    "/instruments",
    "/art",
    "/archive",
    "/about",
    "/contact",
    ...projects.map(projectHref),
  ].map((path) => ({ url: new URL(path, site.origin).href }));
}
