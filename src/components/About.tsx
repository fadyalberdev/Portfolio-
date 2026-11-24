import { about } from "@/data/content";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-site px-5 py-28 sm:px-8 lg:px-12 lg:py-44">
      <SectionHeader id="about-title" title={about.heading} />
      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-20">
        <div className="col-span-12 space-y-6 lg:col-span-7">
          <p className="max-w-[34ch] text-pretty text-[1.6rem] font-medium leading-[1.25] tracking-[-0.015em] lg:text-[2.1rem]">{about.paragraphs[0]}</p>
          {about.paragraphs.slice(1).map((p, i) => (
            <p key={i} className="max-w-[60ch] text-pretty text-lg leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
        <dl className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 self-end sm:grid-cols-4 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
          {about.facts.map((f) => (
            <div key={f.label} className="border-t border-line pt-3">
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="mt-1 text-base font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
