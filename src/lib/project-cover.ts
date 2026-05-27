import type { Project } from "@/lib/content";

const YOUTUBE_ID_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
const VIMEO_ID_REGEX = /vimeo\.com\/(\d+)/;

const SELECTED_COVERS: Record<string, string> = {
  birds: "/Birdsgr.png",
  "knob-studio": "/knobstudio.png",
  freesound4live: "/ffl.png",
  "lucky-notes": "/LN.png",
  disco: "/disco.png",
  "planetary-compendium": "/planetary.png",
  "tedx-barletta": "https://img.youtube.com/vi/GJUaN92rx-0/hqdefault.jpg",
  "there-will-be-no-more-determination": "/tw0.jpg",
  "please-set-a-password": "/tw2.jpg",
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

function picsumPlaceholder(slug: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/1280/720`;
}

export function getProjectCover(project: Project): string {
  const selected = SELECTED_COVERS[project.slug];
  if (selected) {
    return selected;
  }
  const canvasCover = project.canvasCover?.trim();
  if (canvasCover) {
    return canvasCover;
  }
  const firstImage = project.images.map((url) => url.trim()).find(Boolean);
  if (firstImage) {
    return firstImage;
  }
  const videoUrl = project.videos?.[0]?.url;
  if (videoUrl) {
    const thumb = videoThumbnail(videoUrl);
    if (thumb) {
      return thumb;
    }
  }
  return picsumPlaceholder(project.slug);
}
