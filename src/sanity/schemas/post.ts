export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: unknown) =>
        (Rule as { required: () => unknown }).required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: unknown) =>
        (Rule as { required: () => unknown }).required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Aylesim",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Alternative text",
            },
          ],
        },
      ],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare(value: Record<string, unknown>) {
      const { title, media, publishedAt } = value;
      return {
        title: title as string,
        // biome-ignore lint/suspicious/noExplicitAny: Sanity PreviewValue media type is not exported
        media: media as any,
        subtitle: publishedAt
          ? new Date(publishedAt as string).toLocaleDateString()
          : "No date",
      };
    },
  },
};
