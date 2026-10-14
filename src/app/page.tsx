import { Suspense } from "react";
import ArchiveShell from "@/components/home/archive-shell";
import { Markdown } from "@/components/markdown";
import { getAllContent } from "@/lib/content";
import { editorial } from "@/lib/editorial";

export default function Home() {
  const content = getAllContent();
  return (
    <Suspense>
      <ArchiveShell content={content}>
        <section className="stage-intro home-intro">
          <h1>{content.home.name}</h1>
          <p>{content.home.role}</p>
          <p>Berlin, EU citizen</p>
          <a href="#home-copy">About my work</a>
        </section>
        <article className="section-copy" id="home-copy">
          <Markdown>{editorial("home")}</Markdown>
          <p>
            <a href={`mailto:${content.site.contactEmail}`}>Email</a> ·{" "}
            <a href="/cv.pdf">CV (PDF)</a> ·{" "}
            <a href="/portfolio.pdf">Portfolio (PDF)</a> ·{" "}
            <a href="https://github.com/aylesim">GitHub</a>
          </p>
          <Markdown>{"[needs: CV PDF file]"}</Markdown>
        </article>
      </ArchiveShell>
    </Suspense>
  );
}
