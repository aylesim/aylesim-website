import Link from "next/link";
import { devices } from "@/lib/devices";

export default function FeaturedDevice() {
  const featured = devices.find((d) => d.featured);
  if (!featured) {
    return null;
  }

  return (
    <section className="py-16 content-width md:py-20">
      <div className="border border-[var(--border)] bg-[var(--bg-elevated)]/30 p-8 md:p-10">
        <p className="mb-2 text-[var(--text-muted)] text-sm">New</p>
        <h2 className="mb-3 font-serif-display text-2xl text-[var(--foreground)] md:text-3xl">
          {featured.name}
        </h2>
        <p className="mb-8 max-w-xl text-[var(--text-secondary)] leading-relaxed">
          {featured.description}
        </p>
        <div className="mb-8 aspect-video w-full overflow-hidden bg-[var(--accent)]/20">
          {featured.demoVideo ? (
            <video
              autoPlay
              className="h-full w-full object-cover"
              loop
              muted
              playsInline
              src={featured.demoVideo}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
              Demo video
            </div>
          )}
        </div>
        <div className="flex items-center gap-6">
          <span className="font-medium text-[var(--foreground)]">
            {featured.price}
          </span>
          <Link
            className="border-[var(--accent)] border-b text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--foreground)]"
            href={`/devices/${featured.slug}`}
          >
            View
          </Link>
          <a
            className="border-[var(--accent)] border-b text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--foreground)]"
            href={featured.buyLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            Buy
          </a>
        </div>
      </div>
    </section>
  );
}
