"use client";

import { CopyTextButton } from "@/components/ask-ai/copy-text-button";

export function ExamplePromptsList({
  prompts,
}: {
  prompts: readonly string[];
}) {
  return (
    <div>
      <p className="mb-4 font-mono text-(--accent) text-[10px] uppercase tracking-widest">
        Example questions
      </p>
      <ul className="m-0 flex list-none flex-col gap-0 border border-(--index-divider) border-dotted p-0">
        {prompts.map((prompt) => (
          <li
            className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 border-(--index-divider) border-t border-dotted px-3 py-3 first:border-t-0"
            key={prompt}
          >
            <p className="min-w-0 flex-1 text-(--foreground) text-sm leading-relaxed">
              {prompt}
            </p>
            <CopyTextButton
              labels={{
                idle: "Copy",
                loading: "Copying…",
                done: "Copied ✓",
                error: "Failed",
              }}
              text={prompt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
