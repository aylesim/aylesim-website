import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Alessandro Miracapillo",
  description:
    "Trained in electronic music, based in Berlin. Founder of Aylesim Devices and of the Max Berlin Network.",
};

export default function About() {
  const { about, home, site } = getAllContent();
  return <AboutPage about={about} brand={home.brand} site={site} />;
}
