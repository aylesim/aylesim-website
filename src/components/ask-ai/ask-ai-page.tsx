import Link from "next/link";
import { ContentJsonViewer } from "@/components/ask-ai/content-json-viewer";
import {
  contentJsonMinifyUrl,
  contentJsonPath,
  contentJsonUrl,
} from "@/lib/site";

const linkClass =
  "underline decoration-(--foreground)/35 underline-offset-[3px] transition-colors hover:text-(--accent)";

const sectionRule =
  "border-(--index-divider) border-t border-dotted pt-8 first:border-t-0 first:pt-0";

const examplePrompts = [
  "Summarize my audio development work in three bullets.",
  "Which projects best show editorial web development?",
  "What installations and live AV work should a curator know about?",
  "Draft a short intro email for a Berlin studio role.",
] as const;

export function AskAiPage({ json }: { json: string }) {
  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-bg">
      <header className="sticky top-0 z-20 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-(--index-divider) border-b border-dotted bg-bg px-4 pt-5 pb-3 md:px-5 md:pt-6 md:pb-4">
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
        >
          <Link className="text-lg tracking-tight md:text-xl" href="/">
            Aylesim
          </Link>
          <Link
            className="text-(--text-muted) text-sm tracking-tight transition-colors hover:text-(--foreground) md:text-base"
            href="/?projects"
          >
            Projects
          </Link>
          <Link
            className="text-(--text-muted) text-sm tracking-tight transition-colors hover:text-(--foreground) md:text-base"
            href="/about"
          >
            About
          </Link>
          <Link className="text-sm tracking-tight md:text-base" href="/ask-ai">
            Ask AI
          </Link>
        </nav>
      </header>

      <main className="relative min-w-0 flex-1">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 md:px-8">
          <div className="flex flex-col gap-10 py-12 md:gap-12 md:py-20">
            <header className="max-w-4xl">
              <p className="font-mono text-(--accent) text-xs uppercase tracking-widest">
                Ask AI
              </p>
              <h1 className="mt-3 font-normal text-4xl leading-[0.98] tracking-tight md:text-5xl">
                No mood to read the whole site?
              </h1>
              <p className="mt-5 text-(--text-muted) text-base leading-relaxed md:text-lg">
                Fair. Everything here—projects, case studies, about copy,
                contact, awards—is also published as structured JSON. Hand it to
                your favorite AI and ask whatever you want about my work.
              </p>
              <p className="mt-3 text-(--text-muted) text-sm leading-relaxed">
                I use the same file when prototyping with models. You get the
                same snapshot visitors see on the site, kept in sync at build
                time.
              </p>
            </header>

            <section className={sectionRule}>
              <p className="mb-5 font-mono text-(--text-muted) text-xs uppercase tracking-widest">
                Two ways in
              </p>
              <ol className="m-0 flex max-w-4xl list-none flex-col gap-8 p-0">
                <li className="flex flex-col gap-2">
                  <p className="font-mono text-(--accent) text-[10px] uppercase tracking-widest">
                    01 · Give your AI the link
                  </p>
                  <p className="text-(--text-muted) text-sm leading-relaxed">
                    If your tool can fetch a URL, paste this. Many chat apps
                    accept links in the prompt bar.
                  </p>
                  <a
                    className={`${linkClass} break-all font-mono text-sm`}
                    href={contentJsonUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {contentJsonUrl}
                  </a>
                  <p className="text-(--text-muted) text-xs leading-relaxed">
                    Smaller payload for long contexts:{" "}
                    <a className={linkClass} href={contentJsonMinifyUrl}>
                      minified JSON
                    </a>
                    .
                  </p>
                </li>
                <li className="flex flex-col gap-2">
                  <p className="font-mono text-(--accent) text-[10px] uppercase tracking-widest">
                    02 · Copy the file
                  </p>
                  <p className="text-(--text-muted) text-sm leading-relaxed">
                    Select everything in the field below, or use Copy JSON. You
                    can also open{" "}
                    <a className={linkClass} href={contentJsonPath}>
                      {contentJsonPath}
                    </a>{" "}
                    in a new tab.
                  </p>
                </li>
              </ol>
            </section>

            <ContentJsonViewer json={json} />

            <section className={`${sectionRule} max-w-4xl`}>
              <p className="mb-5 font-mono text-(--text-muted) text-xs uppercase tracking-widest">
                How to use it
              </p>
              <ol className="m-0 list-decimal space-y-3 pl-5 text-(--text-muted) text-sm leading-relaxed marker:text-(--accent)">
                <li>Paste the link or JSON into a new chat.</li>
                <li>
                  Add one line of context, e.g. “This is Alessandro
                  Miracapillo’s portfolio site—answer from this data only.”
                </li>
                <li>
                  Ask your question. Cite project titles if you share answers.
                </li>
              </ol>
            </section>

            <section className={`${sectionRule} max-w-4xl`}>
              <p className="mb-5 font-mono text-(--text-muted) text-xs uppercase tracking-widest">
                Example prompts
              </p>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {examplePrompts.map((prompt) => (
                  <li key={prompt}>
                    <p className="text-(--foreground) text-sm leading-relaxed">
                      “{prompt}”
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <p className="max-w-4xl text-(--text-muted) text-xs leading-relaxed">
              The JSON updates when the site rebuilds. For a human-readable
              tour, start on{" "}
              <Link className={linkClass} href="/">
                the homepage
              </Link>{" "}
              or{" "}
              <Link className={linkClass} href="/about">
                about
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
