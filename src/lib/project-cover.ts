import type { Project } from "@/lib/content";

const YOUTUBE_ID_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

const SELECTED_COVERS: Record<string, string> = {
  birds: "/Birdsgr.png",
  "knob-studio": "/knobstudio.png",
  freesound4live: "/ffl.png",
  "lucky-notes": "/LN.png",
  "planetary-compendium": "/planetary.png",
  "tedx-barletta": "https://img.youtube.com/vi/GJUaN92rx-0/hqdefault.jpg",
  "there-will-be-no-more-determination": "/tw0.jpg",
};

const FALLBACK_COVER = "/tw1.jpg";

export function getProjectCover(project: Project): string {
  const selected = SELECTED_COVERS[project.slug];
  if (selected) {
    return selected;
  }
  if (project.canvasCover) {
    return project.canvasCover;
  }
  if (project.images[0]) {
    return project.images[0];
  }
  const videoUrl = project.videos?.[0]?.url;
  if (videoUrl) {
    const match = videoUrl.match(YOUTUBE_ID_REGEX);
    if (match?.[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
  }
  return FALLBACK_COVER;
}
