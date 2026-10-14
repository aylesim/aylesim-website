"use client";

import { ContentJsonViewer } from "@/components/ask-ai/content-json-viewer";
import { CopyUrlField } from "@/components/ask-ai/copy-url-field";
import { ExamplePromptsList } from "@/components/ask-ai/example-prompts-list";
import { FinderAppShell } from "@/components/finder/finder-app-shell";

const examplePrompts = [
  "What does Alessandro do?",
  "Which projects fit a web role?",
  "Two-line intro.",
] as const;

export function AskAiPage({
  json,
  contentJsonUrl: jsonUrl,
}: {
  json: string;
  contentJsonUrl: string;
}) {
  return (
    <FinderAppShell
      dockActive="ask-ai"
      headline="Site as a file"
      playbarMeta="content.json"
      showFilters={false}
      subtitle="Paste the URL or JSON into your chat."
    >
      <div className="liquid-main-copy">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-8">
            <header className="max-w-md space-y-2">
              <h1 className="font-medium text-2xl">Site as a file</h1>
              <p className="text-(--text-muted) leading-relaxed">
                Paste this URL into a chat, or copy the whole file, to ask
                questions about the work.
              </p>
            </header>

            <CopyUrlField url={jsonUrl} />

            <ExamplePromptsList prompts={examplePrompts} />
          </div>

          <div className="min-w-0">
            <ContentJsonViewer json={json} />
          </div>
        </div>
      </div>
    </FinderAppShell>
  );
}
