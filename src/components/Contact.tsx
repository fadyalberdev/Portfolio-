"use client";

import { useState } from "react";
import { contact, person, socials } from "@/data/content";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import Arrow from "./Arrow";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
    } catch {
      const t = document.createElement("textarea");
      t.value = person.email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    { label: "Email", value: person.email, href: `mailto:${person.email}` },
    { label: "LinkedIn", value: socials.linkedin.label, href: socials.linkedin.href, external: true },
    { label: "GitHub", value: socials.github.label, href: socials.github.href, external: true },
  ];

  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-site px-5 pt-28 sm:px-8 lg:px-12 lg:pt-40">
        <SectionHeader index="07" label="Contact" id="contact-title" title={contact.heading} aside={contact.intro} />

        <Reveal className="mt-16">
          <div className="flex flex-col items-start gap-6 border-y border-line py-10 lg:flex-row lg:items-center lg:justify-between">
            <a
              href={`mailto:${person.email}`}
              className="break-all text-[clamp(1.75rem,5.6vw,5.5rem)] font-medium leading-none tracking-tight transition-colors hover:text-accent"
            >
              {person.email}
            </a>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors hover:border-accent hover:text-accent"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
              <MagneticButton href={`mailto:${person.email}`}>
                Say hello <Arrow />
              </MagneticButton>
            </div>
            <p role="status" aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-3">
          {links.map((l) => (
            <li key={l.label} className="border-b border-line md:border-b-0 md:px-6 md:first:pl-0 md:[&:not(:first-child)]:border-l">
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 py-6 md:py-8"
              >
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{l.label}</span>
                  <span className="mt-1 block break-all text-base transition-colors group-hover:text-accent">{l.value}</span>
                </span>
                <Arrow className="shrink-0 text-muted group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 border-t border-line">
        <div className="mx-auto flex max-w-site flex-col gap-3 px-5 py-8 font-mono text-xs uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>{contact.footer}</p>
          <p>
            © {new Date().getFullYear()} {person.fullName} · {person.location}
          </p>
          <a href="#top" className="hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>

      <p aria-hidden="true" className="pointer-events-none select-none px-5 pb-4 text-center font-serif text-[22vw] italic leading-[0.8] text-paper/[0.035]">
        {person.firstName} {person.lastName}
      </p>
    </footer>
  );
}
