export function withoutNeeds(text: string): string {
  return text.replace(/\[needs[^\]]*\]/gi, "").trim();
}
