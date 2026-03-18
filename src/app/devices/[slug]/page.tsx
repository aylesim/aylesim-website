import Link from "next/link";
import { notFound } from "next/navigation";
import { devices } from "@/lib/devices";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return devices.map((d) => ({ slug: d.slug }));
}

export default async function DevicePage({ params }: Props) {
  const { slug } = await params;
  const device = devices.find((d) => d.slug === slug);

  if (!device) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Link
        className="mb-12 block text-sm text-zinc-400 hover:text-zinc-100 hover:underline"
        href="/devices"
      >
        ← Devices
      </Link>

      {device.featured && <p className="mb-2 text-sm text-zinc-500">New</p>}
      <h1 className="mb-6 font-serif-display text-4xl text-zinc-100 md:text-5xl">
        {device.name}
      </h1>
      <p className="mb-8 text-xl text-zinc-400">{device.description}</p>

      <div className="mb-12 aspect-video w-full overflow-hidden rounded-lg bg-zinc-900">
        {device.demoVideo ? (
          <video
            autoPlay
            className="h-full w-full object-cover"
            loop
            muted
            playsInline
            src={device.demoVideo}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-600">
            Demo video
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="font-medium text-zinc-300">{device.price}</span>
        <a
          className="rounded bg-zinc-100 px-4 py-2 font-medium text-sm text-zinc-900 hover:bg-zinc-200"
          href={device.buyLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          Buy
        </a>
      </div>
    </div>
  );
}
