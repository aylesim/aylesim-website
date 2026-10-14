import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/");

import { Suspense } from "react";
import ArchiveShell from "@/components/home/archive-shell";
import { Markdown } from "@/components/markdown";
import { getAllContent } from "@/lib/content";
import { editorial } from "@/lib/editorial";

export default function Home() {
  const content = getAllContent();
  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Static, locally authored JSON-LD escapes less-than characters.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: content.home.name,
            url: "https://aylesim.com",
            sameAs: [
              "https://github.com/aylesim",
              "https://instagram.com/aylesim",
            ],
          }).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
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
    </>
  );
}
