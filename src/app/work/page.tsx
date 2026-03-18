import Link from "next/link";
import { caseStudies } from "@/lib/work";

export default function Work() {
  return (
    <div className="py-16 content-width md:py-20">
      <h1 className="mb-16 font-serif-display text-4xl text-[var(--foreground)] md:text-5xl">
        Work
      </h1>

      <div className="space-y-16">
        {caseStudies.map((study) => (
          <Link
            className="group block"
            href={study.link ?? `/work/${study.slug}`}
            key={study.slug}
          >
            <p className="mb-1 text-[var(--text-muted)] text-sm">
              {study.role}
            </p>
            <h2 className="mb-2 font-serif-display text-2xl text-[var(--foreground)] transition-all duration-300 group-hover:underline md:text-3xl">
              {study.title}
            </h2>
            <p className="max-w-2xl text-[var(--text-secondary)]">
              {study.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
