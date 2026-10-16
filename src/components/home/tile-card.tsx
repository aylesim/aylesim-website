import Image from "next/image";
import type { KeyboardEvent, MouseEvent, Ref } from "react";
import { withoutNeeds } from "@/lib/needs";
import type { ProjectCover } from "@/lib/project-cover";
import type { ProjectPreview } from "@/lib/project-preview";
import { CATEGORY_LABELS } from "@/lib/roles";
import { DESKTOP_STAGE_QUERY } from "@/lib/tile-layout";

function keyboardActivate(
  event: MouseEvent<HTMLButtonElement>,
  action: () => void
) {
  if (event.detail === 0 || !window.matchMedia(DESKTOP_STAGE_QUERY).matches) {
    action();
  }
}

function NeedsText({ text }: { text: string }) {
  return <span>{withoutNeeds(text)}</span>;
}

function navigateMenu(event: KeyboardEvent<HTMLButtonElement>) {
  const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
  if (!keys.includes(event.key)) {
    return;
  }
  const world = event.currentTarget.closest(".tile-world");
  const buttons = Array.from(
    world?.querySelectorAll<HTMLButtonElement>(
      ".tile:not([hidden]):not([inert]) .tile-open:not(:disabled)"
    ) ?? []
  );
  const index = buttons.indexOf(event.currentTarget);
  let next =
    (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) %
    buttons.length;
  if (event.key === "Home") {
    next = 0;
  }
  if (event.key === "End") {
    next = buttons.length - 1;
  }
  event.preventDefault();
  buttons[next]?.focus({ preventScroll: true });
  buttons[next]?.scrollIntoView({ block: "nearest", behavior: "instant" });
}

export function TileCard({
  project,
  cover,
  visible,
  tileRef,
  onOpen,
  menuActive,
  menuReady,
}: {
  project: ProjectPreview;
  cover: ProjectCover | null;
  visible: boolean;
  tileRef: Ref<HTMLDivElement>;
  onOpen: () => void;
  onPreview: () => void;
  menuActive: boolean;
  menuReady: boolean;
}) {
  return (
    <div
      aria-hidden={!visible}
      className={project.featured ? "tile is-featured" : "tile"}
      data-slug={project.slug}
      draggable={false}
      hidden={!visible}
      inert={!visible}
      ref={tileRef}
    >
      {cover ? (
        <Image
          alt={withoutNeeds(project.imageAlt ?? "")}
          className="tile-image"
          height={500}
          loading={project.featured ? "eager" : "lazy"}
          sizes="(max-width: 767px) calc(100vw - 32px), (max-aspect-ratio: 1/1) 56vw, 16vw"
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
        aria-label={`Open ${withoutNeeds(project.title) || "project"}`}
        className="tile-open"
        disabled={menuActive && !menuReady}
        onClick={(event) =>
          menuActive ? onOpen() : keyboardActivate(event, onOpen)
        }
        onKeyDown={menuReady ? navigateMenu : undefined}
        type="button"
      />
      <mark className="tile-clip" data-needs>
        [needs clip]
      </mark>
      <span className="tile-meta">
        {project.year ? <NeedsText text={project.year} /> : null}
        <NeedsText text={project.title} />
      </span>
      <span aria-hidden="true" className="tile-menu-meta">
        <span className="tile-menu-title">
          <NeedsText text={project.title} />
        </span>
        <span className="tile-menu-detail">
          {project.category ? (
            <span>{CATEGORY_LABELS[project.category]}</span>
          ) : null}
          {project.year ? <NeedsText text={project.year} /> : null}
        </span>
      </span>
    </div>
  );
}
