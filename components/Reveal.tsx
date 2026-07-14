"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;         // stagger, ms
  y?: number;             // travel distance, px
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// Fade + rise as the element scrolls into view. Content is always in the DOM
// (SSG/SEO-safe); the hidden state only applies when JS + motion are available.
export default function Reveal({ children, as = "div", delay = 0, y = 22, once = true, className = "", style }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? " in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ["--reveal-y" as any]: `${y}px`, ...style }}
    >
      {children}
    </Tag>
  );
}
