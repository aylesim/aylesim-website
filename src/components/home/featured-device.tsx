import Link from "next/link";
import { devices } from "@/lib/devices";

export default function FeaturedDevice() {
  const featured = devices.find((d) => d.featured);
  if (!featured) {
    return null;
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 md:p-8">
        <p className="mb-2 text-sm text-zinc-500">New</p>
        <h2 className="mb-2 font-serif-display text-2xl text-zinc-100 md:text-3xl">
          {featured.name}
        </h2>
        <p className="mb-6 max-w-xl text-zinc-400">{featured.description}</p>
        <div className="mb-6 aspect-video w-full overflow-hidden rounded bg-zinc-900">
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
            <div className="flex h-full w-full items-center justify-center text-zinc-600">
              Demo video
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-zinc-300">{featured.price}</span>
          <Link
            className="border-zinc-600 border-b text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
            href={`/devices/${featured.slug}`}
          >
            View
          </Link>
          <a
            className="border-zinc-600 border-b text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
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
