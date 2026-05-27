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
    <div className="flex flex-col gap-2 border border-(--index-divider) border-dotted bg-(--foreground)/[0.02] px-3 py-3">
      {label ? (
        <p className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
          {label}
        </p>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <a
          className="min-w-0 flex-1 break-all font-mono text-(--foreground)/90 text-xs leading-relaxed underline decoration-(--foreground)/20 underline-offset-2 hover:text-(--accent)"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {url}
        </a>
        <CopyTextButton
          labels={{
            idle: "Copy link",
            loading: "Copying…",
            done: "Copied ✓",
            error: "Failed",
          }}
          text={url}
        />
      </div>
      {note ? (
        <p className="text-(--text-muted) text-xs leading-relaxed">{note}</p>
      ) : null}
    </div>
  );
}
