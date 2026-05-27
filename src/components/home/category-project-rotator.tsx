"use client";

import { defineTransition, Runner } from "@vysmo/transitions";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";

const ROTATE_MS = 5000;
const TRANSITION_DURATION_S = 1.1;

const coverMorph = defineTransition({
  name: "cover-morph",
  defaults: { strength: 0.1 },
  glsl: `
uniform float uStrength;

vec4 transition(vec2 uv) {
  float envelope = 4.0 * uProgress * (1.0 - uProgress);
  vec2 offset = (uv - 0.5) * uStrength * envelope;

  vec2 fromUv = clamp(uv + offset, 0.0, 1.0);
  vec2 toUv = clamp(uv - offset, 0.0, 1.0);

  return mix(getFromColor(fromUv), getToColor(toUv), uProgress);
}
`,
});

const COVER_MORPH_PARAMS = { strength: 0.1 } as const;

function loadCoverImage(url: string) {
  const image = document.createElement("img");
  image.crossOrigin = "anonymous";
  image.src = url;
  return image.decode().then(() => image);
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number
) {
  const scale = Math.max(
    width / image.naturalWidth,
    height / image.naturalHeight
  );
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

function paintMorphFrame({
  container,
  fromCanvas,
  toCanvas,
  fromUrl,
  toUrl,
  images,
  progress,
  runner,
}: {
  container: HTMLDivElement | null;
  fromCanvas: HTMLCanvasElement;
  toCanvas: HTMLCanvasElement;
  fromUrl: string;
  toUrl: string;
  images: Map<string, HTMLImageElement>;
  progress: number;
  runner: Runner;
}) {
  if (!container) {
    return;
  }
  const fromCtx = fromCanvas.getContext("2d");
  if (!fromCtx) {
    return;
  }
  const toCtx = toCanvas.getContext("2d");
  if (!toCtx) {
    return;
  }
  const fromImage = images.get(fromUrl);
  if (!fromImage) {
    return;
  }
  const toImage = images.get(toUrl);
  if (!toImage) {
    return;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const pixelWidth = Math.floor(container.clientWidth * dpr);
  const pixelHeight = Math.floor(container.clientHeight * dpr);
  if (pixelWidth === 0 || pixelHeight === 0) {
    return;
  }
  drawImageCover(fromCtx, fromImage, pixelWidth, pixelHeight);
  drawImageCover(toCtx, toImage, pixelWidth, pixelHeight);
  runner.render(coverMorph, {
    from: fromCanvas,
    to: toCanvas,
    progress,
    params: COVER_MORPH_PARAMS,
  });
}

export function CategoryProjectRotator({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (slug: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fromCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const toCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const indexRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const covers = useMemo(
    () => projects.map((project) => getProjectCover(project)),
    [projects]
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container) {
      return;
    }
    if (!canvas) {
      return;
    }
    if (covers.length === 0) {
      return;
    }

    let cancelled = false;
    setReady(false);
    setUseFallback(false);
    indexRef.current = 0;
    setDisplayIndex(0);

    const fromCanvas = document.createElement("canvas");
    const toCanvas = document.createElement("canvas");
    fromCanvasRef.current = fromCanvas;
    toCanvasRef.current = toCanvas;

    let runner: Runner;
    try {
      runner = new Runner({ canvas });
    } catch {
      setUseFallback(true);
      return;
    }
    runnerRef.current = runner;

    const fromCtx = fromCanvas.getContext("2d");
    if (!fromCtx) {
      setUseFallback(true);
      return;
    }
    const toCtx = toCanvas.getContext("2d");
    if (!toCtx) {
      setUseFallback(true);
      return;
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) {
        return;
      }
      const pixelWidth = Math.floor(width * dpr);
      const pixelHeight = Math.floor(height * dpr);
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      fromCanvas.width = pixelWidth;
      fromCanvas.height = pixelHeight;
      toCanvas.width = pixelWidth;
      toCanvas.height = pixelHeight;
      return { pixelWidth, pixelHeight };
    };

    const paintCovers = (fromUrl: string, toUrl: string) => {
      const size = resize();
      if (!size) {
        return false;
      }
      const fromImage = imagesRef.current.get(fromUrl);
      if (!fromImage) {
        return false;
      }
      const toImage = imagesRef.current.get(toUrl);
      if (!toImage) {
        return false;
      }
      drawImageCover(fromCtx, fromImage, size.pixelWidth, size.pixelHeight);
      drawImageCover(toCtx, toImage, size.pixelWidth, size.pixelHeight);
      return true;
    };

    const renderFrame = (fromUrl: string, toUrl: string, progress: number) => {
      if (!paintCovers(fromUrl, toUrl)) {
        return;
      }
      runner.render(coverMorph, {
        from: fromCanvas,
        to: toCanvas,
        progress,
        params: COVER_MORPH_PARAMS,
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      const fromIndex = indexRef.current;
      const toIndex =
        covers.length > 1 ? (fromIndex + 1) % covers.length : fromIndex;
      renderFrame(covers[fromIndex], covers[toIndex], 0);
    });
    resizeObserver.observe(container);

    const preloadCovers = async () => {
      try {
        const loaded = await Promise.all(
          covers.map(async (url) => {
            const image = await loadCoverImage(url);
            return [url, image] as const;
          })
        );
        if (cancelled) {
          return;
        }
        imagesRef.current = new Map(loaded);
        resize();
        const nextIndex = covers.length > 1 ? 1 : 0;
        renderFrame(covers[0], covers[nextIndex], 0);
        setReady(true);
      } catch {
        if (!cancelled) {
          setUseFallback(true);
        }
      }
    };
    preloadCovers();

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      tweenRef.current?.kill();
      runner.dispose();
      runnerRef.current = null;
      fromCanvasRef.current = null;
      toCanvasRef.current = null;
      imagesRef.current.clear();
    };
  }, [covers]);

  useEffect(() => {
    if (!ready || useFallback || covers.length <= 1) {
      return;
    }

    const progress = { value: 0 };

    const advance = () => {
      const runner = runnerRef.current;
      const fromCanvas = fromCanvasRef.current;
      const toCanvas = toCanvasRef.current;
      if (!runner) {
        return;
      }
      if (!fromCanvas) {
        return;
      }
      if (!toCanvas) {
        return;
      }

      const fromIndex = indexRef.current;
      const toIndex = (fromIndex + 1) % covers.length;
      const fromUrl = covers[fromIndex];
      const toUrl = covers[toIndex];

      tweenRef.current?.kill();
      progress.value = 0;

      tweenRef.current = gsap.to(progress, {
        value: 1,
        duration: TRANSITION_DURATION_S,
        ease: "power1.inOut",
        onUpdate: () => {
          paintMorphFrame({
            container: containerRef.current,
            fromCanvas,
            toCanvas,
            fromUrl,
            toUrl,
            images: imagesRef.current,
            progress: progress.value,
            runner,
          });
        },
        onComplete: () => {
          indexRef.current = toIndex;
          setDisplayIndex(toIndex);
        },
      });
    };

    const intervalId = window.setInterval(advance, ROTATE_MS);
    return () => {
      window.clearInterval(intervalId);
      tweenRef.current?.kill();
    };
  }, [ready, useFallback, covers]);

  if (projects.length === 0) {
    return null;
  }

  const activeProject = projects[displayIndex] ?? projects[0];

  if (useFallback || projects.length === 1) {
    const cover = getProjectCover(activeProject);
    const coverIsRemote = cover.startsWith("http");
    return (
      <div className="mt-8 w-full max-w-md">
        <button
          aria-label={`Open ${activeProject.title}`}
          className="group relative block w-full overflow-hidden border border-(--index-divider) bg-(--foreground)/5"
          onClick={() => onProjectClick(activeProject.slug)}
          type="button"
        >
          <div className="relative aspect-21/9 w-full">
            <Image
              alt={activeProject.title}
              className="object-cover transition-opacity duration-300 group-hover:opacity-90"
              fill
              sizes="(max-width: 768px) 100vw, 28rem"
              src={cover}
              unoptimized={coverIsRemote}
            />
          </div>
        </button>
        <p className="mt-2.5 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest">
          <span className="text-(--foreground)/70">{activeProject.title}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-md">
      <button
        aria-label={`Open ${activeProject.title}`}
        className="group relative block w-full overflow-hidden border border-(--index-divider) bg-(--foreground)/5"
        onClick={() => onProjectClick(activeProject.slug)}
        type="button"
      >
        <div
          className={`relative aspect-21/9 w-full transition-opacity duration-300 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          ref={containerRef}
        >
          <canvas
            className="absolute inset-0 block h-full w-full"
            ref={canvasRef}
          />
        </div>
      </button>
      <p
        className="mt-2.5 font-mono text-(--text-muted) text-[10px] uppercase tracking-widest"
        key={activeProject.slug}
        style={{
          animationDuration: "400ms",
          animationFillMode: "both",
          animationName: "category-caption-in",
          animationTimingFunction: "ease-out",
        }}
      >
        <span className="text-(--foreground)/70">{activeProject.title}</span>
        <span className="text-(--text-muted)">
          {" "}
          · {displayIndex + 1}/{projects.length}
        </span>
      </p>
    </div>
  );
}
