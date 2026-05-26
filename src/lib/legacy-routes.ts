export function isLegacyAboutUrl(sp: URLSearchParams): boolean {
  const aboutParam = sp.get("about");
  if (aboutParam === "1" || aboutParam === "true") {
    return true;
  }

  const raw = sp.get("sel");
  if (!raw) {
    return false;
  }

  const decoded = decodeURIComponent(raw);
  if (decoded === "about" || decoded === "contact" || decoded === "elsewhere") {
    return true;
  }

  const colon = decoded.indexOf(":");
  if (colon <= 0) {
    return false;
  }

  return decoded.slice(0, colon) === "info";
}

export function parseLegacyProjectSlug(sp: URLSearchParams): string | null {
  const raw = sp.get("sel");
  if (!raw) {
    return null;
  }

  const decoded = decodeURIComponent(raw);
  const colon = decoded.indexOf(":");
  if (colon <= 0) {
    return null;
  }

  const prefix = decoded.slice(0, colon);
  const slug = decoded.slice(colon + 1);
  if (!slug) {
    return null;
  }

  if (prefix === "project" || prefix === "work" || prefix === "device") {
    return slug;
  }

  return null;
}

export function searchParamsFromRecord(
  params: Record<string, string | string[] | undefined>
): URLSearchParams {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      sp.set(key, value);
    } else if (Array.isArray(value) && value[0]) {
      sp.set(key, value[0]);
    }
  }
  return sp;
}
