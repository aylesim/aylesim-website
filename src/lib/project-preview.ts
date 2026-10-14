import type { Project, ProjectVideo } from "@/lib/content";

const webpExtension = /\.webp$/;

export type ProjectPreview = Pick<
  Project,
  | "slug"
  | "title"
  | "year"
  | "category"
  | "featured"
  | "images"
  | "canvasCover"
  | "imageAlt"
  | "sortYear"
  | "showInMenu"
  | "menuLabel"
> & { previewVideo?: ProjectVideo };

export function projectPreview(project: Project): ProjectPreview {
  const {
    slug,
    title,
    year,
    category,
    featured,
    images,
    canvasCover,
    imageAlt,
    sortYear,
    showInMenu,
    menuLabel,
  } = project;
  const thumbnail = canvasCover?.replace(webpExtension, "-thumb.webp") ?? null;
  return {
    previewVideo: project.videos?.[0],
    slug,
    title,
    year,
    category,
    featured,
    images: images.slice(0, 1),
    canvasCover: thumbnail,
    imageAlt,
    sortYear,
    showInMenu,
    menuLabel,
  };
}
