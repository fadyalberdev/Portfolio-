"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = { id?: string; children: React.ReactNode; className?: string; as?: "h2" | "p" };

/**
 * Masked line reveal: each line slides up from behind its own clip as the
 * heading scrolls in. Re-splits on resize/font load (autoSplit). Static for
 * reduced motion.
 */
export default function SplitHeading({ id, children, className = "", as: Tag = "h2" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      let cancelled = false;
      let idle = 0;
      const run = () =>
        mm.add(MOTION_OK, () => {
          const split = SplitText.create(ref.current!, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 1,
                stagger: 0.08,
                scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
              }),
          });
          return () => split.revert();
        });
      // Split only once fonts are in (correct line breaks) and the main thread is free.
      document.fonts.ready.then(() => {
        if (cancelled) return;
        const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
        idle = ric(run) as number;
      });
      return () => {
        cancelled = true;
        (window.cancelIdleCallback ?? window.clearTimeout)(idle);
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
