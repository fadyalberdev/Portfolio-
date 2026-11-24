"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";
import SectionHeader from "./SectionHeader";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-site px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <SectionHeader
        index="04"
        label="Skills"
        id="skills-title"
        title={
          <>
            From the schema <span className="font-serif italic text-accent">to the pixel.</span>
          </>
        }
      />
      <div className="mt-16 border-b border-line">
        {skills.map((g, gi) => (
          <motion.div
            key={g.group}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-4 border-t border-line py-7 transition-colors duration-500 hover:bg-paper/[0.02] sm:py-9"
          >
            <motion.p
              variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
              className="col-span-12 flex items-baseline gap-4 md:col-span-3"
            >
              <span className="font-mono text-xs text-accent">{String(gi + 1).padStart(2, "0")}</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-paper">{g.group}</span>
            </motion.p>
            <motion.ul
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="col-span-12 flex flex-wrap gap-x-2 gap-y-1 md:col-span-9"
            >
              {g.items.map((s, i) => (
                <motion.li
                  key={s}
                  variants={{ hidden: { opacity: 0, y: "60%" }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                  className="text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl"
                >
                  <span className="transition-colors duration-300 hover:text-accent">{s}</span>
                  {i < g.items.length - 1 && <span className="ml-2 font-serif italic text-muted/50" aria-hidden="true">/</span>}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
