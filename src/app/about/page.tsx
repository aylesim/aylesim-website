import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Aylesim",
  description: "Full stack developer and creative technologist. Berlin.",
};

export default function About() {
  const { about, site } = getAllContent();
  return <AboutPage about={about} site={site} />;
}
