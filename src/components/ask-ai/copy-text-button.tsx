"use client";

import {
  type CopyLabels,
  copyButtonLabel,
  useCopyText,
} from "@/components/ask-ai/use-copy-text";

const buttonClass =
  "shrink-0 text-sm text-(--text-muted) underline underline-offset-3 hover:text-(--foreground) disabled:opacity-50";

const defaultLabels: CopyLabels = {
  idle: "Copy",
  loading: "Copying…",
  done: "Copied ✓",
  error: "Failed",
};

export function CopyTextButton({
  text,
  labels = defaultLabels,
}: {
  text: string;
  labels?: CopyLabels;
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
