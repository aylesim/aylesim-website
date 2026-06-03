"use client";

import { CopyTextButton } from "@/components/ask-ai/copy-text-button";

export function ContentJsonViewer({ json }: { json: string }) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden border border-(--index-divider) border-dotted bg-surface-panel">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-(--index-divider) border-b border-dotted px-4 py-3">
        <span className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
          content.json
        </span>
        <CopyTextButton
          labels={{
            idle: "Copy all",
            loading: "Copying…",
            done: "Copied ✓",
            error: "Select manually",
          }}
          text={json}
        />
      </div>
      <textarea
        className="min-h-[min(50dvh,28rem)] w-full flex-1 resize-y border-0 bg-transparent p-4 font-mono text-(--foreground) text-[11px] leading-relaxed outline-none md:min-h-[32rem] md:p-5 md:text-xs"
        readOnly
        spellCheck={false}
        value={json}
      />
    </div>
  );
}
