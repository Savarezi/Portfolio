import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  speedMultiplier: number;
  pulseSpeed: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const colors = [
      'rgba(212, 175, 55, ', // gold-shimmer
      'rgba(184, 134, 11, ', // dark-gold-shimmer
      'rgba(255, 255, 255, ', // silver-shimmer
      'rgba(226, 232, 240, ', // silver-light
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const density = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 12000));
      stars = [];
      for (let i = 0; i < density; i++) {
        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.4,
          color: colorBase,
          alpha: Math.random() * 0.5 + 0.2,
          speedMultiplier: Math.random() * 0.4 + 0.1,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -0.5 and 0.5 relative to screen center
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      mouseRef.current = { x: normX * 45, y: normY * 45 };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Lerp offset toward mouse target for maximum fluidity
      offsetRef.current.x += (mouseRef.current.x - offsetRef.current.x) * 0.05;
      offsetRef.current.y += (mouseRef.current.y - offsetRef.current.y) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Apply parallax offset to the base coordinates in a safe screen wrap
        let drawX = (star.x - offsetRef.current.x * star.speedMultiplier);
        let drawY = (star.y - offsetRef.current.y * star.speedMultiplier);

        // Wrapping edges organically
        if (drawX < 0) drawX += canvas.width;
        if (drawX > canvas.width) drawX -= canvas.width;
        if (drawY < 0) drawY += canvas.height;
        if (drawY > canvas.height) drawY -= canvas.height;

        // Subtle alpha shimmering pulse
        star.alpha += star.pulseSpeed;
        if (star.alpha > 0.85 || star.alpha < 0.15) {
          star.pulseSpeed = -star.pulseSpeed;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] transition-opacity duration-1000 bg-transparent"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
