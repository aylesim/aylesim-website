"use client";

import { useEffect, useRef } from "react";

export default function Planet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    let time = 0;

    // Planet parameters
    const radius = Math.min(width, height) * 0.25;
    const cx = width / 2;
    const cy = height / 2;
    const dots = 400;

    const animate = () => {
      time += 0.002;
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Trails
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ffffff";

      for (let i = 0; i < dots; i++) {
        // Golden angle distribution for sphere
        const phi = Math.acos(1 - (2 * (i + 0.5)) / dots);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5) + time * 5;

        // 3D coordinates
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        // Rotate around X axis (tilt)
        const tilt = 0.4;
        const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
        const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);

        // Rotate around Y axis (spin)
        const rot = time;
        const x3 = x * Math.cos(rot) - z2 * Math.sin(rot);
        const z3 = x * Math.sin(rot) + z2 * Math.cos(rot);

        // Perspective projection
        const scale = 300 / (300 - z3);
        const x2d = cx + x3 * scale;
        const y2d = cy + y2 * scale;

        // Draw dot if in front
        if (scale > 0) {
          const alpha = (z3 + radius) / (2 * radius); // Fade back dots
          ctx.globalAlpha = alpha;
          const size = Math.max(0.5, 2 * scale);
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      className="pointer-events-none fixed inset-0 z-0 opacity-60 mix-blend-screen"
      ref={canvasRef}
    />
  );
}
