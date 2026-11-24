"use client";

import { motion } from "framer-motion";
import type { RepoCard } from "@/lib/github";
import { moreProjects, socials } from "@/data/content";
import SectionHeader from "./SectionHeader";
import Arrow from "./Arrow";

const langColor: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Jupyter: "#DA5B0B",
};

function timeAgo(iso: string | null) {
  if (!iso) return null;
  const days = Math.floor((Date.now() - +new Date(iso)) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function MoreProjects({ repos }: { repos: RepoCard[] }) {
  return (
    <section aria-labelledby="more-title" className="mx-auto max-w-site px-5 pb-28 sm:px-8 lg:px-12 lg:pb-40">
      <SectionHeader index="03" label="More projects" id="more-title" title={moreProjects.heading} aside={moreProjects.intro} />
      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r, i) => (
          <motion.li
            key={r.href}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-sm border border-line bg-ink"
          >
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full min-h-[240px] flex-col p-6 transition-colors duration-500 hover:bg-[#121210] sm:p-8"
            >
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted transition-colors group-hover:text-accent">
                  <Arrow className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
              <h3 className="mt-8 break-words text-2xl font-medium tracking-tight transition-colors group-hover:text-accent">{r.name}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{r.description || "No description yet."}</p>
              {r.tags && (
                <ul aria-label="Tags" className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-paper/70">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex items-center gap-5 pt-8 font-mono text-xs text-muted">
                {r.language && (
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: langColor[r.language] ?? "#c8ff2e" }} />
                    {r.language}
                  </span>
                )}
                <span aria-label={`${r.stars} stars`}>★ {r.stars}</span>
                {timeAgo(r.updated) && <span className="ml-auto">{timeAgo(r.updated)}</span>}
              </div>
            </a>
          </motion.li>
        ))}
      </ul>
      <p className="mt-8 text-right">
        <a href={socials.github.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-accent">
          All repositories on GitHub <Arrow />
        </a>
      </p>
    </section>
  );
}
