"use client";

import {
  copyButtonLabel,
  useCopyText,
} from "@/components/ask-ai/use-copy-text";

const buttonClass =
  "shrink-0 font-mono text-[10px] uppercase tracking-widest text-(--text-muted) underline decoration-(--foreground)/25 underline-offset-2 transition-colors hover:text-(--foreground) disabled:opacity-50";

export function CopyTextButton({
  text,
  labels = {
    idle: "Copy",
    loading: "Copying…",
    done: "Copied ✓",
    error: "Failed",
  },
}: {
  text: string;
  labels?: {
    idle: string;
    loading: string;
    done: string;
    error: string;
  };
}) {
  const { status, copy } = useCopyText();

  return (
    <button
      className={buttonClass}
      disabled={status === "loading"}
      onClick={() => copy(text)}
      type="button"
    >
      {copyButtonLabel(status, labels)}
    </button>
  );
}
