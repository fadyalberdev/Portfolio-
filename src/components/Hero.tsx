"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero, person } from "@/data/content";
import TypingLine from "./TypingLine";
import MagneticButton from "./MagneticButton";
import Arrow from "./Arrow";

const ease = [0.22, 1, 0.36, 1] as const;

function Letters({ word, start, className }: { word: string; start: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className ?? ""}`} aria-hidden="true">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 0.9, delay: start + i * 0.065, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" aria-label="Introduction" className="hairline-grid relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="mx-auto flex w-full max-w-site flex-1 flex-col px-5 pb-8 pt-24 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="grid grid-cols-12 gap-6 font-mono text-xs uppercase tracking-[0.2em] text-muted"
        >
          <p className="col-span-6 md:col-span-3">{hero.eyebrow}</p>
          <p className="col-span-6 text-right md:col-span-3 md:col-start-10">{person.location}</p>
        </motion.div>

        <div className="relative mt-auto">
        <motion.h1
          style={{ y: nameY, opacity: fade }}
          aria-label={person.fullName}
          className="pt-10 text-[clamp(4.5rem,25vw,18rem)] md:text-[clamp(6rem,min(19vw,22svh),18rem)] font-medium leading-[0.84] tracking-[-0.055em]"
        >
          <Letters word={person.firstName} start={0.15} />
          <Letters word={person.lastName} start={0.45} className="pl-[0.6em] font-serif italic tracking-[-0.03em] text-accent" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-4 right-0 hidden max-w-[16rem] text-right font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-muted md:block"
        >
          {person.education}
        </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          className="mt-10 grid grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-line pt-8"
        >
          <div className="col-span-12 md:col-span-4">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">{person.role}</p>
            <TypingLine words={hero.typing} />
          </div>
          <p className="col-span-12 text-pretty text-2xl leading-snug tracking-tight md:col-span-5 lg:text-3xl">{hero.pitch}</p>
          <div className="col-span-12 flex flex-wrap gap-3 md:col-span-3 md:flex-col md:items-end">
            <MagneticButton href={hero.cta.projects.href}>
              {hero.cta.projects.label} <Arrow direction="down" />
            </MagneticButton>
            <MagneticButton href={person.cv} variant="outline" download>
              {hero.cta.cv.label} <Arrow direction="down" />
            </MagneticButton>
            <MagneticButton href={hero.cta.contact.href} variant="ghost">
              {hero.cta.contact.label} <Arrow direction="right" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
