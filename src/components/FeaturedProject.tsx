"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { featured } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";
import MagneticButton from "./MagneticButton";
import ArchitectureDiagram from "./ArchitectureDiagram";

const DESKTOP = "(min-width: 1024px)";

/**
 * Scroll story. On desktop the diagram stays pinned (CSS sticky) while the
 * highlights scroll past; whichever highlight crosses the middle of the screen
 * lights up its part of the system, and the connections draw in with progress.
 */
export default function FeaturedProject() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(-1);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      const mm = gsap.matchMedia();

      mm.add(DESKTOP, () => {
        setStep(0);
        steps.forEach((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setStep(i),
          }),
        );
        return () => setStep(-1);
      });

      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        gsap.fromTo(
          ".edge",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            stagger: 0.15,
            scrollTrigger: { trigger: "[data-story]", start: "top 70%", end: "top 10%", scrub: 1 },
          },
        );
        gsap.from(".edge-label", {
          autoAlpha: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-story]", start: "top 40%", end: "top 10%", scrub: 1 },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const active = step >= 0 ? featured.highlights[step].nodes : [];

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="mx-auto max-w-site px-5 py-28 sm:px-8 lg:px-12 lg:py-44">
      <SectionHeader id="work-title" title={`${featured.name}, ${featured.tagline}.`} intro={featured.summary} />

      <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-6 sm:grid-cols-4 lg:mt-20">
        {featured.meta.map((m) => (
          <div key={m.label}>
            <dt className="text-sm text-muted">{m.label}</dt>
            <dd className={`mt-1 font-semibold ${m.value === "A+" ? "text-3xl leading-none text-accent" : "text-lg"}`}>{m.value}</dd>
          </div>
        ))}
      </dl>

      <div data-story className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-24">
        <div className="col-span-12 lg:col-span-6">
          <div className="lg:sticky lg:top-28 lg:flex lg:h-[calc(100svh-10rem)] lg:items-center">
            <ArchitectureDiagram active={active} />
          </div>
        </div>

        <ol className="col-span-12 lg:col-span-5 lg:col-start-8 lg:py-[22svh]">
          {featured.highlights.map((h, i) => (
            <li
              key={h.title}
              data-step
              className={`border-t border-line py-7 transition-opacity duration-300 lg:flex lg:min-h-[42svh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0 ${
                step === -1 || step === i ? "opacity-100" : "lg:opacity-30"
              }`}
            >
              <h3 className="text-2xl font-semibold tracking-[-0.02em] lg:text-[2rem]">{h.title}</h3>
              <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-muted">{h.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-20 grid grid-cols-12 items-end gap-x-6 gap-y-8">
        <ul aria-label="Tech stack" className="col-span-12 flex flex-wrap gap-2 lg:col-span-8">
          {featured.stack.map((t) => (
            <li key={t} className="rounded-md border border-line px-3 py-1.5 text-sm text-paper/85">
              {t}
            </li>
          ))}
        </ul>
        <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          {featured.links.map((l) => (
            <MagneticButton key={l.href} href={l.href} external>
              {l.label}
            </MagneticButton>
          ))}
        </div>
      </div>

      <ul aria-label="AXIOM screenshots" className="mt-14 grid gap-5 md:grid-cols-3">
        {featured.screenshots.map((s) => (
          <li key={s.caption}>
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-coal">
                {s.src ? (
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top" />
                ) : (
                  <div aria-hidden="true" className="absolute inset-0 p-4">
                    <div className="h-3 w-24 rounded-full bg-paper/10" />
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((k) => (
                        <div key={k} className="aspect-[4/3] rounded bg-gradient-to-br from-paper/[0.08] to-transparent" />
                      ))}
                    </div>
                    <div className="mt-3 h-2 w-2/3 rounded bg-paper/[0.06]" />
                  </div>
                )}
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                {s.caption}
                {!s.src && <span className="sr-only"> (screenshot placeholder)</span>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
