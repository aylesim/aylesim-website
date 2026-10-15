import { projectPreview } from "@/lib/project-preview";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/");

import { Suspense } from "react";
import { AboutPanel } from "@/components/home/about-panel";
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
        <ArchiveShell
          brand={content.home.brand}
          contactEmail={content.site.contactEmail}
          projects={content.projects.map(projectPreview)}
        >
          <section className="stage-intro home-intro">
            <h1>{content.home.name}</h1>
            <p>{content.home.role}</p>
            <p>Berlin</p>
            <AboutPanel>
              <Markdown>{editorial("home")}</Markdown>
              <p>
                <a href={`mailto:${content.site.contactEmail}`}>Email</a> ·{" "}
                <a href="https://github.com/aylesim">GitHub</a>
              </p>
            </AboutPanel>
          </section>
        </ArchiveShell>
      </Suspense>
    </>
  );
}
