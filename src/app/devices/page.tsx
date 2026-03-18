import Link from "next/link";
import DevicesGrid from "@/components/features/devices-grid";
import { devices } from "@/lib/devices";

export default function Devices() {
  const featuredDevice = devices.find((d) => d.featured);
  const storeDevices = devices.filter(
    (d) => d.store === "gumroad" || d.store === "isotonik"
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="mb-4 font-serif-display text-4xl md:text-5xl">
        Aylesim Devices
      </h1>
      <p className="mb-8 max-w-xl text-zinc-400">
        Max4Live instruments for musicians and producers. Generative, FX,
        utility, sequencer.
      </p>

      <div className="mb-16 flex gap-6 text-sm">
        <a
          className="text-zinc-400 hover:text-zinc-100 hover:underline"
          href="https://gumroad.com/aylesim"
          rel="noopener noreferrer"
          target="_blank"
        >
          Gumroad
        </a>
        <a
          className="text-zinc-400 hover:text-zinc-100 hover:underline"
          href="https://isotonikstudios.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Isotonik Studios
        </a>
      </div>

      {featuredDevice && (
        <div className="mb-24 border-zinc-800 border-b pb-24">
          <p className="mb-2 text-sm text-zinc-500">New</p>
          <h2 className="mb-4 font-serif-display text-3xl text-zinc-100 md:text-4xl">
            {featuredDevice.name}
          </h2>
          <p className="mb-6 max-w-xl text-zinc-400">
            {featuredDevice.description}
          </p>
          <div className="mb-6 aspect-video max-w-xl overflow-hidden rounded-lg bg-zinc-900">
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
              <div className="flex h-full w-full items-center justify-center text-zinc-600">
                Demo video
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-zinc-300">
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

      <div className="mt-24 flex gap-6 border-zinc-800 border-t pt-12 text-sm">
        <Link
          className="text-zinc-400 hover:text-zinc-100 hover:underline"
          href="/work"
        >
          ← Work
        </Link>
        <a
          className="text-zinc-400 hover:text-zinc-100 hover:underline"
          href="mailto:hello@aylesim.com"
        >
          Questions
        </a>
      </div>
    </div>
  );
}
