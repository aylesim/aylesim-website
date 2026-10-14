"use client";

import type { ReactNode } from "react";
import { CopyTextButton } from "@/components/ask-ai/copy-text-button";

export function CopyUrlField({
  url,
  label,
  note,
}: {
  url: string;
  label?: string;
  note?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 bg-[#141414] px-4 py-3">
      {label ? <p className="text-(--text-muted) text-sm">{label}</p> : null}
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <a
          className="min-w-0 flex-1 break-all text-sm"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {url}
        </a>
        <CopyTextButton
          labels={{
            idle: "Copy link",
            loading: "Copying",
            done: "Copied",
            error: "Failed",
          }}
          text={url}
        />
      </div>
      {note ? <p className="text-(--text-muted) text-sm">{note}</p> : null}
    </div>
  );
}
