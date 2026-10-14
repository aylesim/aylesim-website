import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/about");

import { AboutPage } from "@/components/about/about-page";
import { getAllContent } from "@/lib/content";
import { buildWorkMenu } from "@/lib/work-menu";

export default function About() {
  const { about, home, site, projects } = getAllContent();
  const workMenu = buildWorkMenu(
    projects.filter((project) => project.showInMenu)
  );
  return (
    <AboutPage
      about={about}
      brand={home.brand}
      site={site}
      workMenu={workMenu}
    />
  );
}
