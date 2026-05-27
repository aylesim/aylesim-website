import type { Metadata } from "next";
import { ToolsPage } from "@/components/tools/tools-page";
import { getAllContent } from "@/lib/content";
export const metadata: Metadata = {
  title: "Tools | Aylesim",
  description:
    "Max for Live devices, Glossia, and other things you can download or use from Aylesim.",
};

export default function Tools() {
  const { projects } = getAllContent();
  return <ToolsPage projects={projects} />;
}
