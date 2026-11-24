/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit text, links, skills, projects and images in this file.
 *  Components only read from it — no copy is hard-coded elsewhere.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  url: "https://fadyalber.netlify.app", // ← change to your real Netlify URL or domain after deploying
  title: "Fady Alber — Full-Stack Engineer",
  description:
    "Fady Alber Ibrahim, a junior full-stack engineer from Cairo. I build full-stack products end to end, from the database to the pixels, with AI in the loop.",
  keywords: [
    "Fady Alber",
    "Full-Stack Engineer",
    "Frontend Engineer",
    "Next.js",
    "FastAPI",
    "TypeScript",
    "Python",
    "RAG",
    "Cairo",
    "Egypt",
  ],
};

export const person = {
  firstName: "Fady",
  lastName: "Alber",
  fullName: "Fady Alber Ibrahim",
  role: "Junior Full-Stack / Frontend Engineer",
  location: "Cairo, Egypt",
  education: "B.Sc. Software Engineering, Ahram Canadian University, 2026",
  available: "Open to junior full-stack & frontend roles",
  email: "fadyalber.dev@gmail.com",
  cv: "/cv.pdf", // put your CV at /public/cv.pdf
  cvAlt: { label: "Frontend CV", href: "/cv-frontend.pdf" },
};

export const socials = {
  github: { label: "github.com/fadyalberdev", href: "https://github.com/fadyalberdev", username: "fadyalberdev" },
  linkedin: { label: "linkedin.com/in/fadyalber", href: "https://www.linkedin.com/in/fadyalber" },
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  typing: ["Full-Stack Engineer", "Next.js + FastAPI", "Builds AI features"],
  pitch: "I build full-stack products end to end, from the database to the pixels, with AI in the loop.",
  cta: {
    projects: { label: "View Projects", href: "#work" },
    cv: { label: "Download CV" },
    contact: { label: "Contact", href: "#contact" },
  },
};

export const about = {
  heading: "Engineer by training, designer by habit.",
  paragraphs: [
    "I'm a fresh 2026 Software Engineering graduate from Ahram Canadian University. On AXIOM, our A+ graduation project, I led the backend and AI work: a FastAPI service, a PostgreSQL + pgvector data layer and a local-LLM RAG pipeline, wired to a Next.js frontend.",
    "I learn fast and I ship. I use AI tools every day to move quicker, and I still read every line before it goes in. Years of freelance photography and graphic design gave me an eye for spacing, hierarchy and detail, so the things I build tend to look finished.",
  ],
  facts: [
    { label: "Based in", value: "Cairo, Egypt" },
    { label: "Degree", value: "Software Engineering, 2026" },
    { label: "Graduation project", value: "AXIOM, graded A+" },
    { label: "Languages", value: "Arabic and English" },
  ],
};

export const featured = {
  name: "AXIOM",
  tagline: "an AI-powered real estate platform for Egypt",
  summary:
    "A production-grade property platform for the Egyptian market, with sell and rent listings, a dedicated Housemates module for students and newcomers sharing a home, and AI throughout: natural-language search, a chatbot, recommendations and fraud scoring.",
  meta: [
    { label: "Role", value: "Backend & AI lead" },
    { label: "Team", value: "7 engineers" },
    { label: "Grade", value: "A+" },
    { label: "Year", value: "2026" },
  ],
  // Each highlight lights up parts of the architecture diagram as you scroll.
  // Node ids: web, api, db, llm, stripe, tests
  highlights: [
    { title: "Next.js frontend", body: "TypeScript and Tailwind UI for search, listings, chat, checkout and an admin moderation console.", nodes: ["web"] },
    { title: "FastAPI backend", body: "15 REST routers, JWT auth with role-based access, and a listing approval workflow: pending, approved, active.", nodes: ["api"] },
    { title: "RAG with a local LLM", body: "Ollama and pgvector power natural-language search, a chatbot, recommendations and heuristic fraud scoring.", nodes: ["llm", "db"] },
    { title: "Stripe payments", body: "Booking fees and subscription plans, kept in sync through webhooks.", nodes: ["stripe"] },
    { title: "Housemates", body: "A shared-housing module for students relocating to Cairo, and the platform's main differentiator.", nodes: ["web", "api", "db"] },
    { title: "Tested end to end", body: "A Playwright suite covering auth, search, listings, payments and the AI flows.", nodes: ["tests"] },
  ],
  stack: ["FastAPI", "Python", "Next.js", "TypeScript", "Tailwind", "Supabase", "PostgreSQL", "pgvector", "Ollama", "RAG", "Stripe", "JWT", "Playwright"],
  // Screenshot frames under the case study. Add files to /public/projects and set src,
  // e.g. "/projects/axiom-search.png". An empty src shows a placeholder frame.
  screenshots: [
    { src: "", alt: "AXIOM natural-language search results", caption: "Search" },
    { src: "", alt: "AXIOM Housemates listing", caption: "Housemates" },
    { src: "", alt: "AXIOM admin moderation console", caption: "Admin console" },
  ],
  links: [
    { label: "View repository", href: "https://github.com/fadyalberdev/axiom" },
  ],
};

