"use client";

import { liquidMorph, Runner } from "@vysmo/transitions";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/content";
import { getProjectCover } from "@/lib/project-cover";

const ROTATE_MS = 5000;
const TRANSITION_DURATION_S = 0.9;

export function CategoryProjectRotator({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (slug: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runnerRef = useRef<Runner | null>(null);
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

    let runner: Runner;
    try {
      runner = new Runner({ canvas });
    } catch {
      setUseFallback(true);
      return;
    }
    runnerRef.current = runner;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) {
        return;
      }
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const renderFrame = (from: string, to: string, progress: number) => {
      runner.render(liquidMorph, { from, to, progress });
    };

    const preloadCovers = async () => {
      try {
        await runner.preload(covers);
        if (cancelled) {
          return;
        }
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
    };
  }, [covers]);

  useEffect(() => {
    if (!ready || useFallback || covers.length <= 1) {
      return;
    }

    const progress = { value: 0 };

    const advance = () => {
      const runner = runnerRef.current;
      if (!runner) {
        return;
      }

      const fromIndex = indexRef.current;
      const toIndex = (fromIndex + 1) % covers.length;

      tweenRef.current?.kill();
      progress.value = 0;

      tweenRef.current = gsap.to(progress, {
        value: 1,
        duration: TRANSITION_DURATION_S,
        ease: "power2.inOut",
        onUpdate: () => {
          runner.render(liquidMorph, {
            from: covers[fromIndex],
            to: covers[toIndex],
            progress: progress.value,
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
          className="group relative block aspect-21/9 w-full overflow-hidden border border-(--index-divider) bg-(--foreground)/5"
          onClick={() => onProjectClick(activeProject.slug)}
          type="button"
        >
          <Image
            alt={activeProject.title}
            className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
            fill
            sizes="(max-width: 768px) 100vw, 28rem"
            src={cover}
            unoptimized={coverIsRemote}
          />
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
        className="group relative block aspect-21/9 w-full overflow-hidden border border-(--index-divider) bg-(--foreground)/5"
        onClick={() => onProjectClick(activeProject.slug)}
        type="button"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-full w-full" ref={containerRef}>
            <canvas className="block h-full w-full" ref={canvasRef} />
          </div>
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
