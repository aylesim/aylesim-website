import { Suspense } from "react";
import RectNav from "@/components/home/rect-nav";
import { getAllContent } from "@/lib/content";

export default function Home() {
  const content = getAllContent();
  return (
    <div className="flex min-h-dvh flex-col">
      <Suspense>
        <RectNav content={content} />
      </Suspense>
    </div>
  );
}
