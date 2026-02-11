"use client";

import { useEffect, useRef, useCallback } from "react";

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animationRef = useRef<number>(0);

  const drawHeart = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      const t = size * 0.3;
      ctx.moveTo(0, t);
      ctx.bezierCurveTo(0, 0, -size, 0, -size, t);
      ctx.bezierCurveTo(-size, size * 0.75, 0, size * 0.9, 0, size * 1.2);
      ctx.bezierCurveTo(0, size * 0.9, size, size * 0.75, size, t);
      ctx.bezierCurveTo(size, 0, 0, 0, 0, t);
      ctx.closePath();
      ctx.fillStyle = "#e8899d";
      ctx.fill();
      ctx.restore();
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const HEART_COUNT = 15;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize
    heartsRef.current = Array.from({ length: HEART_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight + window.innerHeight,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 0.4 + 0.15,
      opacity: Math.random() * 0.06 + 0.02,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.01 + 0.005,
    }));

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const heart of heartsRef.current) {
        heart.y -= heart.speed;
        heart.rotation += heart.rotationSpeed;
        heart.wobble += heart.wobbleSpeed;
        heart.x += Math.sin(heart.wobble) * 0.3;

        if (heart.y < -heart.size * 2) {
          heart.y = h + heart.size * 2;
          heart.x = Math.random() * w;
        }

        drawHeart(
          ctx,
          heart.x,
          heart.y,
          heart.size,
          heart.rotation,
          heart.opacity,
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [drawHeart]);

  return (
    <canvas
      ref={canvasRef}
      className="floating-hearts-canvas"
      style={{ transform: "translateZ(0)" }}
    />
  );
}
