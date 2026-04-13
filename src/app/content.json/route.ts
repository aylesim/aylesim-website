import { getAllContent } from "@/lib/content";
import { contactEmail, contactLinks, mentionLinks } from "@/lib/site";

export function GET() {
  return Response.json({
    content: getAllContent(),
    site: {
      contactEmail,
      contactLinks,
      mentionLinks,
    },
  });
}
