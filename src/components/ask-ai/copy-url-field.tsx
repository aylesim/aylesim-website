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
    <div className="flex flex-col gap-2 border border-(--index-divider) px-3 py-2">
      {label ? (
        <p className="text-(--text-faint) text-xs uppercase tracking-widest">
          {label}
        </p>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <a
          className="min-w-0 flex-1 break-all text-xs"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {url}
        </a>
        <CopyTextButton
          labels={{
            idle: "Copy link",
            loading: "…",
            done: "Copied",
            error: "Failed",
          }}
          text={url}
        />
      </div>
      {note ? <p className="text-(--text-muted) text-xs">{note}</p> : null}
    </div>
  );
}
