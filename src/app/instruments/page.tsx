import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("/instruments");

import { SectionPage } from "@/components/section-page";
export default function Page() {
  return <SectionPage section="instruments" />;
}
