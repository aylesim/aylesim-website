import { serializeSiteContentJson } from "@/lib/content-json";

export function GET(request: Request) {
  const minify =
    new URL(request.url).searchParams.get("minify") === "1" ||
    new URL(request.url).searchParams.get("minify") === "true";

  const body = serializeSiteContentJson(minify);

  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
