"use client";

import { CopyTextButton } from "@/components/ask-ai/copy-text-button";

export function ContentJsonViewer({ json }: { json: string }) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden bg-[#141414]">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3">
        <span className="text-(--text-muted) text-sm">content.json</span>
        <CopyTextButton
          labels={{
            idle: "Copy all",
            loading: "Copying",
            done: "Copied",
            error: "Select the text",
          }}
          text={json}
        />
      </div>
      <textarea
        className="min-h-[min(50dvh,28rem)] w-full flex-1 resize-y border-0 bg-transparent p-4 font-mono text-(--foreground) text-[12px] leading-relaxed outline-none md:min-h-[32rem]"
        readOnly
        spellCheck={false}
        value={json}
      />
    </div>
  );
}
