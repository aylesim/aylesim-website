import { AboutPageClient } from "@/components/about/about-page-client";
import type { About, SiteConfig } from "@/lib/content";
import { getAboutSections } from "@/lib/content";

export function AboutPage({ about, site }: { about: About; site: SiteConfig }) {
  return (
    <AboutPageClient
      about={about}
      sections={getAboutSections(about)}
      site={site}
    />
  );
}
