import Image from "next/image";
import { beyond } from "@/data/content";
import SectionHeader from "./SectionHeader";

/**
 * A contact sheet: frames on a strip of film, numbered like a real roll.
 * Hovering a frame circles it in amber grease pencil, the way photographers
 * mark their picks (an SVG stroke that draws itself on).
 */
export default function BeyondCode() {
  return (
    <section aria-labelledby="beyond-title" className="mx-auto max-w-site px-5 py-28 sm:px-8 lg:px-12 lg:py-44">
      <SectionHeader id="beyond-title" title={beyond.heading} intro={beyond.intro} />

      <ul className="mt-14 grid gap-x-6 gap-y-8 md:grid-cols-3 lg:mt-20">
        {beyond.roles.map((r) => (
          <li key={r.title} className="border-t border-line pt-4">
            <h3 className="text-xl font-semibold tracking-[-0.015em]">{r.title}</h3>
            <p className="mt-1 text-paper/85">{r.org}</p>
            <p className="mt-2 text-sm text-muted">{r.note}</p>
          </li>
        ))}
      </ul>

      <div className="mt-14 rounded-sm bg-[#1b1611] px-3 py-1 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:px-5">
        <div className="sprockets" aria-hidden="true" />
        <ul aria-label="Photography and design work" className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-3 lg:grid-cols-6">
          {beyond.gallery.map((g, i) => (
            <li key={i} className="group">
              <figure>
                <div className="relative aspect-[3/2] lg:aspect-[2/3]">
                  <div className="absolute inset-0 overflow-hidden bg-[#0f0c0a]">
                    {g.src ? (
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                      />
                    ) : (
                      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,rgba(255,163,26,0.14),transparent_60%)]" />
                    )}
                  </div>
                  {/* grease-pencil pick mark */}
                  <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute -inset-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)] overflow-visible">
                    <path
                      d="M6 10 C 30 2, 74 3, 95 8 C 99 35, 98 70, 94 93 C 66 99, 30 98, 5 94 C 1 66, 2 33, 8 6"
                      pathLength={1}
                      fill="none"
                      stroke="#ffa31a"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      className="opacity-0 [stroke-dasharray:1] [stroke-dashoffset:1] [transition:stroke-dashoffset_550ms_cubic-bezier(0.16,1,0.3,1),opacity_0ms_550ms] group-hover:opacity-100 group-hover:[stroke-dashoffset:0] group-hover:[transition:stroke-dashoffset_550ms_cubic-bezier(0.16,1,0.3,1),opacity_0ms] motion-reduce:[transition:none]"
                    />
                  </svg>
                </div>
                <figcaption className="mt-2 flex items-baseline justify-between gap-2 text-[13px]">
                  <span className="font-mono text-accent/80">{i + 1}</span>
                  <span className="text-paper/70">
                    {g.label}
                    {!g.src && <span className="sr-only"> (image placeholder)</span>}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="sprockets" aria-hidden="true" />
      </div>
    </section>
  );
}
