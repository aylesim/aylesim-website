"use client";

import { ContentJsonViewer } from "@/components/ask-ai/content-json-viewer";
import { CopyUrlField } from "@/components/ask-ai/copy-url-field";
import { ExamplePromptsList } from "@/components/ask-ai/example-prompts-list";
import { PageFrame } from "@/components/site/site-chrome";

const examplePrompts = [
  "What does Alessandro do?",
  "Which projects fit a web role?",
  "Two-line intro.",
] as const;

export function AskAiPage({
  brand,
  json,
  contentJsonUrl: jsonUrl,
}: {
  brand: string;
  json: string;
  contentJsonUrl: string;
}) {
  return (
    <PageFrame brand={brand} current="ask-ai">
      <article className="page-copy page-copy--plain">
        <div className="page-copy-body">
          <p className="page-kicker">JSON</p>
          <h1>Site as a file</h1>
          <p className="page-lede">
            Paste this URL into a chat, or copy the whole file, to ask questions
            about the work.
          </p>
          <CopyUrlField url={jsonUrl} />
          <ExamplePromptsList prompts={examplePrompts} />
        </div>
        <ContentJsonViewer json={json} />
      </article>
    </PageFrame>
  );
}
