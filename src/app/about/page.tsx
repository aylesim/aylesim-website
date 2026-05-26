import { AboutPage } from "@/components/about/about-page";
import { getAllContent } from "@/lib/content";

export default function About() {
  const { about } = getAllContent();
  return <AboutPage about={about} />;
}
