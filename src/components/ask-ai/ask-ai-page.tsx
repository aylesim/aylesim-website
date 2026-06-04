import Link from "next/link";
import { ContentJsonViewer } from "@/components/ask-ai/content-json-viewer";
import { CopyUrlField } from "@/components/ask-ai/copy-url-field";
import { ExamplePromptsList } from "@/components/ask-ai/example-prompts-list";
import { SiteHeader } from "@/components/site-header";

const linkClass =
  "underline decoration-(--index-divider) underline-offset-[3px] transition-colors hover:text-(--accent)";

const examplePrompts = [
  "What does Alessandro actually do?",
  "Which projects are best for a web dev role?",
  "Give me a friendly two-line intro for a curator.",
] as const;

const steps = [
  {
    title: "Open a new chat",
    body: "In ChatGPT, Claude, Gemini, Copilot, or whatever you already use.",
  },
  {
    title: "Give it the site data",
    body: "Two options. Pick one:",
    options: [
      "If the tool can read URLs: copy the link below and paste it into the chat.",
      "If it only accepts pasted text: click Copy all in the JSON box on the right, or select everything inside it.",
    ],
    showUrlField: true,
  },
  {
    title: "Ask your question",
    body: "Projects, skills, fit for a role, a short bio. Whatever you need.",
  },
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

      <main className="relative min-w-0 flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="grid items-start gap-10 py-10 md:grid-cols-[0.95fr_1.05fr] md:gap-12 md:py-14 lg:gap-16">
            <div className="flex min-w-0 flex-col gap-6 md:gap-7">
              <div className="space-y-4">
                <h1 className="font-normal text-3xl leading-[1.05] tracking-tight md:text-4xl">
                  I feel too lazy to read all this 🫠
                </h1>
                <p className="text-(--text-muted) text-base leading-relaxed md:text-lg">
                  You&apos;re not here to read every page. Neither am I. So I
                  dumped the whole site into one JSON file. Feed it to your AI.
                  Ask what you want.
                </p>
              </div>

              <div className="border-(--index-divider) border-t border-dotted pt-6">
                <p className="mb-5 font-mono text-(--accent) text-[10px] uppercase tracking-widest">
                  How to use it
                </p>
                <ol className="m-0 flex list-none flex-col gap-6 p-0">
                  {steps.map((step, index) => (
                    <li className="flex gap-4" key={step.title}>
                      <span
                        aria-hidden
                        className="shrink-0 font-mono text-(--accent) text-sm tabular-nums"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 space-y-2">
                        <p className="text-(--foreground) text-sm leading-snug tracking-tight">
                          {step.title}
                        </p>
                        <p className="text-(--text-muted) text-sm leading-relaxed">
                          {step.body}
                        </p>
                        {"options" in step && step.options ? (
                          <ul className="m-0 list-disc space-y-1.5 pl-4 text-(--text-muted) text-sm leading-relaxed marker:text-(--accent)/60">
                            {step.options.map((option) => (
                              <li key={option}>{option}</li>
                            ))}
                          </ul>
                        ) : null}
                        {"showUrlField" in step && step.showUrlField ? (
                          <CopyUrlField url={jsonUrl} />
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-4 border-(--index-divider) border-t border-dotted pt-6">
                <ExamplePromptsList prompts={examplePrompts} />
                <p className="text-(--text-muted) text-sm leading-relaxed">
                  Prefer scrolling like a normal person?{" "}
                  <Link className={linkClass} href="/">
                    Home
                  </Link>{" "}
                  or{" "}
                  <Link className={linkClass} href="/about">
                    About
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="min-w-0 md:sticky md:top-24 md:self-start">
              <ContentJsonViewer json={json} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
