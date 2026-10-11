import type { Project } from "@/lib/content";

const YOUTUBE_ID_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
const VIMEO_ID_REGEX = /vimeo\.com\/(\d+)/;

export type ProjectCover = {
  src: string;
  kind: "still" | "video";
};

function videoThumbnail(url: string): string | null {
  const youtubeMatch = url.match(YOUTUBE_ID_REGEX);
  if (youtubeMatch?.[1]) {
    return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
  }
  const vimeoMatch = url.match(VIMEO_ID_REGEX);
  if (vimeoMatch?.[1]) {
    return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
  }
  return null;
}

export function projectStills(project: Project): string[] {
  const gallery = project.galleryAfterVideo ?? [];
  const merged = [...project.images, ...gallery]
    .map((src) => src.trim())
    .filter(Boolean);
  return [...new Set(merged)];
}

export function getProjectCover(project: Project): ProjectCover | null {
  const still = projectStills(project)[0];
  if (still) {
    return { src: still, kind: "still" };
  }
  const videoUrl = project.videos?.[0]?.url;
  if (videoUrl) {
    const thumb = videoThumbnail(videoUrl);
    if (thumb) {
      return { src: thumb, kind: "video" };
    }
  }
  return null;
}
