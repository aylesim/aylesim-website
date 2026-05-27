"use client";

import { useState } from "react";

const linkClass =
  "underline decoration-(--foreground)/35 underline-offset-[3px] transition-colors hover:text-(--accent)";

export function ContentJsonViewer({ json }: { json: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function copyContent() {
    setStatus("loading");
    try {
      await navigator.clipboard.writeText(json);
      setStatus("done");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2800);
    }
  }

  function copyLabel() {
    if (status === "loading") {
      return "Copying…";
    }
    if (status === "done") {
      return "Copied";
    }
    if (status === "error") {
      return "Copy failed — select text manually";
    }
    return "Copy JSON";
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <p className="font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
          content.json
        </p>
        <button
          className={`${linkClass} font-mono text-[10px] uppercase tracking-widest`}
          disabled={status === "loading"}
          onClick={copyContent}
          type="button"
        >
          {copyLabel()}
        </button>
      </div>
      <textarea
        className="min-h-[min(70dvh,42rem)] w-full resize-y border border-(--index-divider) border-dotted bg-(--foreground)/[0.02] p-4 font-mono text-(--foreground)/90 text-[11px] leading-relaxed outline-none focus:border-(--accent)/50 md:p-5 md:text-xs"
        readOnly
        spellCheck={false}
        value={json}
      />
    </div>
  );
}
