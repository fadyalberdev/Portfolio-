import SplitHeading from "./SplitHeading";

type Props = { title: React.ReactNode; id?: string; intro?: React.ReactNode };

/** Heading on the left, a short intro pinned to the right column's baseline. */
export default function SectionHeader({ title, id, intro }: Props) {
  return (
    <header className="grid grid-cols-12 items-end gap-x-6 gap-y-5">
      <SplitHeading
        id={id}
        className="col-span-12 text-balance text-[clamp(2.4rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] lg:col-span-8"
      >
        {title}
      </SplitHeading>
      {intro && <p className="col-span-12 max-w-md text-pretty text-base leading-relaxed text-muted lg:col-span-4 lg:justify-self-end">{intro}</p>}
    </header>
  );
}
