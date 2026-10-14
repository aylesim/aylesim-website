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
  const content = getAllContent();
  const { home, site } = content;
  return (
    <AskAiPage
      brand={home.brand}
      contactEmail={site.contactEmail}
      contentJsonUrl={contentJsonUrl(site.origin)}
      json={serializeSiteContentJson(content)}
    />
  );
}
