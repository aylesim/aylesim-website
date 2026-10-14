import { AskAiPage } from "@/components/ask-ai/ask-ai-page";
import { getAllContent } from "@/lib/content";
import { serializeSiteContentJson } from "@/lib/content-json";
import { pageMetadata } from "@/lib/seo";
import { contentJsonUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata("/ask-ai");

export default function AskAi() {
  const { home, site } = getAllContent();
  return (
    <AskAiPage
      brand={home.brand}
      contactEmail={site.contactEmail}
      contentJsonUrl={contentJsonUrl(site.origin)}
      json={serializeSiteContentJson()}
    />
  );
}
