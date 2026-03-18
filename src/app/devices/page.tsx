import Link from "next/link";
import DevicesGrid from "@/components/features/devices-grid";
import { devices } from "@/lib/devices";

export default function Devices() {
  const featuredDevice = devices.find((d) => d.featured);
  const storeDevices = devices.filter(
    (d) => d.store === "gumroad" || d.store === "isotonik"
  );

  return (
    <div className="py-16 content-width md:py-20">
      <h1 className="mb-4 font-serif-display text-4xl text-[var(--foreground)] md:text-5xl">
        Aylesim Devices
      </h1>
      <p className="mb-8 max-w-xl text-[var(--text-secondary)]">
        Max4Live instruments for musicians and producers. Generative, FX,
        utility, sequencer.
      </p>

      <div className="mb-16 flex gap-6 text-sm">
        <a
          className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--foreground)] hover:underline"
          href="https://gumroad.com/aylesim"
          rel="noopener noreferrer"
          target="_blank"
        >
          Gumroad
        </a>
        <a
          className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--foreground)] hover:underline"
          href="https://isotonikstudios.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Isotonik Studios
        </a>
      </div>

      {featuredDevice && (
        <div className="mb-24 border-[var(--border)] border-b pb-24">
          <p className="mb-2 text-[var(--text-muted)] text-sm">New</p>
          <h2 className="mb-4 font-serif-display text-3xl text-[var(--foreground)] md:text-4xl">
            {featuredDevice.name}
          </h2>
          <p className="mb-6 max-w-xl text-[var(--text-secondary)]">
            {featuredDevice.description}
          </p>
          <div className="mb-6 aspect-video max-w-xl overflow-hidden bg-[var(--accent)]/20">
            {featuredDevice.demoVideo ? (
              <video
                autoPlay
                className="h-full w-full object-cover"
                loop
                muted
                playsInline
                src={featuredDevice.demoVideo}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
                Demo video
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-[var(--foreground)]">
              {featuredDevice.price}
            </span>
            <Link
              className="border-zinc-600 border-b text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
              href={`/devices/${featuredDevice.slug}`}
            >
              View
            </Link>
            <a
              className="border-zinc-600 border-b text-zinc-300 hover:border-zinc-400 hover:text-zinc-100"
              href={featuredDevice.buyLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy
            </a>
          </div>
        </div>
      )}

      <DevicesGrid devices={storeDevices} />

      <div className="mt-24 flex gap-6 border-[var(--border)] border-t pt-12 text-sm">
        <Link
          className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--foreground)] hover:underline"
          href="/work"
        >
          ← Work
        </Link>
        <a
          className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--foreground)] hover:underline"
          href="mailto:hello@aylesim.com"
        >
          Questions
        </a>
      </div>
    </div>
  );
}
