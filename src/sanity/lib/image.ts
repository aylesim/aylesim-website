import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: unknown) {
  // biome-ignore lint/suspicious/noExplicitAny: SanityImageSource type is not exported from @sanity/image-url
  return builder.image(source as any);
}
