import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/art");

import { SectionPage } from "@/components/section-page";
export default function Page() {
  return <SectionPage section="art" />;
}
