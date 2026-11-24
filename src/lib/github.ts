import { moreProjects, socials } from "@/data/content";

export type RepoCard = {
  name: string;
  description: string;
  language: string | null;
  stars: number;
  href: string;
  updated: string | null;
  tags?: string[];
};

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
};

/**
 * Fetched on the server and cached for an hour (ISR), so visitors never
 * hit GitHub's unauthenticated rate limit. Falls back to pinned projects.
 */
export async function getRepos(): Promise<RepoCard[]> {
  let live: RepoCard[] = [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${socials.github.username}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" },
        next: { revalidate: 3600 },
      },
    );
    if (res.ok) {
      const data = (await res.json()) as GitHubRepo[];
      const exclude = new Set(moreProjects.exclude.map((n) => n.toLowerCase()));
      live = data
        .filter((r) => !r.fork && !exclude.has(r.name.toLowerCase()))
        .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
        .map((r) => ({
          name: r.name,
          description: r.description ?? "",
          language: r.language,
          stars: r.stargazers_count,
          href: r.html_url,
          updated: r.updated_at,
        }));
    }
  } catch {
    // network error: pinned projects still render
  }

  // Merge pinned entries: enrich the matching live repo, or add it if missing.
  const out = [...live];
  for (const p of moreProjects.pinned) {
    const i = out.findIndex((r) => r.name.toLowerCase() === p.repo.toLowerCase());
    const card: RepoCard = {
      name: p.name,
      description: p.description,
      language: p.language,
      stars: i >= 0 ? out[i].stars : 0,
      href: i >= 0 ? out[i].href : p.href,
      updated: i >= 0 ? out[i].updated : null,
      tags: p.tags,
    };
    if (i >= 0) out[i] = card;
    else out.push(card);
  }
  return out;
}
