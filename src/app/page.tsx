import { redirect } from "next/navigation";
import { Suspense } from "react";
import RectNav from "@/components/home/rect-nav";
import { getAllContent } from "@/lib/content";
import { isLegacyAboutUrl, searchParamsFromRecord } from "@/lib/legacy-routes";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  if (isLegacyAboutUrl(searchParamsFromRecord(params))) {
    redirect("/about");
  }

  const content = getAllContent();
  return (
    <div className="flex min-h-dvh flex-col">
      <Suspense>
        <RectNav content={content} />
      </Suspense>
    </div>
  );
}
