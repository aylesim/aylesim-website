import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/about");

import { AboutPage } from "@/components/about/about-page";
import { getAllContent } from "@/lib/content";

export default function About() {
  const { about, home, site } = getAllContent();
  return <AboutPage about={about} brand={home.brand} site={site} />;
}
