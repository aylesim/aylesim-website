export const contentJsonPath = "/content.json";

export function contentJsonUrl(origin: string) {
  return `${origin}${contentJsonPath}`;
}
