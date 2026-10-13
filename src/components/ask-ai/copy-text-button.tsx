"use client";

import {
  copyButtonLabel,
  useCopyText,
} from "@/components/ask-ai/use-copy-text";

const buttonClass =
  "shrink-0 text-sm text-(--text-muted) underline underline-offset-3 hover:text-(--foreground) disabled:opacity-50";

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
