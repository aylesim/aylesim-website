"use client";

import { CopyTextButton } from "@/components/ask-ai/copy-text-button";

export function ContentJsonViewer({ json }: { json: string }) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden border border-(--index-divider)">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-(--index-divider) border-b px-3 py-2">
        <span className="text-(--text-faint) text-xs uppercase tracking-widest">
          content.json
        </span>
        <CopyTextButton
          labels={{
            idle: "Copy all",
            loading: "…",
            done: "Copied",
            error: "Select manually",
          }}
          text={json}
        />
      </div>
      <textarea
        className="min-h-[min(50dvh,28rem)] w-full flex-1 resize-y border-0 bg-transparent p-3 font-mono text-(--foreground) text-[11px] leading-relaxed outline-none md:min-h-[32rem]"
        readOnly
        spellCheck={false}
        value={json}
      />
    </div>
  );
}
