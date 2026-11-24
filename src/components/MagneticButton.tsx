"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "text";
  download?: boolean | string;
  external?: boolean;
  className?: string;
};

const styles = {
  solid: "sweep bg-accent text-ink px-6 py-3.5",
  outline: "border border-line text-paper hover:border-accent/70 px-6 py-3.5",
  text: "px-1 py-2 text-paper underline decoration-line decoration-1 underline-offset-[10px] hover:decoration-accent",
};

/** Link that leans toward the mouse (elastic spring back) and dips on press. */
export default function MagneticButton({ href, children, variant = "solid", download, external, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.5)" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.5)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.3);
      y((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const leave = () => (x(0), y(0));
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      download={download === true ? "" : download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center rounded-full text-[15px] font-medium transition-[border-color,text-decoration-color] duration-150 ${styles[variant]} ${className}`}
    >
      {/* Press feedback lives on an inner span so it never fights the magnetic transform. */}
      <span className="press inline-flex items-center gap-2">{children}</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
