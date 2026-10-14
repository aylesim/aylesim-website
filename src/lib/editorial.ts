import fs from "node:fs";
import path from "node:path";

export function editorial(
  page:
    | "work"
    | "home"
    | "instruments"
    | "instrument-blurbs"
    | "art"
    | "contact"
) {
  return fs.readFileSync(
    path.join(process.cwd(), "content/pages", `${page}.md`),
    "utf8"
  );
}
