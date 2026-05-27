import { serializeSiteContentText } from "@/lib/content-text";

export function GET() {
  const body = serializeSiteContentText();

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
