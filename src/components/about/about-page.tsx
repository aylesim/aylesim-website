import { AboutPageClient } from "@/components/about/about-page-client";
import type { About } from "@/lib/content";
import { getAboutSections } from "@/lib/content";

export function AboutPage({ about }: { about: About }) {
  return <AboutPageClient about={about} sections={getAboutSections(about)} />;
}
