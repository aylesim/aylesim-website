import { getAllContent } from "@/lib/content";
import { pressMentions, primaryAward } from "@/lib/credentials";
import { contactEmail, contactLinks } from "@/lib/site";

function toAskAiContent() {
  const { projects, about } = getAllContent();

  return {
    projects: projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      year: project.year,
      description: project.description,
      descriptionAfterVideos: project.descriptionAfterVideos,
      highlights: project.highlights,
      link: project.link,
      linkLabel: project.linkLabel,
      primaryMeta: project.primaryMeta,
      secondaryMeta: project.secondaryMeta,
      workScope: project.workScope,
      featured: project.featured,
      videos: project.videos,
    })),
    about: {
      lede: about.lede,
      subtitle: about.subtitle,
      body: about.body,
    },
  };
}

export function getSiteContentPayload() {
  return {
    content: toAskAiContent(),
    site: {
      contactEmail,
      contactLinks,
      primaryAward,
      pressMentions,
    },
  };
}

export function serializeSiteContentJson() {
  return JSON.stringify(getSiteContentPayload());
}
