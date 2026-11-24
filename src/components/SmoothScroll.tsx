"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_REDUCE } from "@/lib/gsap";

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger never reads a
 * stale position. Not created at all for reduced motion (native scroll instead).
 * In-page anchor links scroll smoothly and then move keyboard focus to the target.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia(MOTION_REDUCE);
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;

    const start = () => {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis?.raf(t * 1000); // ticker gives seconds, Lenis wants ms
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };
    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      tick = null;
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      const focus = () => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      if (lenis) lenis.scrollTo(id === "top" ? 0 : target, { offset: -88, onComplete: focus });
      else {
        target.scrollIntoView({ block: "start" });
        focus();
      }
    };

    if (!mq.matches) start();
    const onChange = () => (mq.matches ? stop() : start());
    mq.addEventListener("change", onChange);
    document.addEventListener("click", onClick);
    return () => {
      mq.removeEventListener("change", onChange);
      document.removeEventListener("click", onClick);
      stop();
    };
  }, []);

  return null;
}
