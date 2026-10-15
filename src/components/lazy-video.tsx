"use client";

import { type ReactNode, useEffect, useId, useState } from "react";
import type { ProjectVideo } from "@/lib/content";
import { withoutNeeds } from "@/lib/needs";

function embedUrl(url: string) {
  const source = new URL(url);
  if (source.hostname.includes("youtube.com")) {
    return `https://www.youtube-nocookie.com/embed/${source.searchParams.get("v")}?autoplay=1`;
  }
  if (source.hostname === "youtu.be") {
    return `https://www.youtube-nocookie.com/embed${source.pathname}?autoplay=1`;
  }
  return `https://player.vimeo.com/video${source.pathname}?autoplay=1`;
}

export function LazyVideo({
  video,
  poster,
  autoStart = false,
}: {
  video: ProjectVideo;
  poster?: ReactNode;
  autoStart?: boolean;
}) {
  const [playing, setPlaying] = useState(autoStart);
  const id = useId();
  useEffect(() => {
    const stopOther = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) {
        setPlaying(false);
      }
    };
    window.addEventListener("aylesim-play", stopOther);
    return () => window.removeEventListener("aylesim-play", stopOther);
  }, [id]);
  return (
    <figure className="project-video">
      {playing ? (
        <iframe
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          src={embedUrl(video.url)}
          title={withoutNeeds(video.title) || "Project video"}
        />
      ) : (
        <div className="video-preview">
          {poster}
          <button
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("aylesim-play", { detail: id })
              );
              setPlaying(true);
            }}
            type="button"
          >
            Play {withoutNeeds(video.title)} with sound
          </button>
        </div>
      )}
      <figcaption>
        <a href={video.url}>Watch video: {withoutNeeds(video.title)}</a>
      </figcaption>
    </figure>
  );
}
