import Link from "next/link";
import { AboutInlineContent } from "@/components/home/portfolio-detail";
import type { AboutData } from "@/lib/content";

export function AboutPage({ about }: { about: AboutData }) {
  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col">
      <header className="sticky top-0 z-20 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-(--index-divider) border-b border-dotted bg-(--bg)/92 px-4 pt-5 pb-3 backdrop-blur-sm md:px-5 md:pt-6 md:pb-4">
        <Link className="text-lg tracking-tight md:text-xl" href="/">
          Aylesim
        </Link>
        <span className="text-lg tracking-tight md:text-xl">about</span>
      </header>
      <main className="px-4 py-5 md:px-5 md:py-8">
        <AboutInlineContent about={about} />
      </main>
    </div>
  );
}
