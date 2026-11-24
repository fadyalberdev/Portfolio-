import Reveal from "./Reveal";

type Props = { index: string; label: string; title: React.ReactNode; id?: string; aside?: React.ReactNode };

export default function SectionHeader({ index, label, title, id, aside }: Props) {
  return (
    <header className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-line pt-6">
      <p className="col-span-12 font-mono text-xs uppercase tracking-[0.2em] text-muted md:col-span-3">
        <span className="text-accent">{index}</span> / {label}
      </p>
      <Reveal className="col-span-12 md:col-span-9">
        <h2 id={id} className="text-balance text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {aside && <div className="mt-5 max-w-xl text-base leading-relaxed text-muted">{aside}</div>}
      </Reveal>
    </header>
  );
}
