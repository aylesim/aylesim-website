import type { Metadata } from "next";
import { ToolsPage } from "@/components/tools/tools-page";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tools | Aylesim",
  description: "Max for Live devices and browser tools.",
};

export default function Tools() {
  const { projects, site } = getAllContent();
  return <ToolsPage projects={projects} site={site} />;
}
