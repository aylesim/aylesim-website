"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ShapeState } from "@/types/composition";

type BreathingShapeProps = {
  state: ShapeState;
  width: number;
  height: number;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  className?: string;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function pseudoNoise(t: number, seed: number) {
  return Math.sin(t * 0.7 + seed) * Math.cos(t * 0.3 + seed * 1.3);
}

export function BreathingShape({
  state,
  width,
  height,
  canvasRef: externalRef,
  className = "",
}: BreathingShapeProps) {
  const internalRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = externalRef ?? internalRef;
  const verticesRef = useRef<
    { x: number; y: number; tx: number; ty: number }[]
  >([]);
  const timeRef = useRef(0);

  const initVertices = useCallback(() => {
    const cx = width / 2;
    const cy = height / 2;
    const vertices: { x: number; y: number; tx: number; ty: number }[] = [];
    for (let i = 0; i < state.vertexCount; i++) {
      const angle = (i / state.vertexCount) * Math.PI * 2 - Math.PI / 2;
      const r = state.baseRadius * (0.9 + Math.random() * 0.2);
      vertices.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        tx: cx + Math.cos(angle) * r,
        ty: cy + Math.sin(angle) * r,
      });
    }
    verticesRef.current = vertices;
  }, [state.vertexCount, state.baseRadius, width, height]);

  useEffect(() => {
    initVertices();
  }, [initVertices]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let rafId: number;

    const draw = () => {
      timeRef.current += 0.016 * state.driftSpeed;
      const t = timeRef.current;
      const cx = width / 2;
      const cy = height / 2;

      const vertices = verticesRef.current;
      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        const drift = state.breathAmplitude * state.baseRadius;
        v.tx =
          cx +
          Math.cos(
            (i / vertices.length) * Math.PI * 2 - Math.PI / 2 + t * 0.5
          ) *
            (state.baseRadius + pseudoNoise(t, i) * drift);
        v.ty =
          cy +
          Math.sin(
            (i / vertices.length) * Math.PI * 2 - Math.PI / 2 + t * 0.5
          ) *
            (state.baseRadius + pseudoNoise(t + 1, i + 2) * drift);

        v.x = lerp(v.x, v.tx, 0.05);
        v.y = lerp(v.y, v.ty, 0.05);
      }

      ctx.clearRect(0, 0, width, height);

      const breath = 0.5 + Math.sin(t * 1.2) * 0.15;
      const alpha = 0.6 + breath * 0.3;
      ctx.fillStyle = `hsla(${state.hue}, ${state.saturation}%, ${state.lightness}%, ${alpha})`;
      ctx.strokeStyle = `hsla(${state.hue}, ${state.saturation}%, ${state.lightness + 10}%, 0.9)`;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [state, width, height, canvasRef]);

  return (
    <canvas
      className={className}
      height={height}
      ref={canvasRef}
      style={{ imageRendering: "crisp-edges" }}
      width={width}
    />
  );
}
