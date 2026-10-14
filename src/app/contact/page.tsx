import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/contact");

import { Markdown } from "@/components/markdown";
import { PageFrame } from "@/components/site/site-chrome";
import { getAllContent } from "@/lib/content";
import { editorial } from "@/lib/editorial";
import { buildWorkMenu } from "@/lib/work-menu";
export default function Page() {
  const { home, site, projects } = getAllContent();
  return (
    <PageFrame
      brand={home.brand}
      contactEmail={site.contactEmail}
      current="contact"
      workMenu={buildWorkMenu(projects)}
    >
      <main className="project-page">
        <h1>Contact</h1>
        <Markdown>{editorial("contact")}</Markdown>
      </main>
    </PageFrame>
  );
}
