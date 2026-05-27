import { serializeSiteContentHtml } from "@/lib/content-html";

export function GET() {
  const body = serializeSiteContentHtml();

  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
