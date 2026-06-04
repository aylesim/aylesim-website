import {
  siteContentJsonFileIsCurrent,
  writeSiteContentJsonFile,
} from "../src/lib/content-json";

const checkOnly = process.argv.includes("--check");

if (checkOnly) {
  if (!siteContentJsonFileIsCurrent()) {
    console.error("public/content.json is out of date. Run: pnpm content:json");
    process.exit(1);
  }
} else {
  writeSiteContentJsonFile();
  console.log("Wrote public/content.json");
}
