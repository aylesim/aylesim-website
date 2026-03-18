import Link from "next/link";
import type { Device } from "@/lib/devices";

type DeviceCardProps = {
  device: Device;
};

export default function DeviceCard({ device }: DeviceCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/50 transition-colors hover:border-zinc-700">
      <Link className="block" href={`/devices/${device.slug}`}>
        <div className="aspect-video w-full overflow-hidden bg-zinc-900">
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
              Demo
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="mb-1 flex items-center gap-2">
            {device.featured && (
              <span className="text-xs text-zinc-500">New</span>
            )}
            <span className="text-xs text-zinc-500 capitalize">
              {device.category}
            </span>
          </div>
          <h3 className="mb-2 font-serif-display text-xl text-zinc-100 hover:underline">
            {device.name}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
            {device.description}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between border-zinc-800 border-t px-4 pt-2 pb-4">
        <span className="font-medium text-zinc-300">{device.price}</span>
        <a
          className="rounded bg-zinc-100 px-3 py-1.5 font-medium text-sm text-zinc-900 hover:bg-zinc-200"
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
