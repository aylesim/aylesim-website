"use client";

import { useState } from "react";
import type { Device } from "@/lib/devices";
import { deviceCategories } from "@/lib/devices";
import DeviceCard from "./device-card";

type DevicesGridProps = {
  devices: Device[];
};

export default function DevicesGrid({ devices }: DevicesGridProps) {
  const [category, setCategory] = useState<string>("all");

  const filtered =
    category === "all"
      ? devices
      : devices.filter((d) => d.category === category);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-4 text-sm">
        {deviceCategories.map((cat) => (
          <button
            className={
              category === cat.id
                ? "font-medium text-zinc-100 underline"
                : "text-zinc-500 hover:text-zinc-100"
            }
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((device) => (
          <DeviceCard device={device} key={device.id} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-zinc-500">No devices in this category.</p>
      )}
    </div>
  );
}
