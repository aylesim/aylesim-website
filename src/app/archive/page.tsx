import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/archive");

import Link from "next/link";
import { PageFrame } from "@/components/site/site-chrome";
import { getAllContent } from "@/lib/content";
import { buildWorkMenu } from "@/lib/work-menu";
export default function Page() {
  const { home, site, projects } = getAllContent();
  return (
    <PageFrame
      brand={home.brand}
      contactEmail={site.contactEmail}
      current="archive"
      workMenu={buildWorkMenu(projects)}
    >
      <main className="project-page">
        <h1>Archive</h1>
        <ul className="archive-rows">
          <li>
            <span>2018 to 2026</span>
            <Link href="/about#teaching">La Scuola Open Source</Link>
            <p>Workshops and the cooperative's Kubernetes cluster.</p>
          </li>
        </ul>
      </main>
    </PageFrame>
  );
}
