export function projectHasNationalArtsAward(
  project: { slug: string; highlights: string[] },
  nationalArtsAwardProjectSlug: string
): boolean {
  if (project.slug === nationalArtsAwardProjectSlug) {
    return true;
  }
  return project.highlights.some((h) =>
    h.toLowerCase().includes("national arts award")
  );
}
