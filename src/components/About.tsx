import { about } from "@/data/content";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-site px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <SectionHeader index="01" label="About" id="about-title" title={about.heading} />
      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
        <dl className="col-span-12 grid grid-cols-2 gap-px self-start overflow-hidden rounded-sm border border-line bg-line md:col-span-3 md:grid-cols-1">
          {about.facts.map((f) => (
            <div key={f.label} className="bg-ink p-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{f.label}</dt>
              <dd className="mt-1 text-sm">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="col-span-12 space-y-6 md:col-span-8 md:col-start-5">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className={i === 0 ? "text-pretty text-2xl leading-snug tracking-tight lg:text-[2rem]" : "max-w-2xl text-pretty text-lg leading-relaxed text-muted"}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
