import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { getAllContent } from "@/lib/content";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Aylesim",
  description: siteDescription,
};

export default function About() {
  const { about } = getAllContent();
  return <AboutPage about={about} />;
}
