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
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg md:pl-16">
      <SiteHeader active="ask-ai" />
      <main className="mx-auto w-full max-w-[92rem] flex-1 px-4 py-6 md:px-7 md:py-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
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
      </main>
    </div>
  );
}
