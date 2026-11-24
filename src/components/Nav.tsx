"use client";

import { useRef } from "react";
import { nav, person } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Nav() {
  const ring = useRef<SVGCircleElement>(null);

  // Scroll progress drawn around the monogram: orientation, scrubbed to scroll.
  useGSAP(() => {
    gsap.fromTo(
      ring.current,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.4 } },
    );
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav aria-label="Primary" className="mx-auto flex max-w-site items-center justify-between gap-3">
        <a href="#top" className="glass flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4">
          <span className="relative grid h-9 w-9 place-items-center" aria-hidden="true">
            <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="16.5" fill="none" stroke="rgba(239,232,220,0.14)" strokeWidth="1.5" />
              <circle ref={ring} cx="18" cy="18" r="16.5" fill="none" stroke="#ffa31a" strokeWidth="1.5" pathLength={1} strokeDasharray="1" strokeDashoffset="1" strokeLinecap="round" />
            </svg>
            <span className="text-[13px] font-bold tracking-tight">FA</span>
          </span>
          <span className="text-sm font-medium">
            {person.firstName} {person.lastName}
            <span className="sr-only">, back to top</span>
          </span>
        </a>

        <ul className="glass hidden items-center rounded-full p-1.5 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="block rounded-full px-4 py-2 text-sm text-paper/75 transition-colors duration-150 hover:bg-paper/[0.07] hover:text-paper">
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="glass flex items-center gap-2.5 rounded-full px-4 py-3 text-sm font-medium">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="hidden sm:inline">Available for work</span>
          <span className="sm:hidden">Contact</span>
        </a>
      </nav>
    </header>
  );
}
