import { projectParams, renderProject } from "@/lib/project-page-route";

export const dynamicParams = false;
export function generateStaticParams() {
  return projectParams("work");
}
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return renderProject("work", params);
}
