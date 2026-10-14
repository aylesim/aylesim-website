"use client";

import { useCallback, useState } from "react";

export type CopyStatus = "idle" | "loading" | "done" | "error";
export type CopyLabels = Record<CopyStatus, string>;

export function useCopyText() {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const copy = useCallback(async (text: string) => {
    setStatus("loading");
    try {
      await navigator.clipboard.writeText(text);
      setStatus("done");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2800);
    }
  }, []);

  return { status, copy };
}

export function copyButtonLabel(status: CopyStatus, labels: CopyLabels) {
  return labels[status];
}
