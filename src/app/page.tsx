import { Suspense } from "react";
import ArchiveShell from "@/components/home/archive-shell";
import { getAllContent } from "@/lib/content";

export default function Home() {
  const content = getAllContent();
  return (
    <Suspense>
      <ArchiveShell content={content} />
    </Suspense>
  );
}
