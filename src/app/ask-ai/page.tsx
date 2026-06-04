import type { Metadata } from "next";
import { AskAiPage } from "@/components/ask-ai/ask-ai-page";
import { getAllContent } from "@/lib/content";
import { serializeSiteContentJson } from "@/lib/content-json";
import { contentJsonUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "I feel too lazy to read all this | Aylesim",
  description:
    "Structured JSON of this portfolio. Paste or link it into your AI and ask anything about Alessandro Miracapillo’s work.",
};

export default function AskAi() {
  const { site } = getAllContent();
  return (
    <AskAiPage
      contentJsonUrl={contentJsonUrl(site.origin)}
      json={serializeSiteContentJson()}
    />
  );
}
