import { getAllContent } from "@/lib/content";
import { pressMentions, primaryAward } from "@/lib/credentials";
import { contactEmail, contactLinks } from "@/lib/site";

export function getSiteContentPayload() {
  return {
    content: getAllContent(),
    site: {
      contactEmail,
      contactLinks,
      primaryAward,
      pressMentions,
    },
  };
}

export function serializeSiteContentJson() {
  return JSON.stringify(getSiteContentPayload(), null, 2);
}
