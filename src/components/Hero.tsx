"use client";

import { useRef } from "react";
import { hero, person } from "@/data/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import TypingLine from "./TypingLine";
import MagneticButton from "./MagneticButton";

/**
 * The one orchestrated moment on the page.
 * Load (CSS): letters rise out of a mask one by one, the width axis opening from
 * condensed to full, in safelight amber that settles to paper like a print developing.
 * Then (GSAP): letters near the pointer widen, thicken and warm back to amber.
 */
function Word({ text, offset = 0, className = "" }: { text: string; offset?: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className}`} aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span key={i} className="hero-char" style={{ "--i": offset + i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // The letter reveal itself is pure CSS (globals.css) so it starts on first paint.
        // GSAP adds the scroll parallax and the pointer proximity.
        gsap.to(".hero-name", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
        });

        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        let ready = false;
        const last = chars[chars.length - 1];
        const onEnd = (e: AnimationEvent) => e.animationName === "char-develop" && (ready = true);
        last.addEventListener("animationend", onEnd);
        const fallback = window.setTimeout(() => (ready = true), 3500);

        const setters = chars.map((c) => ({
          el: c,
          w: gsap.quickTo(c, "--w", { duration: 0.6, ease: "power3.out" }),
          g: gsap.quickTo(c, "--wg", { duration: 0.6, ease: "power3.out" }),
          k: gsap.quickTo(c, "--k", { duration: 0.6, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          if (!ready) return;
          // Batch all reads, then all writes (no layout thrashing).
          const rects = setters.map((s) => s.el.getBoundingClientRect());
          setters.forEach((s, i) => {
            const r = rects[i];
            const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
            const k = Math.max(0, 1 - d / 420);
            s.w(100 + k * 25);
            s.g(800 + k * 100);
            s.k(k * 0.9);
          });
        };
        const onLeave = () => setters.forEach((s) => (s.w(100), s.g(800), s.k(0)));
        const name = root.current!.querySelector<HTMLElement>(".hero-name")!;
        name.addEventListener("pointermove", onMove);
        name.addEventListener("pointerleave", onLeave);
        return () => {
          window.clearTimeout(fallback);
          last.removeEventListener("animationend", onEnd);
          name.removeEventListener("pointermove", onMove);
          name.removeEventListener("pointerleave", onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" aria-label="Introduction" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="mx-auto flex w-full max-w-site flex-1 flex-col px-5 pb-8 pt-28 sm:px-8 lg:px-12">
        <div className="relative mt-auto">
          <h1
            aria-label={person.fullName}
            className="hero-name select-none text-[clamp(4.6rem,26vw,19rem)] leading-[0.82] tracking-[-0.045em] md:text-[clamp(6rem,min(20vw,24svh),19rem)]"
          >
            <Word text={person.firstName} />
            <Word text={person.lastName} offset={person.firstName.length} className="pl-[0.55em]" />
          </h1>
          <p data-hero-fade style={{ "--i": 0 } as React.CSSProperties} className="absolute bottom-[0.6em] right-0 hidden max-w-[15rem] text-right text-sm leading-relaxed text-muted md:block">
            {person.education}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-12 items-end gap-x-6 gap-y-8">
          <div data-hero-fade style={{ "--i": 1 } as React.CSSProperties} className="col-span-12 md:col-span-4">
            <p className="mb-2 text-sm text-muted">{person.role}</p>
            <TypingLine words={hero.typing} />
          </div>
          <p data-hero-settle className="col-span-12 max-w-[30ch] text-pretty text-[1.6rem] font-medium leading-[1.2] tracking-[-0.015em] md:col-span-5 lg:text-[2rem]">
            {hero.pitch}
          </p>
          <div data-hero-fade style={{ "--i": 2 } as React.CSSProperties} className="col-span-12 flex flex-wrap items-center gap-3 md:col-span-3 md:flex-col md:items-end">
            <MagneticButton href={hero.cta.projects.href}>{hero.cta.projects.label}</MagneticButton>
            <MagneticButton href={person.cv} variant="outline" download="Fady_Alber_CV.pdf">
              {hero.cta.cv.label}
            </MagneticButton>
            <MagneticButton href={hero.cta.contact.href} variant="text">
              {hero.cta.contact.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
