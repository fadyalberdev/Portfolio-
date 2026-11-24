"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  download?: boolean;
  external?: boolean;
  className?: string;
};

const styles = {
  solid: "bg-accent text-ink hover:bg-paper",
  outline: "border border-line text-paper hover:border-accent hover:text-accent",
  ghost: "text-paper underline decoration-line underline-offset-8 hover:decoration-accent",
};

export default function MagneticButton({ href, children, variant = "solid", download, external, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 15, mass: 0.3 });
  const y = useSpring(my, { stiffness: 220, damping: 15, mass: 0.3 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.45);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
