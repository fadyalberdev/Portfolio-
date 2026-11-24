"use client";

import { useState } from "react";
import { contact, person, socials } from "@/data/content";
import SectionHeader from "./SectionHeader";
import MagneticButton from "./MagneticButton";

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
    setTimeout(() => setCopied(false), 2200);
  };

  const links = [
    { label: "LinkedIn", value: socials.linkedin.label, href: socials.linkedin.href },
    { label: "GitHub", value: socials.github.label, href: socials.github.href },
  ];

  return (
    <footer id="contact" aria-labelledby="contact-title">
      <div className="mx-auto max-w-site px-5 pt-28 sm:px-8 lg:px-12 lg:pt-44">
        <SectionHeader id="contact-title" title={contact.heading} intro={contact.intro} />

        <div className="mt-14 border-y border-line py-10 lg:mt-20">
          <a
            href={`mailto:${person.email}`}
            className="block break-all text-[clamp(1.9rem,6.2vw,6rem)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-150 hover:text-accent"
          >
            {person.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href={`mailto:${person.email}`}>Email me</MagneticButton>
            <button
              type="button"
              onClick={copy}
              data-copied={copied}
              className="copy-btn relative inline-flex h-[50px] min-w-[150px] items-center justify-center overflow-hidden rounded-full border border-line px-6 text-[15px] font-medium transition-[border-color] duration-150 hover:border-accent/70"
            >
              {/* One button, two states: the label rolls up to confirm, the tick draws itself. */}
              <span className="copy-idle press">Copy email</span>
              <span className="copy-done absolute inset-0 flex items-center justify-center gap-2 text-accent" aria-hidden={!copied}>
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
                </svg>
                Copied
              </span>
            </button>
            <p role="status" aria-live="polite" className="sr-only">
              {copied ? "Email address copied" : ""}
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.label} className="border-b border-line sm:border-b-0 sm:[&:nth-child(2)]:border-l sm:[&:nth-child(2)]:pl-6">
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="group block py-6">
                <span className="block text-sm text-muted">{l.label}</span>
                <span className="mt-1 block break-all text-lg transition-colors duration-150 group-hover:text-accent">{l.value}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 border-t border-line">
        <div className="mx-auto flex max-w-site flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>{contact.footer}</p>
          <p>
            © {new Date().getFullYear()} {person.fullName}, {person.location}
          </p>
          <a href="#top" className="transition-colors duration-150 hover:text-paper">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
