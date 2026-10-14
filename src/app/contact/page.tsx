import { PageFrame } from "@/components/site/site-chrome";
import { getAllContent } from "@/lib/content";
export default function Page() {
  const { home, site } = getAllContent();
  return (
    <PageFrame
      brand={home.brand}
      contactEmail={site.contactEmail}
      current="contact"
    >
      <main className="project-page">
        <h1>Contact</h1>
        <p>
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
        <p>Berlin, EU citizen</p>
      </main>
    </PageFrame>
  );
}
