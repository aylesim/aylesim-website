import type { Metadata } from "next";
import { AskAiPage } from "@/components/ask-ai/ask-ai-page";
import { serializeSiteContentJson } from "@/lib/content-json";

export const metadata: Metadata = {
  title: "Ask AI | Aylesim",
  description:
    "Structured JSON of this portfolio—paste or link it into your AI and ask anything about Alessandro Miracapillo’s work.",
};

export default function AskAi() {
  return <AskAiPage json={serializeSiteContentJson()} />;
}