export const moreProjects = {
  heading: "More on GitHub",
  intro: "Pulled live from GitHub, most recently updated first.",
  // Repos you don't want in the grid (the featured one is already shown above).
  exclude: ["axiom", "fadyalberdev"],
  // Always shown, even if the API is unreachable or rate-limited.
  pinned: [
    {
      name: "Coffee Shop E-Commerce",
      repo: "coffee-shop",
      description:
        "Full-featured coffee storefront with a Flask backend: auth, sessions, a database-driven catalog, cart and checkout on SQLite.",
      language: "Python",
      tags: ["Flask", "SQLite", "HTML/CSS", "JavaScript"],
      href: "https://github.com/fadyalberdev/coffee-shop",
    },
  ],
};

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind", "Bootstrap"] },
  { group: "Backend", items: ["FastAPI", "Flask", "REST", "JWT", "RBAC"] },
  { group: "Databases", items: ["PostgreSQL (pgvector)", "MySQL", "SQLite"] },
  { group: "AI", items: ["RAG", "Ollama", "Vector search", "Prompt engineering"] },
  { group: "Tools", items: ["Git", "Linux", "Stripe", "Playwright", "Agile"] },
];

export const beyond = {
  heading: "I also work behind the lens.",
  intro: "Alongside engineering I shoot and design for clients. It's where I learned composition, deadlines and taking feedback.",
  roles: [
    { title: "Photographer & Video Editor", org: "Raya CX", note: "Corporate events & social campaigns" },
    { title: "Graphic Designer", org: "DOT Studio", note: "Social creative for public-personality clients, 2025–26" },
    { title: "Product & Food Photographer", org: "LifeBot / Shrimps & Smox", note: "Product launches & a full visual menu" },
  ],
  // Put images in /public/beyond and set src, e.g. "/beyond/01.jpg". Empty src = placeholder tile.
  gallery: [
    { src: "", alt: "Event photography", label: "Events" },
    { src: "", alt: "Food photography", label: "Food" },
    { src: "", alt: "Product photography", label: "Product" },
    { src: "", alt: "Social media design", label: "Design" },
    { src: "", alt: "Video editing still", label: "Video" },
    { src: "", alt: "Portrait photography", label: "Portrait" },
  ],
};

export const contact = {
  heading: "Let's build something.",
  intro: "I'm looking for junior full-stack or frontend roles. If you're hiring, or just want to talk shop, my inbox is open.",
  footer: "Designed & built by Fady Alber.",
};

/** Answers for the interactive terminal. Each line is one row of output. */
export const terminal = {
  prompt: "visitor@fady:~$",
  welcome: ["Welcome. Type `help` to see what I can tell you."],
  commands: {
    help: [
      "Available commands:",
      "  whoami     who I am",
      "  skills     what I work with",
      "  projects   things I've built",
      "  contact    how to reach me",
      "  cv         download my CV",
      "  clear      clear the screen",
    ],
    whoami: [
      `${person.fullName}`,
      `${person.role}, ${person.location}`,
      `${person.education}`,
      "Led backend + AI on AXIOM (A+). Ships fast with AI tools. Designer's eye.",
    ],
    skills: skills.map((s) => `${s.group.padEnd(10)} ${s.items.join(", ")}`),
    projects: [
      "AXIOM            AI real-estate platform: FastAPI, Next.js, pgvector, Ollama, Stripe",
      "Coffee Shop      Flask + SQLite e-commerce: auth, cart, checkout",
      "…more in the Work section, pulled live from GitHub.",
    ],
    contact: [
      `email     ${person.email}`,
      `linkedin  ${socials.linkedin.label}`,
      `github    ${socials.github.label}`,
    ],
  } as Record<string, string[]>,
};

/** Section headings that aren't covered above. */
export const headings = {
  skills: { title: "From the schema to the pixel.", intro: "What I reach for, grouped by layer." },
  terminal: {
    title: "Prefer the command line?",
    intro: "Type a command and press Enter. Try whoami, skills, projects or contact. Up and down recall history; Tab completes.",
  },
};
