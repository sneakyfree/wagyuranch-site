"use client";
import { useEffect, useRef } from "react";

// Subtle parallax drift on a hero background image as the page scrolls.
// Disabled under reduced-motion. Purely decorative.
export default function ParallaxHero({ src, alt = "", strength = 0.18 }: { src: string; alt?: string; strength?: number }) {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const offset = rect.top * -strength;
      el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [strength]);

  return (
    <div className="hero-media">
      <img ref={ref} src={src} alt={alt} style={{ willChange: "transform" }} />
    </div>
  );
}
