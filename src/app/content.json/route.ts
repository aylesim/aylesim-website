import { serializeSiteContentJson } from "@/lib/content-json";

export const dynamic = "force-dynamic";

export function GET() {
  const body = serializeSiteContentJson();

  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
