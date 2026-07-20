import type { Metadata } from "next";
import { AskAiPage } from "@/components/ask-ai/ask-ai-page";
import { getAllContent } from "@/lib/content";
import { serializeSiteContentJson } from "@/lib/content-json";
import { contentJsonUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "JSON | Aylesim",
  description: "Structured JSON of this portfolio.",
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
