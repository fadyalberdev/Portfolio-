"use client";

import { useRef } from "react";
import { skills, headings } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";

/** Each layer's words rise out of a mask as its row enters, left to right. */
export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row) => {
          gsap.from(row.querySelectorAll(".skill-word"), {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.05,
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });
        });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="mx-auto max-w-site px-5 py-28 sm:px-8 lg:px-12 lg:py-44">
      <SectionHeader id="skills-title" title={headings.skills.title} intro={headings.skills.intro} />
      <dl className="mt-14 lg:mt-20">
        {skills.map((g) => (
          <div key={g.group} className="skill-row grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-t border-line py-7 last:border-b sm:py-9">
            <dt className="col-span-12 text-base text-muted md:col-span-3">{g.group}</dt>
            <dd className="col-span-12 md:col-span-9">
              <ul className="flex flex-wrap gap-x-[0.75em] gap-y-1 text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                {g.items.map((s) => (
                  <li key={s} className="overflow-hidden pb-[0.08em]">
                    <span className="skill-word inline-block">{s}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
