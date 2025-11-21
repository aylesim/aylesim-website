export default {
  name: "project",
  title: "Project",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Interactive Systems", value: "interactive-systems" },
          { title: "Generative Projects", value: "generative-projects" },
          { title: "Code & Technology", value: "code-technology" },
        ],
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "link",
      title: "External Link",
      type: "url",
    },
    {
      name: "github",
      title: "GitHub Repository",
      type: "url",
    },
    {
      name: "content",
      title: "Content",
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
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      category: "category",
      featured: "featured",
    },
    prepare(value: Record<string, unknown>) {
      const { title, media, category, featured } = value;
      return {
        title: title as string,
        // biome-ignore lint/suspicious/noExplicitAny: Sanity PreviewValue media type is not exported
        media: media as any,
        subtitle: `${(category as string | undefined) || "No category"}${featured ? " ⭐" : ""}`,
      };
    },
  },
};
