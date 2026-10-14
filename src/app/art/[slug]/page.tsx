import {
  metadataForProject,
  projectParams,
  renderProject,
} from "@/lib/project-page-route";

export const dynamicParams = false;
export function generateStaticParams() {
  return projectParams("art");
}
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return renderProject("art", params);
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return metadataForProject("art", params);
}
