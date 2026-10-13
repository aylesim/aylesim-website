"use client";

import { CopyTextButton } from "@/components/ask-ai/copy-text-button";

export function ExamplePromptsList({
  prompts,
}: {
  prompts: readonly string[];
}) {
  return (
    <div>
      <p className="mb-2 text-(--text-muted) text-sm">Example questions</p>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {prompts.map((prompt) => (
          <li
            className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2"
            key={prompt}
          >
            <p className="min-w-0 flex-1">{prompt}</p>
            <CopyTextButton
              labels={{
                idle: "Copy",
                loading: "Copying",
                done: "Copied",
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
