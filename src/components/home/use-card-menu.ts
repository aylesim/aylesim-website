"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { type RefObject, useEffect, useRef, useState } from "react";
import {
  animateCardMenu,
  cardGeometry,
  type MenuElements,
  placeCards,
} from "@/components/home/card-menu-animation";
import { DESKTOP_STAGE_QUERY } from "@/lib/tile-layout";

type MenuOptions = {
  open: boolean;
  visible: readonly boolean[];
  stageRef: RefObject<HTMLElement | null>;
  pivotRef: RefObject<HTMLDivElement | null>;
  worldRef: RefObject<HTMLDivElement | null>;
  tilesRef: RefObject<(HTMLDivElement | null)[]>;
  refreshLayout: RefObject<((instant?: boolean) => void) | null>;
  rememberStage: () => void;
};

export function useCardMenu(options: MenuOptions) {
  const latest = useRef(options);
  latest.current = options;
  const activeRef = useRef(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const control = useRef<((open: boolean, queue?: boolean) => void) | null>(
    null
  );
  const previousOpen = useRef(false);
  const focusOnReady = useRef(false);

  useGSAP(
    () => {
      const { stageRef, pivotRef, worldRef, tilesRef } = latest.current;
      const stage = stageRef.current;
      const pivot = pivotRef.current;
      const world = worldRef.current;
      if (!(stage && pivot && world)) {
        return;
      }
      const tiles = tilesRef.current.filter((tile) => tile !== null);
      const images = tiles.map((tile) =>
        tile.querySelector<HTMLElement>(".tile-image, .tile-fallback")
      );
      const labels = stage.querySelectorAll<HTMLElement>(".tile-menu-meta");
      const heading = stage.querySelector<HTMLElement>(".tile-menu-heading");
      const elements: MenuElements = {
        stage,
        pivot,
        world,
        tiles,
        images,
        labels,
        heading,
      };
      let session: gsap.Context | null = null;
      let animation: gsap.core.Timeline | null = null;
      let origin = tiles.map((tile) => cardGeometry(tile, 0));
      let originVisibility = latest.current.visible;
      let scroll = 0;
      let homeScroll = 0;
      const home = stage.closest<HTMLElement>(".site-home");
      let resizeFrame = 0;

      const restore = () => {
        animation?.kill();
        animation = null;
        session?.revert();
        session = null;
        stage.classList.remove("is-card-menu");
        delete stage.dataset.menuReady;
        activeRef.current = false;
        tiles.forEach((tile, index) => {
          const hidden = !latest.current.visible[index];
          tile.hidden = hidden;
          tile.inert = hidden;
          tile.setAttribute("aria-hidden", String(hidden));
        });
        stage.scrollTop = scroll;
        if (window.matchMedia(DESKTOP_STAGE_QUERY).matches) {
          latest.current.refreshLayout.current?.(true);
        } else {
          gsap.set([pivot, world, ...tiles], {
            clearProps:
              "transform,translate,rotate,scale,transformOrigin,touchAction",
          });
        }
        if (home) {
          home.scrollTop = homeScroll;
        }
        Draggable.get(world)?.enable();
      };

      const prepare = () => {
        latest.current.rememberStage();
        const rotation = Number(gsap.getProperty(pivot, "rotation"));
        origin = tiles.map((tile) => cardGeometry(tile, rotation));
        originVisibility = latest.current.visible;
        scroll = stage.scrollTop;
        homeScroll = home?.scrollTop ?? 0;
        activeRef.current = true;
        setActive(true);
        const drag = Draggable.get(world);
        drag?.tween?.kill();
        drag?.disable();
        gsap.killTweensOf([pivot, world, ...tiles]);
        stage.classList.add("is-card-menu");
        stage.scrollTop = 0;
        session = gsap.context(() => placeCards(elements, origin), stage);
      };

      const rebase = () => {
        const current = tiles.map((tile) => ({
          ...cardGeometry(tile, Number(gsap.getProperty(tile, "rotation"))),
          backgroundColor: getComputedStyle(tile).backgroundColor,
          borderBottomColor: getComputedStyle(tile).borderBottomColor,
        }));
        const currentImages = images.map(
          (image) =>
            image && {
              x: Number(gsap.getProperty(image, "x")),
              y: Number(gsap.getProperty(image, "y")),
              width: image.offsetWidth,
              height: image.offsetHeight,
            }
        );
        restore();
        prepare();
        session?.add(() => {
          tiles.forEach((tile, index) => {
            const { hidden, ...geometry } = current[index];
            tile.hidden = hidden;
            gsap.set(tile, geometry);
            const image = images[index];
            const imageGeometry = currentImages[index];
            if (image && imageGeometry) {
              gsap.set(image, imageGeometry);
            }
          });
        });
      };

      const animate = (open: boolean, queue = true) => {
        if (!(session || open)) {
          return;
        }
        if (!session) {
          prepare();
        }
        if (!open && originVisibility !== latest.current.visible) {
          rebase();
        }
        animation?.kill();
        setReady(false);
        delete stage.dataset.menuReady;
        tiles.forEach((tile, index) => {
          const shown = latest.current.visible[index];
          if (shown) {
            tile.hidden = false;
          }
          tile.inert = !shown;
          tile.setAttribute("aria-hidden", String(!shown));
        });
        session?.add(() => {
          animation = animateCardMenu({
            elements,
            origin,
            visible: latest.current.visible,
            open,
            queue,
            onComplete: () => {
              if (latest.current.open) {
                tiles.forEach((tile, index) => {
                  tile.hidden = !latest.current.visible[index];
                });
                stage.dataset.menuReady = "true";
                setReady(true);
              } else {
                restore();
                setActive(false);
              }
            },
          });
        });
      };
      control.current = animate;
      const resize = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          if (!session) {
            return;
          }
          rebase();
          animate(latest.current.open, false);
        });
      };
      window.addEventListener("resize", resize);
      return () => {
        cancelAnimationFrame(resizeFrame);
        window.removeEventListener("resize", resize);
        animation?.kill();
        session?.revert();
        control.current = null;
      };
    },
    { scope: options.stageRef }
  );

  useGSAP(
    () => {
      const changed = previousOpen.current !== options.open;
      previousOpen.current = options.open;
      if (changed && options.open) {
        focusOnReady.current = true;
      }
      control.current?.(options.open, changed);
    },
    { dependencies: [options.open, options.visible], scope: options.stageRef }
  );

  useEffect(() => {
    if (ready && options.open && focusOnReady.current) {
      focusOnReady.current = false;
      options.stageRef.current
        ?.querySelector<HTMLButtonElement>(
          ".tile:not([hidden]) .tile-open:not(:disabled)"
        )
        ?.focus({ preventScroll: true });
    }
  }, [ready, options.open, options.stageRef]);

  return { active, ready, activeRef };
}
