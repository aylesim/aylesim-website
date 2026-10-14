import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/contact");

import { Markdown } from "@/components/markdown";
import { PageFrame } from "@/components/site/site-chrome";
import { getAllContent } from "@/lib/content";
import { editorial } from "@/lib/editorial";
export default function Page() {
  const { home, site } = getAllContent();
  return (
    <PageFrame
      brand={home.brand}
      contactEmail={site.contactEmail}
      current="contact"
    >
      <main className="project-page">
        <h1>Contact</h1>
        <Markdown>{editorial("contact")}</Markdown>
      </main>
    </PageFrame>
  );
}
