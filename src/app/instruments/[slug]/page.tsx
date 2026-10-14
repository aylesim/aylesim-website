import {
  metadataForProject,
  projectParams,
  renderProject,
} from "@/lib/project-page-route";

export const dynamicParams = false;
export function generateStaticParams() {
  return projectParams("instruments");
}
export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return renderProject("instruments", params);
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return metadataForProject("instruments", params);
}
