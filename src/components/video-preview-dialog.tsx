"use client";

import { useEffect, useRef } from "react";
import { LazyVideo } from "@/components/lazy-video";
import type { ProjectVideo } from "@/lib/content";

export function VideoPreviewDialog({
  title,
  video,
  onClose,
}: {
  title: string;
  video: ProjectVideo;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement;
    ref.current?.showModal();
    return () => {
      if (previous instanceof HTMLElement) {
        previous.focus();
      }
    };
  }, []);
  return (
    <dialog
      aria-label={`${title} video preview`}
      className="sound-preview"
      onCancel={onClose}
      ref={ref}
    >
      <button className="sound-preview-close" onClick={onClose} type="button">
        Close preview
      </button>
      <h2>{title}</h2>
      <LazyVideo autoStart video={video} />
    </dialog>
  );
}
