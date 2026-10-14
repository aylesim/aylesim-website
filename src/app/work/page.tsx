import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/work");

import { SectionPage } from "@/components/section-page";
export default function Page() {
  return <SectionPage section="work" />;
}
