"use client";

import { useRef } from "react";
import type { RepoCard } from "@/lib/github";
import { moreProjects, socials } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import SectionHeader from "./SectionHeader";

const langColor: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#663399",
  "Jupyter Notebook": "#DA5B0B",
};

function timeAgo(iso: string | null) {
  if (!iso) return null;
  const days = Math.floor((Date.now() - +new Date(iso)) / 86_400_000);
  if (days < 1) return "Updated today";
  if (days < 30) return `Updated ${days}d ago`;
  if (days < 365) return `Updated ${Math.floor(days / 30)}mo ago`;
  return `Updated ${Math.floor(days / 365)}y ago`;
}

export default function MoreProjects({ repos }: { repos: RepoCard[] }) {
  const root = useRef<HTMLElement>(null);

  // One batched trigger for the grid: cards entering together stagger as a group.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(".repo-card", { autoAlpha: 0, y: 40 });
        ScrollTrigger.batch(".repo-card", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07, overwrite: true }),
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [repos.length] },
  );

  return (
    <section ref={root} aria-labelledby="more-title" className="mx-auto max-w-site px-5 pb-28 sm:px-8 lg:px-12 lg:pb-44">
      <SectionHeader id="more-title" title={moreProjects.heading} intro={moreProjects.intro} />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {repos.map((r) => (
          <li key={r.href} className="repo-card">
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Open"
              className="lift group flex h-full min-h-[230px] flex-col rounded-xl border border-line bg-coal p-6 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent/50 sm:p-7"
            >
              <h3 className="break-words text-2xl font-semibold tracking-[-0.02em]">{r.name}</h3>
              <p className="mt-3 line-clamp-3 max-w-[48ch] leading-relaxed text-muted">{r.description || "No description yet."}</p>
              {r.tags && (
                <ul aria-label="Built with" className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <li key={t} className="rounded-md border border-line px-2 py-0.5 text-[13px] text-paper/80">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-8 text-sm text-muted">
                {r.language && (
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: langColor[r.language] ?? "#ffa31a" }} />
                    {r.language}
                  </span>
                )}
                <span>
                  {r.stars} {r.stars === 1 ? "star" : "stars"}
                </span>
                {timeAgo(r.updated) && <span>{timeAgo(r.updated)}</span>}
              </div>
              <span className="sr-only"> (opens on GitHub in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <a href={socials.github.href} target="_blank" rel="noopener noreferrer" className="text-muted underline decoration-line underline-offset-8 transition-colors duration-150 hover:text-paper hover:decoration-accent">
          See all repositories on GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </section>
  );
}
