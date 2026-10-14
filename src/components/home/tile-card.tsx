import Image from "next/image";
import type { MouseEvent, Ref } from "react";
import type { ProjectCover } from "@/lib/project-cover";
import type { ProjectPreview } from "@/lib/project-preview";
import { CATEGORY_LABELS } from "@/lib/roles";

function keyboardActivate(
  event: MouseEvent<HTMLButtonElement>,
  action: () => void
) {
  if (event.detail === 0) {
    action();
  }
}

function NeedsText({ text }: { text: string }) {
  return text.includes("[needs") ? (
    <mark data-needs>{text}</mark>
  ) : (
    <span>{text}</span>
  );
}

export function TileCard({
  project,
  cover,
  visible,
  tileRef,
  onOpen,
  onPreview,
}: {
  project: ProjectPreview;
  cover: ProjectCover | null;
  visible: boolean;
  tileRef: Ref<HTMLDivElement>;
  onOpen: () => void;
  onPreview: () => void;
}) {
  return (
    <div
      aria-hidden={!visible}
      className={project.featured ? "tile is-featured" : "tile"}
      data-slug={project.slug}
      draggable={false}
      inert={!visible}
      ref={tileRef}
    >
      {cover ? (
        <Image
          alt={project.imageAlt ?? "[needs alt text]"}
          className="tile-image"
          height={500}
          loading={project.featured ? "eager" : "lazy"}
          sizes="(max-aspect-ratio: 1/1) 56vw, 16vw"
          src={cover.src}
          width={800}
        />
      ) : (
        <span className="tile-fallback">
          <NeedsText text={project.title} />
        </span>
      )}
      <span className="tile-veil" />
      <span className="tile-category">
        {project.category ? CATEGORY_LABELS[project.category] : ""}
      </span>
      <button
        aria-label={`Open ${project.title}`}
        className="tile-open"
        onClick={(event) => keyboardActivate(event, onOpen)}
        type="button"
      />
      {project.previewVideo ? (
        <button
          aria-label={`Play ${project.title} video with sound`}
          className="tile-sound"
          data-preview
          onClick={(event) => keyboardActivate(event, onPreview)}
          type="button"
        >
          Play sound
        </button>
      ) : null}
      <mark className="tile-clip" data-needs>
        [needs clip]
      </mark>
      <span className="tile-meta">
        {project.year ? <NeedsText text={project.year} /> : null}
        <NeedsText text={project.title} />
      </span>
    </div>
  );
}
