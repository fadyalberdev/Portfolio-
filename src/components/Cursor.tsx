"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor (dot + ring) and an amber "safelight" glow that trails the pointer.
 * The ring grows over links and shows a label over anything with data-cursor.
 * Fine pointers only; off for reduced motion. Position uses gsap.quickTo
 * (transform only); size changes are a scale, so nothing triggers layout.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const labelEl = useRef<HTMLSpanElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) return;
    root.classList.add("has-cursor");

    const to = (el: HTMLElement | null, dur: number) => ({
      x: gsap.quickTo(el, "x", { duration: dur, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: dur, ease: "power3.out" }),
    });
    const d = to(dot.current, 0.05);
    const r = to(ring.current, 0.18);
    const g = to(glow.current, 0.9);
    let state = "";

    const move = (e: PointerEvent) => {
      d.x(e.clientX); d.y(e.clientY);
      r.x(e.clientX); r.y(e.clientY);
      g.x(e.clientX); g.y(e.clientY);
      wrap.current!.style.opacity = "1";
      const t = e.target as Element | null;
      const label = t?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
      const next = label ? `label:${label}` : t?.closest("a, button, input, label") ? "hover" : "";
      if (next === state) return;
      state = next;
      wrap.current!.dataset.state = label ? "label" : next;
      if (label) labelEl.current!.textContent = label;
    };
    const down = () => (wrap.current!.dataset.pressed = "true");
    const up = () => delete wrap.current!.dataset.pressed;
    const leave = () => (wrap.current!.style.opacity = "0");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={wrap} aria-hidden="true" className="cursor pointer-events-none fixed inset-0 z-[70] opacity-0 transition-opacity duration-300">
      <div ref={glow} className="fixed -left-[320px] -top-[320px] -z-10 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(255,163,26,0.13)_0%,rgba(255,120,20,0.05)_35%,transparent_65%)]" />
      <div ref={ring} className="fixed left-0 top-0">
        <div className="cursor-ring grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent">
          <span ref={labelEl} className="cursor-label text-[13px] font-semibold text-ink" />
        </div>
      </div>
      <div ref={dot} className="fixed left-0 top-0">
        <div className="cursor-dot h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>
    </div>
  );
}
