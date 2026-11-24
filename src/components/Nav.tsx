"use client";

import { useEffect, useState } from "react";
import { nav, person } from "@/data/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? "border-b border-line bg-ink/70 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-site items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3 font-mono text-sm" aria-label={`${person.fullName}, back to top`}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-bold text-ink">FA</span>
          <span className="hidden text-muted sm:inline">{person.firstName.toLowerCase()}.{person.lastName.toLowerCase()}</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span>Available</span>
        </a>
      </nav>
    </header>
  );
}
