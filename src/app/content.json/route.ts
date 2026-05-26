import { getAllContent } from "@/lib/content";
import { pressMentions, primaryAward } from "@/lib/credentials";
import { contactEmail, contactLinks } from "@/lib/site";

export function GET() {
  return Response.json({
    content: getAllContent(),
    site: {
      contactEmail,
      contactLinks,
      primaryAward,
      pressMentions,
    },
  });
}
