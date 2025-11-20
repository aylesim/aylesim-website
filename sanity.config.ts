import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import post from "./src/sanity/schemas/post";
import project from "./src/sanity/schemas/project";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable");
}

if (!/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error(
    `Invalid projectId format. projectId can only contain a-z, 0-9 and dashes. Got: ${projectId}`
  );
}

export default defineConfig({
  name: "default",
  title: "Aylesim Website",

  projectId,
  dataset,

  basePath: "/admin",

  plugins: [structureTool()],

  schema: {
    types: [post, project],
  },
});
