import Image from "next/image";
import { beyond } from "@/data/content";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

// Editorial, asymmetric spans for the 5-tile gallery (12-col grid on md+).
const spans = [
  "col-span-2 aspect-[4/5] md:col-span-5 md:row-span-2",
  "col-span-1 aspect-square md:col-span-4",
  "col-span-1 aspect-square md:col-span-3",
  "col-span-1 aspect-square md:col-span-3",
  "col-span-1 aspect-square md:col-span-4",
];

export default function BeyondCode() {
  return (
    <section aria-labelledby="beyond-title" className="mx-auto max-w-site px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <SectionHeader
        index="06"
        label="Beyond code"
        id="beyond-title"
        title={
          <>
            I also work <span className="font-serif italic text-accent">behind the lens.</span>
          </>
        }
        aside={beyond.intro}
      />

      <ul className="mt-16 grid border-t border-line md:grid-cols-3">
        {beyond.roles.map((r, i) => (
          <li key={r.title} className="border-b border-line py-6 md:border-b-0 md:px-6 md:py-8 md:[&:not(:first-child)]:border-l md:first:pl-0">
            <Reveal delay={i * 0.08} y={16}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Freelance · {r.org}</p>
              <h3 className="mt-3 text-xl font-medium tracking-tight">{r.title}</h3>
              <p className="mt-2 text-sm text-muted">{r.note}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      <ul aria-label="Photography and design gallery" className="mt-10 grid grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-12 md:gap-4 lg:auto-rows-[280px]">
        {beyond.gallery.map((g, i) => (
          <li key={i} className={`group relative overflow-hidden rounded-sm border border-line bg-[#11110f] md:aspect-auto ${spans[i % spans.length]}`}>
            {g.src ? (
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 768px) 40vw, 50vw"
                className="object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            ) : (
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,255,46,0.08),transparent_60%)]">
                <div className="absolute inset-6 border border-dashed border-line" />
              </div>
            )}
            <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70">
              {String(i + 1).padStart(2, "0")} — {g.label}
              {!g.src && <span className="sr-only"> (image placeholder)</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
