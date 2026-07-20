import Link from "next/link";
import { ContentJsonViewer } from "@/components/ask-ai/content-json-viewer";
import { CopyUrlField } from "@/components/ask-ai/copy-url-field";
import { ExamplePromptsList } from "@/components/ask-ai/example-prompts-list";
import { SiteHeader } from "@/components/site-header";

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
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg">
      <SiteHeader active="ask-ai" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <header className="space-y-1">
              <h1 className="text-base uppercase tracking-wide">JSON</h1>
              <p className="text-(--text-muted)">
                Whole site as one file. Paste URL or dump into a chat.
              </p>
            </header>

            <div className="space-y-2">
              <p className="text-(--text-faint) text-xs uppercase tracking-widest">
                URL
              </p>
              <CopyUrlField url={jsonUrl} />
            </div>

            <ExamplePromptsList prompts={examplePrompts} />

            <p className="text-(--text-muted) text-xs">
              <Link href="/">Index</Link>
              {" · "}
              <Link href="/about">About</Link>
            </p>
          </div>

          <div className="min-w-0">
            <ContentJsonViewer json={json} />
          </div>
        </div>
      </main>
    </div>
  );
}
