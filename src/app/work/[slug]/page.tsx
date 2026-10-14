import {
  metadataForProject,
  projectParams,
  renderProject,
} from "@/lib/project-page-route";

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

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return metadataForProject("work", params);
}
