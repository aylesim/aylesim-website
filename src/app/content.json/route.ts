import { getAllContent } from "@/lib/content";
import { pressMentions, primaryAward } from "@/lib/credentials";
import { contactEmail, contactLinks } from "@/lib/site";

export function GET(request: Request) {
  const payload = {
    content: getAllContent(),
    site: {
      contactEmail,
      contactLinks,
      primaryAward,
      pressMentions,
    },
  };

  const minify =
    new URL(request.url).searchParams.get("minify") === "1" ||
    new URL(request.url).searchParams.get("minify") === "true";

  const body = minify
    ? JSON.stringify(payload)
    : JSON.stringify(payload, null, 2);

  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
