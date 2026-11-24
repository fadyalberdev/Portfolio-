import Image from "next/image";
import { featured } from "@/data/content";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import Arrow from "./Arrow";

function ScreenshotPlaceholder() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-line bg-[#11110f]">
      {/* mock browser chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
        <span className="ml-3 h-5 flex-1 rounded-full bg-paper/5 px-3 font-mono text-[10px] leading-5 text-muted">axiom.eg / search</span>
      </div>
      <div className="grid h-full grid-cols-12 gap-3 p-4 sm:p-6">
        <div className="col-span-12 h-10 rounded-sm border border-accent/40 bg-accent/5 px-4 font-mono text-[11px] leading-10 text-accent sm:text-xs">
          ✦ &ldquo;2-bed near ACU under 12k, furnished, with housemates&rdquo;
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="col-span-4 space-y-2">
            <div className="aspect-[4/3] rounded-sm bg-gradient-to-br from-paper/10 to-paper/[0.02]" />
            <div className="h-2 w-3/4 rounded bg-paper/10" />
            <div className="h-2 w-1/2 rounded bg-paper/5" />
          </div>
        ))}
      </div>
      <p className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Screenshot placeholder</p>
    </div>
  );
}

export default function FeaturedProject() {
  const [first, ...rest] = featured.screenshots;
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-site px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <SectionHeader
        index="02"
        label="Featured work"
        id="work-title"
        title={
          <>
            {featured.name}
            <span className="block font-serif italic text-accent">{featured.tagline}</span>
          </>
        }
      />

      <article className="mt-16 overflow-hidden rounded-sm border border-line">
        <Reveal className="border-b border-line p-3 sm:p-5">
          {first ? (
            <Image src={first.src} alt={first.alt} width={1600} height={1000} sizes="(min-width: 1440px) 1400px, 100vw" className="w-full rounded-sm" />
          ) : (
            <ScreenshotPlaceholder />
          )}
          {rest.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-5 md:grid-cols-3">
              {rest.map((s) => (
                <Image key={s.src} src={s.src} alt={s.alt} width={800} height={500} sizes="(min-width: 768px) 33vw, 50vw" className="w-full rounded-sm" />
              ))}
            </div>
          )}
        </Reveal>

        <div className="grid grid-cols-12">
          <div className="col-span-12 border-b border-line p-6 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
            <p className="text-pretty text-xl leading-snug tracking-tight lg:text-2xl">{featured.summary}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6">
              {featured.meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{m.label}</dt>
                  <dd className={`mt-1 ${m.value === "A+" ? "font-serif text-4xl italic leading-none text-accent" : "text-lg"}`}>{m.value}</dd>
                </div>
              ))}
            </dl>
            <ul aria-label="Tech stack" className="mt-10 flex flex-wrap gap-2">
              {featured.stack.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-paper/80">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              {featured.links.map((l) => (
                <MagneticButton key={l.href} href={l.href} external>
                  {l.label} <Arrow />
                </MagneticButton>
              ))}
            </div>
          </div>

          <ol className="col-span-12 grid sm:grid-cols-2 lg:col-span-7">
            {featured.highlights.map((h, i) => (
              <li key={h.title} className="border-b border-line p-6 sm:p-8 sm:[&:nth-child(odd)]:border-r [&:nth-last-child(-n+2)]:sm:border-b-0 last:border-b-0">
                <Reveal delay={(i % 2) * 0.08} y={16}>
                  <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-lg font-medium">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </section>
  );
}
